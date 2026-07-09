import { Suspense } from "react";

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center p-6 text-gray-500">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
      <p className="text-sm">Cargando...</p>
    </div>
  </div>
);

export const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);
