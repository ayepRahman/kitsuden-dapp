import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("pages/Home"));
const Mint = React.lazy(() => import("pages/Mint"));

export const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/mint-foxfone" element={<Mint />} />
      </Routes>
    </Suspense>
  );
};

export default App;
