import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";

const router = createBrowserRouter(createRoutesFromElements(AllRoutes()));

function App() {
  return (
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
