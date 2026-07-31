# Technical Debt - Skeleton Loading

## Overview
The Technical Debt page now includes a detailed skeleton loading state that matches the comprehensive page layout with multiple data sections.

## Components

### TechnicalDebt.jsx (Page)
- Manages API data fetching
- Handles loading and error states
- Conditionally renders skeleton or actual content

### TechnicalDebtSkeleton.jsx
- Complete skeleton for the entire technical debt page
- Matches the layout of all sections:
  - Summary cards (6 metric cards in 3-column grid)
  - Analytics section (2 progress bars + 4 stat cards)
  - AI overview (header + recommendations list)
  - Details grid (insights + recommendations in 2 columns)
  - File breakdown (3-column file lists)

## Layout Structure

```
RepositoryTechnicalDebt
├── TechnicalDebtSummaryCards
│   └── 6 Metric Cards (Debt Score, Maintainability, Large Files, etc.)
│
├── TechnicalDebtAnalytics
│   ├── Section Header
│   ├── 2 Progress Metrics (Debt Score, Maintainability)
│   └── 4 Stat Cards (Large Files, Dead Files, Circular Deps, Chains)
│
├── TechnicalDebtOverview
│   ├── AI Overview Header
│   └── Recommendations List (5+ items)
│
├── Details Grid (2 columns)
│   ├── TechnicalDebtInsights
│   │   ├── Repository Assessment
│   │   └── 4 Insight Items
│   └── TechnicalDebtRecommendations
│       └── 4 Recommendation Cards
│
└── TechnicalDebtFileBreakdown
    ├── Large Files (column 1)
    ├── Dead Files (column 2)
    └── Dependency Chains (column 3)
```

## Skeleton Sections

### 1. Summary Cards (6 Cards)
- 3-column grid (2 cols on md, 3 cols on xl)
- Each card shows: title, value, subtitle, and icon
- Metrics: Debt Score, Maintainability, Large Files, Dead Files, Circular Deps, Dependency Chains

### 2. Technical Debt Analytics
- Section header with icon and description
- **2 Progress Bars**: Technical Debt Score and Maintainability Score
  - Each has title, percentage, progress bar, and status
- **4 Stat Cards**: Quick stats in 4-column grid
  - Each shows icon, value, and title

### 3. AI Technical Debt Overview
- Header with icon, title, description, and count badge
- **Recommendations Section**:
  - Priority Improvements header
  - 5 recommendation items with checkmark icons
  - Each item has full-width text

### 4. Details Grid (2 Columns)
**Insights Column:**
- Section header
- Repository assessment box
- 4 insight items with icons

**Recommendations Column:**
- Section header
- 4 recommendation cards
- Each has priority badges and multi-line content

### 5. File Breakdown (3 Columns)
- Page header with title and description
- **3 File Lists**:
  - Large Files (with file name and LOC)
  - Dead Files (with file paths)
  - Dependency Chains (with chain depth)
- Each column has header and 4 file items

## Visual Accuracy

The skeleton precisely matches the actual UI:
- ✅ Same card dimensions and spacing
- ✅ Same grid layouts (3-col, 4-col, 2-col)
- ✅ Same border colors and backgrounds
- ✅ Progress bar skeletons with labels
- ✅ Icon placeholders in correct positions
- ✅ Badge skeletons for priority indicators
- ✅ Responsive breakpoints maintained
- ✅ Animated pulse effect throughout

## Usage

The skeleton is automatically integrated:

```jsx
export default function TechnicalDebt() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <TechnicalDebtSkeleton />;
  }

  return <RepositoryTechnicalDebt {...props} />;
}
```

## Testing

Visit the technical debt page (`/repository/:id/technical-debt`) and observe:
1. Skeleton appears immediately on page load
2. All 5 sections visible:
   - Summary cards
   - Analytics with progress bars
   - AI overview with recommendations
   - Insights and recommendations grid
   - File breakdown
3. Smooth animated pulse effect
4. Seamless transition to actual content
5. No layout shift (CLS = 0)
6. Responsive on all screen sizes

## Performance Benefits

- **Instant Visual Feedback**: Users see structure immediately
- **Detailed Preview**: Shows exact page layout before data loads
- **Zero Layout Shift**: Skeleton matches exact dimensions
- **Better UX**: Users understand what's loading
- **Perceived Speed**: Page feels faster with rich skeleton

## Key Features

1. **Comprehensive Coverage**: All 5 major sections
2. **Progress Bar Skeletons**: Special handling for metric bars
3. **List Item Skeletons**: Multiple recommendation items
4. **File List Skeletons**: 3-column breakdown structure
5. **Badge Skeletons**: Priority and category indicators
6. **Grid Layouts**: Multiple responsive grid patterns

## Future Improvements

- Add progressive loading per section
- Implement staggered reveal animations
- Add error state handling
- Consider partial updates for large datasets
