# Architecture Visualization - Production Implementation

## Overview

This is a production-grade architecture visualization system built with React Flow and ELK.js, designed to look and feel like professional developer tools (CodeSee, Nx Graph, Datadog, GitHub Dependency Graph).

## File Structure

```
architecture/
├── DependencyGraph.jsx          # Main React Flow component
├── ArchitectureNode.jsx         # Custom node component
├── ArchitectureGraphCard.jsx    # Card wrapper with header
├── RepositoryArchitecture.jsx   # Parent layout component
│
├── graphLayout.js               # ELK layout algorithm
├── graphUtils.js                # Backend data conversion
├── nodeColors.js                # Color schemes & file type detection
│
└── README.md                    # This file
```

## Architecture Decisions

### 1. **ELK Layout Instead of Dagre**

**Why:** Dagre creates extremely wide graphs when a single node (like `index.js`) imports many files. All children get placed in one horizontal row, forcing users to zoom out excessively.

**ELK Benefits:**
- Hierarchical layout with wrapping
- Configurable aspect ratio (prefers vertical space)
- Better handling of complex graphs
- Fewer edge crossings
- Compact, readable layouts

**Configuration:**
```javascript
'elk.algorithm': 'layered'
'elk.direction': 'DOWN'
'elk.aspectRatio': '1.3'  // Taller > Wider
'elk.layered.wrapping.strategy': 'MULTI_EDGE'
```

### 2. **Modular File Organization**

Each file has a single, clear responsibility:

| File | Purpose |
|------|---------|
| `DependencyGraph.jsx` | React Flow orchestration, state management, interactions |
| `ArchitectureNode.jsx` | Custom node UI component |
| `graphLayout.js` | ELK layout algorithm and configuration |
| `graphUtils.js` | Convert backend data to React Flow format |
| `nodeColors.js` | File type detection and color schemes |

**Why:** Prevents monolithic files, improves testability, makes future features easier to add.

### 3. **Professional Node Design**

**Inspired by:** Linear, Vercel, GitHub, Sourcegraph

**Features:**
- Dynamic colors based on file type (JavaScript = Blue, React = Cyan, Config = Orange, etc.)
- Animated hover states with glow effect
- Import/Export statistics display
- Premium typography (font-mono for filenames)
- Extensible design for future badges

**Color Palette:**
- React: Cyan (`rgb(34, 211, 238)`)
- JavaScript: Blue (`rgb(59, 130, 246)`)
- TypeScript: Light Blue (`rgb(96, 165, 250)`)
- Config: Orange (`rgb(251, 146, 60)`)
- Docker: Purple (`rgb(168, 85, 247)`)
- Security: Red (`rgb(239, 68, 68)`)
- Tests: Yellow (`rgb(234, 179, 8)`)
- Utilities: Green (`rgb(34, 197, 94)`)

### 4. **Interactive Features**

**Current:**
- ✅ Hover node → highlight connected edges
- ✅ Smooth zoom and pan
- ✅ MiniMap for navigation
- ✅ Statistics overlay (node count, edge count, circular dependencies)
- ✅ Animated edges
- ✅ Loading state during layout calculation

**Prepared for Future:**
- 🔲 Click node → open side panel with details
- 🔲 Search nodes by filename
- 🔲 Filter by file type
- 🔲 Highlight dependency paths
- 🔲 Complexity heatmap
- 🔲 Circular dependency highlighting
- 🔲 AI insights overlay
- 🔲 Folder/module grouping

### 5. **Performance Optimizations**

```javascript
// Memoized components
export default memo(ArchitectureNode);

// Memoized data transformations
const rawNodes = useMemo(() => createNodesFromArchitecture(architecture), [architecture]);

// Efficient edge updates
const onNodeMouseEnter = useCallback((_, node) => { ... }, [setEdges]);

// React Flow optimizations
elevateEdgesOnSelect={true}
elevateNodesOnSelect={true}
```

### 6. **Backend Compatibility**

**No changes to backend API.**

The system expects:
```javascript
{
  graph: {
    nodes: [{ id: "index.js" }, { id: "logger.js" }],
    edges: [{ source: "index.js", target: "logger.js" }]
  },
  nodeCount: 26,
  edgeCount: 28,
  complexityScore: 82,
  hasCircularDependency: false
}
```

All conversion happens in `graphUtils.js`:
- `createNodesFromArchitecture()` - Adds React Flow metadata
- `createEdgesFromArchitecture()` - Adds styling and animation

## Usage

```jsx
import RepositoryArchitecture from './components/repository/architecture/RepositoryArchitecture';

function ArchitecturePage() {
  const { architecture } = useArchitectureData(repoId);
  
  return <RepositoryArchitecture architecture={architecture} />;
}
```

The component hierarchy:
```
RepositoryArchitecture
  ├── ArchitectureSummaryCards
  ├── ArchitectureGraphCard
  │     └── DependencyGraph
  │           └── ArchitectureNode (custom)
  ├── ArchitectureInsights
  └── ArchitectureRecommendations
```

## Future Extensions

The architecture is designed to support:

### 1. **Node Inspector Panel**
Click a node → side panel slides in with:
- Full file path
- File size and lines of code
- All imports (with links)
- All dependents (with links)
- Complexity metrics
- AI-generated insights
- Change history

### 2. **Advanced Filters**
- Filter by file type (show only React components)
- Filter by complexity (show only high-complexity nodes)
- Filter by ownership (show only files owned by team X)
- Hide/show test files
- Hide/show configuration

### 3. **Search**
- Fuzzy search for filenames
- Navigate directly to nodes
- Highlight matching nodes

### 4. **Complexity Heatmap**
- Color nodes by complexity score
- Red = high complexity
- Green = low complexity

### 5. **Circular Dependency Detection**
- Highlight cycles in red
- Show path of circular dependency
- Suggest refactoring

### 6. **Dependency Path Highlighting**
- Click two nodes
- Highlight shortest path between them
- Show transitive dependencies

### 7. **Module/Folder View**
- Group nodes by folder
- Collapsible folder nodes
- Show inter-folder dependencies

### 8. **AI Hotspots**
- AI-identified problem areas
- Overlay insights directly on graph
- Click for detailed explanation

## Testing

To test with different graph sizes:

```javascript
// Small graph (2-20 nodes)
// Should fit comfortably on screen

// Medium graph (20-50 nodes)
// Should still be readable without excessive zooming

// Large graph (50-100 nodes)
// ELK should create a compact, navigable layout

// Very large graph (100+ nodes)
// May require zooming, but should not be extremely wide
```

## Troubleshooting

### Graph is too wide
- Check `elk.aspectRatio` in `graphLayout.js`
- Increase value to prefer more vertical space
- Check `elk.layered.wrapping.strategy`

### Nodes overlapping
- Increase `elk.spacing.nodeNode`
- Increase `elk.layered.spacing.nodeNodeBetweenLayers`

### Layout takes too long
- ELK is async and runs in background
- Loading state shows spinner
- Consider implementing web worker for very large graphs

### Colors not showing
- Check file type detection in `nodeColors.js`
- Add new file extensions to `detectFileType()`

## Dependencies

```json
{
  "@xyflow/react": "^12.11.2",
  "elkjs": "latest",
  "react": "^19.2.6"
}
```

## Performance Metrics

Target performance:
- Layout calculation: < 2s for 100 nodes
- Initial render: < 500ms
- Hover interaction: < 16ms (60fps)
- Zoom/pan: 60fps smooth

## Design System Compliance

Colors and spacing follow:
- Tailwind CSS v4 design tokens
- DevLens dark theme palette
- 8px grid system
- Professional shadow elevations
