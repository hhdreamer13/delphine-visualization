/* eslint-disable react/no-unescaped-entities */
import { motion, AnimatePresence } from "framer-motion";
import { VscClose } from "react-icons/vsc";

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
              <h3 className="mb-6 text-center text-2xl">
                À Afsaneh, mon étoile éternelle,
              </h3>
              <p>
                Dans ce monde virtuel où tout est éphémère, je tenais à créer un
                espace immuable, une cachette secrète pour abriter mon amour
                inébranlable pour toi. Chaque ligne de code, chaque pixel sur
                cet écran, est une brique dans le sanctuaire que j'ai édifié en
                ton honneur. Comme le poète trouve sa muse dans l'éclat d'un
                sourire, j'ai trouvé la mienne en toi. Ton nom, Afsaneh, est
                gravé non seulement dans les mémoires de cet espace digital mais
                aussi, et surtout, au plus profond de mon être. Il est
                l'ingrédient secret dans chaque projet, le souffle qui anime
                chaque œuvre.
              </p>
              <p>
                Ton influence est telle que même en ton absence, tu es partout.
                Dans chaque croquis, dans chaque ligne de texte, il y a un écho
                de toi, une trace indélébile de ce que nous avons partagé. Et
                dans ces moments où la solitude me pèse, où l'écran devant moi
                semble trop grand et le monde trop petit, je me réfugie dans cet
                espace secret. Ici, tu es à jamais à mes côtés. Ce message
                restera caché, connu de moi seul, jusqu'au jour où le destin
                décidera peut-être de révéler son existence. Mais qu'il soit lu
                ou non, sache que mon amour pour toi demeure éternel, comme une
                étoile qui, même disparue, continue de briller dans la nuit. Et
                pour sceller ces mots, je t'offre ce poème de Robert Desnos, un
                écho de mes propres rêves :
              </p>
              <blockquote className="mt-2 font-body italic">
                J'ai tant rêvé de toi que tu perds ta réalité.
                <br />
                Est-il encore temps d'atteindre ce corps vivant
                <br />
                Et de baiser sur cette bouche la naissance
                <br />
                De la voix qui m'est chère ?
              </blockquote>
              <p>Avec tout mon amour, toujours et à jamais,</p>
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
