/* eslint-disable react/no-unescaped-entities */
import { motion, AnimatePresence } from "framer-motion";
import { VscClose } from "react-icons/vsc";
import { modalTranslations as translations } from "../translations/modalPage";
import { useLanguageContext } from "../utils/languageContext";

const backdropAnimations = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalAnimations = {
  hidden: {
    y: "-100vh",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      mass: 1,
    },
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 50,
      mass: 1,
    },
  },
};

const Modal = ({ showModal, setShowModal }) => {
  const { language } = useLanguageContext();
  const t = translations[language];

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className="fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-60"
          variants={backdropAnimations}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="relative mx-auto my-0 flex w-4/5 flex-col rounded-2xl bg-orange-50 px-5 py-16 text-center shadow-2xl lg:w-3/5"
            variants={modalAnimations}
          >
            <button
              className="absolute right-2 top-2 m-2 animate-pulse p-0"
              onClick={() => setShowModal(false)}
            >
              <VscClose size={"1.5rem"} />
            </button>

            <div className="prose mx-auto text-justify">
              <h3 className="mb-6 text-center text-2xl">{t.title}</h3>
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
              <blockquote className="mt-2 whitespace-pre font-body italic">
                {t.quote}
              </blockquote>
              <p>{t.ending}</p>
              <div className="flex justify-end">
                <h3>Hooman</h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
