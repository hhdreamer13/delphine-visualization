import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import rotatePhoneIcon from "./assets/rotate.png";

const router = createBrowserRouter(createRoutesFromElements(AllRoutes()));

function App() {
  return (
    <>
      <div className="hidden transform-gpu transition-transform sm:block">
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center md:hidden">
        <h2 className="my-14 text-2xl uppercase">PoAnimaViz</h2>

        <img
          src={rotatePhoneIcon}
          alt="Rotate phone icon"
          className="animate-rotate-phone h-24 w-24"
        />
        <p className="mt-6 text-lg font-semibold">
          Veuillez tourner votre téléphone
        </p>
      </div>
    </>
  );
}

export default App;
