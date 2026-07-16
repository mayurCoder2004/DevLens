import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

/**
 * ELK Layout Configuration optimized for compact, readable graphs
 * Prioritizes vertical space over horizontal to prevent extremely wide layouts
 */
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'DOWN', // Top to bottom
  'elk.spacing.nodeNode': '50',
  'elk.layered.spacing.nodeNodeBetweenLayers': '70',
  'elk.spacing.edgeNode': '30',
  'elk.spacing.edgeEdge': '20',
  
  // Compact layout options
  'elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
  'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
  'elk.layered.cycleBreaking.strategy': 'GREEDY',
  
  // Allow nodes to wrap instead of creating extremely wide rows
  'elk.layered.wrapping.strategy': 'MULTI_EDGE',
  'elk.layered.wrapping.additionalEdgeSpacing': '20',
  'elk.layered.wrapping.correctionFactor': '1.5',
  
  // Compact node placement
  'elk.layered.compaction.postCompaction.strategy': 'EDGE_LENGTH',
  'elk.layered.nodePlacement.favorStraightEdges': 'true',
  
  // Reduce edge crossings
  'elk.layered.thoroughness': '10',
  'elk.layered.considerModelOrder.strategy': 'PREFER_EDGES',
  
  // Better spacing for readability
  'elk.padding': '[top=40,left=40,bottom=40,right=40]',
  'elk.aspectRatio': '1.3', // Prefer taller graphs over wide ones
};

/**
 * Calculate dynamic node dimensions based on content
 * @param {string} label - Node label (filename)
 * @returns {Object} Width and height
 */
function calculateNodeSize(label) {
  // Base dimensions
  const minWidth = 200;
  const maxWidth = 280;
  const baseHeight = 100;
  
  // Adjust width based on filename length
  const estimatedWidth = Math.max(
    minWidth,
    Math.min(maxWidth, label.length * 8 + 80)
  );
  
  return {
    width: estimatedWidth,
    height: baseHeight,
  };
}

/**
 * Layout graph nodes using ELK hierarchical algorithm
 * Optimized to prevent extremely wide layouts with many siblings
 * 
 * @param {Array} nodes - React Flow nodes
 * @param {Array} edges - React Flow edges
 * @returns {Promise<Array>} Nodes with calculated positions
 */
export async function getLayoutedElements(nodes, edges) {
  // Build ELK graph structure
  const elkNodes = nodes.map((node) => {
    const size = calculateNodeSize(node.data.label);
    return {
      id: node.id,
      width: size.width,
      height: size.height,
    };
  });

  const elkEdges = edges.map((edge) => ({
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target],
  }));

  const elkGraph = {
    id: 'root',
    layoutOptions: elkOptions,
    children: elkNodes,
    edges: elkEdges,
  };

  try {
    // Run ELK layout algorithm
    const layoutedGraph = await elk.layout(elkGraph);

    // Map positions back to React Flow nodes
    const layoutedNodes = nodes.map((node) => {
      const elkNode = layoutedGraph.children.find((n) => n.id === node.id);
      
      if (!elkNode) {
        console.warn(`Node ${node.id} not found in layout`);
        return node;
      }

      return {
        ...node,
        position: {
          x: elkNode.x,
          y: elkNode.y,
        },
        style: {
          ...node.style,
          width: elkNode.width,
          height: elkNode.height,
        },
      };
    });

    return layoutedNodes;
  } catch (error) {
    console.error('ELK layout error:', error);
    // Fallback to original positions if layout fails
    return nodes;
  }
}

/**
 * Detect if graph has circular dependencies
 * @param {Array} edges - Graph edges
 * @returns {boolean} True if circular dependency exists
 */
export function detectCircularDependencies(edges) {
  const graph = new Map();
  
  // Build adjacency list
  edges.forEach(({ source, target }) => {
    if (!graph.has(source)) {
      graph.set(source, []);
    }
    graph.get(source).push(target);
  });

  const visited = new Set();
  const recursionStack = new Set();

  function hasCycle(node) {
    visited.add(node);
    recursionStack.add(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true;
      }
    }

    recursionStack.delete(node);
    return false;
  }

  // Check all nodes for cycles
  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      if (hasCycle(node)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Calculate graph statistics for monitoring
 * @param {Array} nodes - Graph nodes
 * @param {Array} edges - Graph edges
 * @returns {Object} Statistics
 */
export function calculateGraphStats(nodes, edges) {
  const nodeCount = nodes.length;
  const edgeCount = edges.length;
  
  // Calculate average connections per node
  const avgConnections = nodeCount > 0 ? (edgeCount * 2 / nodeCount).toFixed(1) : 0;
  
  // Find most connected nodes
  const connectionCounts = new Map();
  edges.forEach(({ source, target }) => {
    connectionCounts.set(source, (connectionCounts.get(source) || 0) + 1);
    connectionCounts.set(target, (connectionCounts.get(target) || 0) + 1);
  });
  
  const maxConnections = Math.max(...Array.from(connectionCounts.values()), 0);
  
  return {
    nodeCount,
    edgeCount,
    avgConnections,
    maxConnections,
    hasCircularDeps: detectCircularDependencies(edges),
  };
}
