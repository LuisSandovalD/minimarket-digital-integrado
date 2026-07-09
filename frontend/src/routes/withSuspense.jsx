import { Suspense } from "react";
import PageLoader3D from "./PageLoader";

const PageLoader = () => <PageLoader3D />;

export const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);
