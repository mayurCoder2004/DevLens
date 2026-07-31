/**
 * Skeleton Components Showcase
 * 
 * This file demonstrates all available skeleton components.
 * Use this as a reference or testing page during development.
 * Can be removed in production or kept as documentation.
 */

import {
  Skeleton,
  CardSkeleton,
  StatCardSkeleton,
  HeroSkeleton,
  TableRowSkeleton,
  ListSkeleton,
  ChartSkeleton,
  MetricGridSkeleton,
  RepositoryCardSkeleton,
  ArchitectureGraphSkeleton,
} from './skeletons';

const SkeletonShowcase = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Skeleton Loading System
          </h1>
          <p className="mt-3 text-slate-400">
            Production-ready skeleton components for DevLens
          </p>
        </div>

        {/* Base Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Base Skeleton</h2>
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </section>

        {/* Hero Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Hero Skeleton</h2>
          <HeroSkeleton />
        </section>

        {/* Metric Grid Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Metric Grid Skeleton</h2>
          <MetricGridSkeleton columns={4} />
        </section>

        {/* Stat Card Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Stat Card Skeleton</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        </section>

        {/* Repository Card Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Repository Card Skeleton
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RepositoryCardSkeleton />
            <RepositoryCardSkeleton />
            <RepositoryCardSkeleton />
          </div>
        </section>

        {/* Card Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Card Skeleton</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </section>

        {/* Chart Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Chart Skeleton</h2>
          <ChartSkeleton />
        </section>

        {/* Architecture Graph Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Architecture Graph Skeleton
          </h2>
          <ArchitectureGraphSkeleton />
        </section>

        {/* List Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">List Skeleton</h2>
          <ListSkeleton items={3} />
        </section>

        {/* Table Row Skeleton */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Table Row Skeleton</h2>
          <TableRowSkeleton rows={5} />
        </section>
      </div>
    </div>
  );
};

export default SkeletonShowcase;
