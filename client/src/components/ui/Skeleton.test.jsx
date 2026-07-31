/**
 * Skeleton Component Usage Examples
 * 
 * This file demonstrates various use cases of the Skeleton component.
 * Remove this file after testing or keep it as documentation.
 */

import Skeleton from './Skeleton';

const SkeletonExamples = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-50">
      <div>
        <h2 className="text-xl font-bold mb-4">Basic Shapes</h2>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Circular</h2>
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Card Layout</h2>
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Table Row</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-4 border-b last:border-b-0">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-8 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonExamples;
