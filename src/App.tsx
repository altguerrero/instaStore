import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const OrderFormView = lazy(() => import("./views/OrderFormView"));
const StoresView = lazy(() => import("./views/StoresView"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<OrderFormView />} />
          <Route path="/stores" element={<StoresView />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
