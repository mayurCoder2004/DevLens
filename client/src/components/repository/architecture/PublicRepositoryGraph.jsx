import { useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import ArchitectureNode from "./ArchitectureNode";
import { getLayoutedElements } from "./graphLayout";
import { calculateDependencyStats } from "./graphUtils";
import { getNodeColorScheme } from "./nodeColors";

const nodeTypes = {
  architectureNode: ArchitectureNode,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  animated: false,
  style: {
    stroke: "rgb(59, 130, 246)",
    strokeWidth: 2,
  },
};

export default function PublicRepositoryGraph({ graph }) {
  const rawNodes = useMemo(() => {
    if (!graph?.nodes) return [];

    return graph.nodes.map((node) => {
      const stats = calculateDependencyStats(
        node.id,
        graph.edges || [],
      );

      return {
        id: node.id,
        type: "architectureNode",
        data: {
          label: node.id,
          imports: stats.imports,
          importedBy: stats.importedBy,
          totalConnections: stats.total,
        },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
    });
  }, [graph]);

  const rawEdges = useMemo(() => {
    if (!graph?.edges) return [];

    return graph.edges.map((edge, index) => ({
      id: `public-edge-${index}`,
      source: edge.source,
      target: edge.target,
      type: "smoothstep",
      animated: false,
      style: {
        stroke: "rgb(59, 130, 246)",
        strokeWidth: 2,
      },
    }));
  }, [graph]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    let cancelled = false;

    if (!rawNodes.length) {
      setNodes([]);
      setEdges([]);
      return;
    }

    getLayoutedElements(rawNodes, rawEdges)
      .then((layoutedNodes) => {
        if (cancelled) return;

        setNodes(layoutedNodes);
        setEdges(rawEdges);
      })
      .catch((error) => {
        console.error("PUBLIC GRAPH LAYOUT ERROR:", error);

        if (!cancelled) {
          setNodes(rawNodes);
          setEdges(rawEdges);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [rawNodes, rawEdges, setNodes, setEdges]);

  if (!graph || nodes.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-slate-400">
          No repository graph data available.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .public-repository-graph .react-flow__edges {
          width: 100% !important;
          height: 100% !important;
          inset: 0 !important;
        }

        .public-repository-graph .react-flow__edges > svg {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
        }
      `}</style>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        className="public-repository-graph bg-slate-950"
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Background
          color="rgb(71, 85, 105)"
          gap={20}
          size={1.5}
          variant="dots"
        />

        <Controls
          position="bottom-left"
          showInteractive={false}
          className="!border-slate-700 !bg-slate-800/90 [&>button]:!border-slate-700 [&>button]:!bg-slate-800 [&>button]:!text-slate-300"
        />

        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          className="!border !border-slate-700 !bg-slate-800/90"
          nodeColor={(node) => {
            const colors = getNodeColorScheme(node.data?.label || "");
            return colors.border;
          }}
          maskColor="rgba(0, 0, 0, 0.7)"
          style={{
            width: 180,
            height: 120,
          }}
        />
      </ReactFlow>
    </>
  );
}
