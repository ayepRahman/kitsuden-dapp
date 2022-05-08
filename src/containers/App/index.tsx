import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("pages/Home"));

export const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default App;
