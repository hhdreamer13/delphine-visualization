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
            className="relative mx-auto my-0 flex w-3/5 flex-col rounded-2xl bg-base-300 px-5 py-16 text-center shadow-2xl"
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
                Dédié à Delphine Maury
              </h3>
              <p>
                En 2015, lors du festival bisannuel de cinéma d'animation de
                Téhéran en Iran, j'ai découvert pour la première fois la série
                "En sortant de l'école". La poésie et la littérature m'ont
                toujours passionné, et la poésie française en particulier. J'ai
                trois petits livres bilingues (français et persan) des poèmes de
                Jacques Prévert, Robert Desnos et Paul Verlaine, qui m'ont
                accompagné depuis plus de 15 ans.
              </p>
              <p>
                Ces poèmes ont été mes compagnons dans les moments de joie, de
                déprime, d'amour et de stress. Ils m'ont aidé à surmonter les
                difficultés. Lorsque j'ai vu ces poèmes animés à l'écran, avec
                leurs couleurs vives et leurs mots prononcés par des acteurs,
                ils m'ont redonné une nouvelle vie, celle que j'avais perdue
                dans le quotidien. En réalité, j'avais perdu mes rêves, et ce
                poème de Langston Hughes les représente si bien :
              </p>
              <blockquote className="mt-2 font-body italic">
                Rêves
                <br />
                <br />
                Accrochez-vous aux rêves
                <br />
                Car si les rêves meurent
                <br />
                La vie est un oiseau aux ailes brisées
                <br />
                Qui ne peut voler.
                <br />
                <br />
                Accrochez-vous aux rêves
                <br />
                Car lorsque les rêves s'en vont
                <br />
                La vie est un champ stérile
                <br />
                Paralysée par la neige.
                <br />
                <br />
                <span className="">- Langston Hughes</span>
              </blockquote>

              <p>
                C'est dans cet esprit que la série "En sortant de l'école" prend
                toute sa dimension. Bien plus qu'un simple divertissement, elle
                insuffle potentiel, idées, vérité et liberté. La série ravive
                nos rêves, tout comme le poème de Langston Hughes, et je sais
                que je ne suis pas le seul à être touché par ces poésies animées
                et leur pouvoir évocateur.
              </p>
              <p>
                Lorsque j'ai commencé à travailler sur mon projet de
                visualisation de données, j'ai immédiatement été fasciné par
                l'authenticité et la créativité que cela pouvait apporter. Ce
                qui m'a le plus intéressé, c'est la liberté offerte par ce type
                de projet. On ne dessine pas simplement des visualisations, on
                exprime ce que l'on ressent et ce que le film pourrait nous
                faire ressentir, en s'appuyant sur ses spécificités cachées.
              </p>

              <p>
                En célébrant le 50e anniversaire de Delphine, je tiens à lui
                dédier ce projet. Son travail a eu un impact profond sur ma vie
                et sur celle de nombreuses autres personnes qui ont été touchées
                par la série "En sortant de l'école" et les poésies animées
                qu'elle a produites. Merci, Delphine, pour tout ce que tu as
                fait et joyeux anniversaire !
              </p>
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
