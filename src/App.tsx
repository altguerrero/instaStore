import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { useOrderStore } from "./hooks";
import { Loader } from "./components";

const OrderFormView = lazy(() => import("./views/OrderFormView"));
const StoresView = lazy(() => import("./views/StoresView"));

const App = () => {
  const { order } = useOrderStore();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:
      (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || "",
    libraries: ["places"],
  });

  if (!isLoaded) return <Loader />;

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<OrderFormView />} />
          <Route
            path="/stores"
            element={
              !!order.address && !!order.order_id ? (
                <StoresView />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
