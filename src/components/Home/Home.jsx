/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { easeIn, motion } from "framer-motion";
import { useModalContext } from "../ModalContext";

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
          une visualisation poétique de données de la série d'animation
        </motion.h3>
        <motion.h3 className="text-2xl" variants={itemVariants}>
          En Sortant de l'École
        </motion.h3>
      </div>
      <motion.div
        className="prose mt-10 text-justify text-lg"
        variants={itemVariants}
      >
        <p>
          "En sortant de l'école" est une collection inspirante de courts
          métrages d'animation de 3 minutes, s'étalant sur 10 saisons de 2014 à
          2023. Chaque saison se compose de 13 épisodes, donnant vie à un poème
          adapté en animation. Les huit premières saisons rendent hommage à des
          poètes tels que Jacques Prévert, Robert Desnos, Guillaume Apollinaire,
          Paul Éluard, Claude Roy, Jacques Tardieu, Paul Verlaine et Andrée
          Chedid. Les deux dernières saisons explorent des thèmes touchant au
          cœur de l'humanité, la Liberté et l'Amitié, en réunissant les œuvres
          de plusieurs poètes.
        </p>
        <p>
          Ces poèmes prennent vie grâce à la créativité de jeunes réalisateurs
          et réalisatrices, tout juste sortis des meilleures écoles d'animation
          françaises. Cette série hors du commun, produite par Tant Mieux
          Production, vous invite à un voyage poétique et visuellement
          éblouissant.
        </p>
        <div className="mr-4 flex items-center justify-end">
          <a
            className="ml-4 inline-block h-8 w-40 -rotate-2 cursor-pointer touch-manipulation select-none border-0 border-solid bg-rose-300 pt-1 text-center font-body text-sm text-black no-underline after:absolute after:bottom-1 after:left-1 after:h-[calc(100%_-_1px)] after:w-[calc(100%_-_1px)] after:border after:border-solid after:border-black after:content-[''] hover:after:bottom-0.5 hover:after:left-0.5"
            href="https://www.france.tv/enfants/neuf-douze-ans/en-sortant-de-l-ecole/"
            target="_blank"
            rel="noreferrer"
          >
            Regarder la série
          </a>
        </div>
        <p className="mt-10">
          Découvrez maintenant les visualisations que PoAnimaViz vous offre,
          basées sur des données telles que le titre du film, le réalisateur,
          l'école d'animation où le réalisateur a été diplômé, la technique
          d'animation employée, la palette de couleurs utilisée, le nombre de
          mots des poèmes, le poète, l'épisode, la saison et l'année de
          production de chaque film. L'objectif de ces visualisations est de
          mettre en lumière l'art et la poésie qui se cachent derrière chaque
          épisode de manière innovante. Plongez dans un univers poétique et
          explorez les différentes visualisations pour en apprendre davantage
          sur cette série unique.
        </p>
        <p>
          Les techniques d'animation sont réparties en 5 catégories :
          Traditionnelle, numérique, papiers découpés, volume et varié. Voici
          une brève explication de chacune de ces catégories :
        </p>
        <ul className="custom-bullet">
          <li>
            <span className="font-sousTitre text-2xl text-[#1b0c41] drop-shadow-md">
              Traditionnelle
            </span>{" "}
            : Il s'agit d'animations dessinées à la main ou qui donnent
            l'impression d'être dessinées à la main, même si elles ont été
            réalisées à l'aide d'un ordinateur. Elles conservent l'aspect
            classique et artistique du dessin traditionnel.
          </li>
          <li>
            <span className="font-sousTitre text-2xl text-[#721a6e] drop-shadow-md">
              Numérique
            </span>{" "}
            : Ces animations sont entièrement créées à l'aide d'outils
            numériques, tels que des logiciels d'animation 2D ou 3D. Elles ont
            une apparence plus moderne et peuvent inclure des effets spéciaux.
          </li>
          <li>
            <span className="font-sousTitre text-2xl text-[#c63d4d] drop-shadow-md">
              Papiers découpés
            </span>{" "}
            : Cette technique consiste à animer des images découpées dans du
            papier ou d'autres matériaux. Il est également possible de recréer
            cet effet de papier découpé en utilisant des logiciels, mais les
            animations ainsi créées conservent l'apparence et le style
            caractéristiques des images découpées traditionnelles.
          </li>
          <li>
            <span className="font-sousTitre text-2xl  text-[#f8890c] drop-shadow-md">
              Volume
            </span>{" "}
            : Il s'agit d'animations réalisées en utilisant des objets
            tridimensionnels, tels que des figurines, des maquettes ou des
            sculptures. Ces films ont une apparence plus tangible et peuvent
            impliquer des techniques comme la stop-motion.
          </li>
          <li>
            <span className="font-sousTitre text-2xl text-[#d5d367] drop-shadow-md">
              Varié
            </span>{" "}
            : Cette catégorie englobe les films qui combinent plusieurs
            techniques d'animation ou qui ne rentrent pas facilement dans les
            autres catégories. Ils peuvent être hybrides, expérimentaux ou
            simplement uniques dans leur approche.
          </li>
        </ul>
        <p>
          Explorez les cinq catégories de visualisations qui utilisent les
          données mentionnées précédemment pour révéler différents aspects de la
          série :
        </p>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/ville/petite" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-sm duration-300">
                Ville (petite et grande) <span className="opacity-0">hid</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>
            Les épisodes de la série En Sortant de l'école sont représentés sous
            forme urbaine (graphique en barres), où chaque bâtiment (barre)
            correspond à un épisode. Les petites et grandes villes illustrent
            des perspectives différentes sur la série, montrant divers niveaux
            de détail.
          </p>
        </div>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/monde/petit" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-sm duration-300">
                Monde (petit et grand) <span className="opacity-0">hi</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>
            Les épisodes sont présentés sous la forme d'un monde imaginaire
            (graphique radial), où chaque élément correspond à un épisode de la
            série. Les petits et grands mondes dépeignent un univers animé, dans
            lequel chaque élément est associé à la série de manière unique.
          </p>
        </div>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/matrice" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-sm duration-300">
                Matrice <span className="opacity-0">hi</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>
            Dans cette visualisation, une matrice de données (comme un heatmap)
            est présentée, chaque cellule représentant un épisode de la série.
            Cette visualisation met en lumière les liens entre les différents
            épisodes, les écoles et les techniques, facilitant la navigation
            entre les œuvres.
          </p>
        </div>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/galaxie" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-sm duration-300">
                Galaxie <span className="opacity-0">hi</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>
            Les épisodes sont représentés sous forme d'étoiles dans une galaxie.
            Chaque épisode scintille avec la couleur correspondant à la
            technique d'animation employée, et vous invite à un voyage à travers
            les différentes écoles. Dans cette représentation, il est possible
            d'explorer les différentes techniques d'animation et les écoles en
            interagissant avec les nœuds.
          </p>
        </div>
        <div className="group">
          <h3 className="mb-4">
            <Link to="/fleur" className="relative no-underline">
              <span className="font-sousTitre text-2xl text-slate-950 drop-shadow-md duration-300">
                Fleur <span className="opacity-0">hid</span>
              </span>{" "}
              <img
                className="absolute -left-1 -top-5 inline h-4 w-80 opacity-100 grayscale duration-500 group-hover:grayscale-0"
                src="/brush2.png"
                alt=""
              />
            </Link>
          </h3>
          <p>
            Admirez les épisodes sous la forme de fleurs aux pétales
            multicolores. Chaque fleur représente un épisode, et ses pétales
            symbolisent les techniques d'animation et les palettes de couleurs
            utilisées. En survolant chaque fleur, découvrez le nom de l'épisode
            et du réalisateur.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
