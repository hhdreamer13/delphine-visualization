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
          <p className="mt-6 text-lg font-semibold">
            Veuillez tourner votre téléphone
          </p>
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
