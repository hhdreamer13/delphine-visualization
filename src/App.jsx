/* eslint-disable react/no-unescaped-entities */
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import rotatePhoneIcon from "./assets/rotate.png";
import Footer from "./components/Footer/Footer";
import { ModalProvider } from "./components/ModalContext";

const router = createBrowserRouter(createRoutesFromElements(AllRoutes()));

function App() {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="hidden transform-gpu transition-transform sm:block">
          <ModalProvider>
            <RouterProvider router={router}>
              <Outlet />
            </RouterProvider>
          </ModalProvider>
        </div>
        <div className="flex h-screen flex-col items-center justify-around sm:hidden">
          <h2 className="my-14 text-2xl uppercase">PoAnimaViz</h2>

          <img
            src={rotatePhoneIcon}
            alt="Rotate phone icon"
            className="animate-rotate-phone h-24 w-24"
          />
          <div>
            <p className="w-60 text-center">Un grand écran, c'est mieux !</p>
            <p className="w-60 text-center">
              Mais essayez le mode paysage pour une découverte.
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
