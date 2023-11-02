/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { easeIn, motion } from "framer-motion";
import { useModalContext } from "../ModalContext";
import { introTranslations as translations } from "../../translations/homePage";
import { useLanguageContext } from "../../utils/languageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.95,
      staggerChildren: 0.1,
      duration: 0.6,
      delay: 0,
      ease: easeIn,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};
const flowerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0, ease: easeIn },
  },
};

const Home = () => {
  const { language } = useLanguageContext();
  const t = translations[language];
  const { setShowModal } = useModalContext();

  return (
    <motion.div
      className="mb-40"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative mx-auto mt-20 flex w-full flex-col items-center justify-center p-2 text-lg">
        <div className="relative">
          <motion.img
            onClick={() => setShowModal(true)}
            className="wind-animation absolute left-4 top-0 h-8 w-8"
            variants={flowerVariants}
            initial="hidden"
            animate="visible"
            src="/flower.svg"
            alt=""
            // style={{ transform: "translate(-50%, 50%)" }}
          />
          <motion.h1
            className="mb-4 text-4xl uppercase tracking-[1rem]"
            variants={itemVariants}
          >
            P AnimaVi<span className="tracking-tighter">z</span>
          </motion.h1>
        </div>
        <motion.h3 className="mb-2 text-2xl" variants={itemVariants}>
          {t.title}
        </motion.h3>
        <motion.h3 className="text-2xl" variants={itemVariants}>
          En Sortant de l'École
        </motion.h3>
      </div>
      <motion.div
        className="prose mt-10 text-justify text-lg"
        variants={itemVariants}
      >
        <p>{t.description1}</p>
        <p>{t.description2}</p>
        <div className="mr-4 flex items-center justify-end">
          <a
            className="ml-4 inline-block h-8 w-40 -rotate-2 cursor-pointer touch-manipulation select-none border-0 border-solid bg-rose-300 pt-1 text-center font-body text-sm text-black no-underline after:absolute after:bottom-1 after:left-1 after:h-[calc(100%_-_1px)] after:w-[calc(100%_-_1px)] after:border after:border-solid after:border-black after:content-[''] hover:after:bottom-0.5 hover:after:left-0.5"
            href="https://www.france.tv/enfants/neuf-douze-ans/en-sortant-de-l-ecole/"
            target="_blank"
            rel="noreferrer"
          >
            {t.watchSeries}
          </a>
        </div>
        <p className="mt-10">{t.description3}</p>
        <p>{t.techniquesIntro}</p>
        <ul className="custom-bullet">
          <li>
            <span className="font-sousTitre text-2xl text-[#1b0c41] drop-shadow-md">
              {t.techniques[0].name}
            </span>{" "}
            {t.techniques[0].text}
          </li>
          <li>
            <span className="font-sousTitre text-2xl text-[#721a6e] drop-shadow-md">
              {t.techniques[1].name}
            </span>{" "}
            {t.techniques[1].text}
          </li>
          <li>
            <span className="font-sousTitre text-2xl text-[#c63d4d] drop-shadow-md">
              {t.techniques[2].name}
            </span>{" "}
            {t.techniques[2].text}
          </li>
          <li>
            <span className="font-sousTitre text-2xl  text-[#f8890c] drop-shadow-md">
              {t.techniques[3].name}
            </span>{" "}
            {t.techniques[3].text}
          </li>
          <li>
            <span className="font-sousTitre text-2xl text-[#d5d367] drop-shadow-md">
              {t.techniques[4].name}
            </span>{" "}
            {t.techniques[4].text}
          </li>
        </ul>
        <p>{t.explore}</p>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/ville/petite" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-sm duration-300">
                {t.categories[0].name} <span className="opacity-0">hid</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>{t.categories[0].text}</p>
        </div>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/monde/petit" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-sm duration-300">
                {t.categories[1].name} <span className="opacity-0">hi</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>{t.categories[1].text}</p>
        </div>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/matrice" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-sm duration-300">
                {t.categories[2].name} <span className="opacity-0">hi</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>{t.categories[2].text}</p>
        </div>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/galaxie" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-sm duration-300">
                {t.categories[3].name} <span className="opacity-0">hi</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>{t.categories[3].text}</p>
        </div>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/fleur" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-md duration-300">
                {t.categories[4].name} <span className="opacity-0">hid</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>{t.categories[4].text}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
