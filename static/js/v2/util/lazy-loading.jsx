import React, { Suspense, lazy, useState, useEffect } from "react";

const Home = lazy(() => {
  return Promise.all([
    import("./home"),
    new Promise(resolve => setTimeout(resolve, 500))
  ]).then(([moduleExports]) => moduleExports);
});

function FullSpinner() {
  return (
    <div className="full-spinner">
      <p>loading....</p>
    </div>
  );
}

const LazyLoading = ({ delay, loader: Loader, children }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => setReady(true), delay);
  }, [delay]);
  return ready ? (
    <Suspense fallback={<Loader />}>{children}</Suspense>
  ) : (
    <Loader />
  );
};

function App() {
  return (
    <div className="App">
      <h1>app component</h1>
      <LazyLoading delay={2000} loader={FullSpinner}>
        <Home />
      </LazyLoading>
    </div>
  );
}