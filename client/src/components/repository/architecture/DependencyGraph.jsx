import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import ArchitectureNode from "./ArchitectureNode";
import { getLayoutedElements } from "./graphLayout";
import {
  createNodesFromArchitecture,
  createEdgesFromArchitecture,
  analyzeGraphComplexity,
} from "./graphUtils";
import { getNodeColorScheme } from "./nodeColors";

// Register custom node types
const nodeTypes = {
  architectureNode: ArchitectureNode,
};

// Professional edge styling for production
const defaultEdgeOptions = {
  type: "smoothstep",
  animated: true,
  style: {
    stroke: "rgb(59, 130, 246)",
    strokeWidth: 2,
  },
};

/**
 * DependencyGraph - Production-grade architecture visualization
 *
 * Features:
 * - ELK hierarchical layout (prevents extremely wide graphs)
 * - Custom styled nodes with file type detection
 * - Interactive edge highlighting
 * - MiniMap for navigation
 * - Smooth zoom/pan controls
 * - Graph statistics overlay
 * - Future-ready for node inspector, filters, search
 */
export default function DependencyGraph({ architecture }) {
  const [isLayouting, setIsLayouting] = useState(true);
  const [graphStats, setGraphStats] = useState(null);

  // Convert backend data to React Flow format
  const rawNodes = useMemo(
    () => createNodesFromArchitecture(architecture),
    [architecture],
  );

  const rawEdges = useMemo(
    () => createEdgesFromArchitecture(architecture),
    [architecture],
  );

  // Initialize React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Apply ELK layout on mount and when data changes
  useEffect(() => {
    if (rawNodes.length === 0) {
      setIsLayouting(false);
      return;
    }

    setIsLayouting(true);

    // Run layout algorithm
    getLayoutedElements(rawNodes, rawEdges)
      .then((layoutedNodes) => {
        setNodes(layoutedNodes);
        setEdges(rawEdges);
        setIsLayouting(false);
      })
      .catch((error) => {
        console.error("Layout failed:", error);
        setNodes(rawNodes);
        setEdges(rawEdges);
        setIsLayouting(false);
      });
  }, [rawNodes, rawEdges, setNodes, setEdges]);

  // Calculate graph statistics
  useEffect(() => {
    if (architecture) {
      const stats = analyzeGraphComplexity(architecture);
      setGraphStats(stats);
    }
  }, [architecture]);

  /**
   * Highlight connected edges when hovering over a node
   */
  const onNodeMouseEnter = useCallback(
    (_, node) => {
      setEdges((eds) =>
        eds.map((edge) => {
          const isConnected =
            edge.source === node.id || edge.target === node.id;

          return {
            ...edge,
            animated: isConnected,
            style: {
              ...edge.style,
              stroke: isConnected ? "rgb(96, 165, 250)" : "rgb(59, 130, 246)",
              strokeWidth: isConnected ? 3 : 2,
              opacity: isConnected ? 1 : 0.4,
            },
          };
        }),
      );
    },
    [setEdges],
  );

  /**
   * Reset edge styling when mouse leaves node
   */
  const onNodeMouseLeave = useCallback(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: true,
        style: {
          ...edge.style,
          stroke: "rgb(59, 130, 246)",
          strokeWidth: 2,
          opacity: 1,
        },
      })),
    );
  }, [setEdges]);

  /**
   * Handle node click - prepared for future side panel integration
   */
  const onNodeClick = useCallback((_, node) => {
    console.log("Node clicked:", node.data.label);
    // TODO: Open side panel with node details
    // - Full file path
    // - Import list
    // - Dependent files
    // - Complexity metrics
    // - AI insights
  }, []);

  // Empty state
  if (!architecture?.graph || rawNodes.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-3 text-4xl">📊</div>
          <p className="text-sm text-slate-400">
            No architecture data available
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLayouting) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500" />
          <p className="text-sm text-slate-400">
            Generating architecture layout...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseLeave={onNodeMouseLeave}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
      fitViewOptions={{
        padding: 0.15,
        minZoom: 0.3,
        maxZoom: 1.2,
        duration: 400,
      }}
      minZoom={0.1}
      maxZoom={2}
      className="bg-slate-950"
      proOptions={{ hideAttribution: true }}
      // Smooth interactions
      zoomOnScroll={true}
      zoomOnPinch={true}
      panOnScroll={false}
      panOnDrag={true}
      selectNodesOnDrag={false}
      // Performance
      elevateEdgesOnSelect={true}
      elevateNodesOnSelect={true}
    >
      {/* Professional dot pattern background */}
      <Background
        color="rgb(71, 85, 105)"
        gap={20}
        size={1.5}
        variant="dots"
        className="bg-slate-950"
      />

      {/* Zoom and pan controls */}
      <Controls
        className="!border-slate-700 !bg-slate-800/90 !shadow-2xl backdrop-blur-sm [&>button]:!border-slate-700 [&>button]:!bg-slate-800/90 [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-700 [&>button:hover]:!text-white"
        showInteractive={false}
        position="bottom-left"
      />

      {/* Navigation minimap */}
      <MiniMap
        className="!border !border-slate-700 !bg-slate-800/90 !shadow-2xl backdrop-blur-sm"
        nodeColor={(node) => {
          const colors = getNodeColorScheme(node.data.label);
          return node.selected ? colors.borderHover : colors.border;
        }}
        maskColor="rgba(0, 0, 0, 0.7)"
        position="bottom-right"
        pannable
        zoomable
        style={{
          width: 180,
          height: 120,
        }}
      />

      {/* Graph statistics overlay */}
      {graphStats && (
        <Panel
          position="top-left"
          className="max-w-[calc(100vw-2rem)] space-y-2"
        >
          <div className="rounded-lg border border-slate-700 bg-slate-800/90 p-3 shadow-xl backdrop-blur-sm">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Nodes</span>
                <span className="font-mono font-semibold text-white">
                  {graphStats.nodeCount}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Connections</span>
                <span className="font-mono font-semibold text-white">
                  {graphStats.edgeCount}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Avg/Node</span>
                <span className="font-mono font-semibold text-white">
                  {graphStats.avgConnections}
                </span>
              </div>
              {graphStats.hasCircularDeps && (
                <div className="mt-2 flex items-center gap-1.5 rounded border border-red-500/30 bg-red-500/10 px-2 py-1 text-red-400">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-xs font-medium">Circular Deps</span>
                </div>
              )}
            </div>
          </div>
        </Panel>
      )}
    </ReactFlow>
  );
}
