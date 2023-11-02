/* eslint-disable react/no-unescaped-entities */
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Lottie from "lottie-react";
import AllRoutes from "./routes/AllRoutes";
import Footer from "./components/Footer/Footer";
import { ModalProvider } from "./components/ModalContext";
import responsiveSwitch from "./assets/6051-responsive-preview.json";
import { useLanguageContext } from "./utils/languageContext";
import { mobileTranslations as translations } from "./translations/mobilePage";

const router = createBrowserRouter(createRoutesFromElements(AllRoutes()));

function App() {
  const { language } = useLanguageContext();
  const t = translations[language];

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
        <div className="flex h-screen flex-col items-center justify-center gap-8 sm:hidden">
          <h2 className="mb-14 text-2xl uppercase">PoAnimaViz</h2>
          <p className="w-60 text-center">{t.text1}</p>

          <div className="w-20">
            <Lottie
              animationData={responsiveSwitch}
              loop
              autoplay
              speed={0.1}
            />
          </div>
          <div>
            <p className="w-60 text-center">{t.text2}</p>
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
