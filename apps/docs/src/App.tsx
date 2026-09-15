import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Spinner, Toaster } from "@ionbit-ui/ui";

import { TopBar } from "./components/TopBar";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const ComponentsPage = lazy(() =>
  import("./pages/ComponentsPage").then((m) => ({
    default: m.ComponentsPage,
  })),
);
const UtilsPage = lazy(() =>
  import("./pages/UtilsPage").then((m) => ({
    default: m.UtilsPage,
  })),
);
const ComponentDetailPage = lazy(() =>
  import("./pages/ComponentDetailPage").then((m) => ({
    default: m.ComponentDetailPage,
  })),
);
const UtilDetailPage = lazy(() =>
  import("./pages/UtilDetailPage").then((m) => ({
    default: m.UtilDetailPage,
  })),
);
const TokensPage = lazy(() =>
  import("./pages/TokensPage").then((m) => ({ default: m.TokensPage })),
);
const ThemePage = lazy(() =>
  import("./pages/ThemePage").then((m) => ({ default: m.ThemePage })),
);
const InstallationPage = lazy(() =>
  import("./pages/InstallationPage").then((m) => ({
    default: m.InstallationPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Spinner size="xl" className="text-accent" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/** Full-width layout for homepage and 404. */
function FullWidthLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full px-6 py-12">{children}</div>;
}

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <TopBar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader />}>
                <FullWidthLayout>
                  <HomePage />
                </FullWidthLayout>
              </Suspense>
            }
          />
          <Route
            path="/docs"
            element={<Navigate to="/docs/installation" replace />}
          />
          <Route
            path="/docs/installation"
            element={
              <Suspense fallback={<PageLoader />}>
                <InstallationPage />
              </Suspense>
            }
          />
          <Route
            path="/docs/components"
            element={
              <Suspense fallback={<PageLoader />}>
                <ComponentsPage />
              </Suspense>
            }
          />
          <Route
            path="/docs/utils"
            element={
              <Suspense fallback={<PageLoader />}>
                <UtilsPage />
              </Suspense>
            }
          />
          <Route
            path="/docs/components/:name"
            element={
              <Suspense fallback={<PageLoader />}>
                <ComponentDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/docs/utils/:name"
            element={
              <Suspense fallback={<PageLoader />}>
                <UtilDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/tokens"
            element={
              <Suspense fallback={<PageLoader />}>
                <TokensPage />
              </Suspense>
            }
          />
          <Route
            path="/themes"
            element={
              <Suspense fallback={<PageLoader />}>
                <ThemePage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <FullWidthLayout>
                  <NotFoundPage />
                </FullWidthLayout>
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}
