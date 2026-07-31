# Repository Architecture - Skeleton Loading

## Overview
The Architecture page now includes a comprehensive skeleton loading state that perfectly matches the complex page layout.

## Components

### ArchitecturePage.jsx (Page)
- Manages API data fetching
- Handles loading state
- Conditionally renders skeleton or actual content

### ArchitectureSkeleton.jsx
- Complete skeleton for the entire architecture page
- Matches the layout of all sections:
  - Summary cards (4-column grid)
  - Architecture graph (with nodes and connections)
  - Analytics cards (6 cards in 3-column grid)
  - AI recommendation overview (4 priority cards + tags)
  - Details section (2-column grid with insights and recommendations)

## Layout Structure

```
RepositoryArchitecture
├── ArchitectureSummaryCards
│   ├── Page Header (title + description)
│   └── 4 Metric Cards (Architecture Score, Modules, Circular Deps, Complexity)
│
├── ArchitectureGraphCard
│   └── Interactive dependency graph visualization
│
├── ArchitectureAnalytics
│   ├── Section Header
│   └── 6 Analytics Cards (Most Imported, Fan-Out, Root Modules, etc.)
│
├── ArchitectureRecommendationOverview
│   ├── AI Overview Header
│   ├── 4 Priority Cards (Total, High, Medium, Low)
│   └── Category Tags
│
└── Details Grid (2 columns)
    ├── ArchitectureInsights (3 insight cards)
    └── ArchitectureRecommendations (3 recommendation cards)
```

## Skeleton Sections

### 1. Summary Cards
- Page title and description
- 4 metric cards in responsive grid (2 cols on md, 4 cols on xl)
- Each card shows: title, large value, and subtitle

### 2. Architecture Graph
- Uses the reusable `ArchitectureGraphSkeleton` component
- Shows graph header with controls
- Central node with surrounding nodes
- Connection lines and legend

### 3. Analytics Cards
- Section header with title and description
- 6 cards in 3-column grid (2 cols on md, 3 cols on xl)
- Each card shows: icon, title, value, and subtitle

### 4. AI Recommendation Overview
- Section header with icon and description
- 4 priority cards (Total, High, Medium, Low)
- Category tags (5 placeholder tags)
- Matches the colored borders and backgrounds

### 5. Details Section
- 2-column grid (1 col on mobile, 2 cols on xl)
- **Insights**: 3 insight cards with icon and content
- **Recommendations**: 3 recommendation cards with badges and content

## Visual Accuracy

The skeleton precisely matches the actual UI:
- ✅ Same card dimensions and spacing
- ✅ Same grid layouts (4-col, 3-col, 2-col)
- ✅ Same border colors and backgrounds
- ✅ Same responsive breakpoints
- ✅ Animated pulse effect
- ✅ Graph visualization skeleton
- ✅ Priority card layouts
- ✅ Category tag sections

## Usage

The skeleton is automatically integrated:

```jsx
export default function ArchitecturePage() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <ArchitectureSkeleton />;
  }

  return <RepositoryArchitecture {...props} />;
}
```

## Testing

Visit the architecture page (`/repository/:id/architecture`) and observe:
1. Skeleton appears immediately on page load
2. Smooth animated pulse effect
3. All sections load in sequence
4. Seamless transition to actual content
5. No layout shift (CLS = 0)
6. Responsive on all screen sizes

## Performance Benefits

- **Instant Feedback**: Users see content immediately
- **Zero Layout Shift**: Skeleton matches exact dimensions
- **Perceived Performance**: Page feels faster with skeleton
- **Better UX**: Users understand content is loading

## Future Improvements

- Add streaming/progressive loading
- Implement section-by-section reveal
- Add error state handling
- Consider partial skeleton updates
