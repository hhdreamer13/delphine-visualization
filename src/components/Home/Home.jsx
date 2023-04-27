/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useModalContext } from "../ModalContext";

const Home = () => {
  const { setShowModal } = useModalContext();

  return (
    <div className="mb-40">
      <div className="relative mx-auto mt-20 flex w-full flex-col items-center justify-center p-2 text-lg">
        <div className="relative">
          <motion.img
            onClick={() => setShowModal(true)}
            className="wind-animation absolute left-4 top-0 h-8 w-8"
            src="/flower.svg"
            alt=""
            // style={{ transform: "translate(-50%, 50%)" }}
          />
          <h1 className="mb-4 text-4xl uppercase tracking-[1rem]">
            P AnimaVi<span className="tracking-tighter">z</span>
          </h1>
        </div>
        <h3 className="mb-2 text-2xl">
          une visualisation poétique de données de la série d'animation
        </h3>
        <h3 className="text-2xl">En Sortant de l'École</h3>
      </div>
      <div className="prose mt-10 text-justify text-lg">
        <p className="text-slate-950 drop-shadow-lg">
          {/* C'est quoi la série En sortant de l'école ? */}
        </p>
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
          Ces poèmes prennent vie grâce à la créativité débordante de jeunes
          réalisateurs et réalisatrices, tout juste sortis des écoles des
          meilleures écoles d'animation françaises. Cette série hors du commun,
          produite par Tant Mieux Production, une maison de production célèbre
          pour cette série d'animation, vous invite à un voyage poétique et
          visuellement éblouissant à travers la poésie et l'art.
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
          Maintenant, découvrez les 5 catégories de visualisations uniques que
          ce site vous offre. L'objectif de ces visualisations est de mettre en
          lumière l'art et la poésie qui se cachent derrière chaque épisode, en
          présentant les techniques d'animation, les réalisateurs et les poètes
          de manière innovante. Plongez dans un univers poétique et explorez les
          différentes visualisations pour en apprendre davantage sur cette série
          unique.
        </p>
        <p>
          Voici les cinq catégories de visualisations accessibles sur le site
          via la barre de navigation :
        </p>
        <ul className="custom-bullet">
          <li>
            <Link to="/ville/petite" className="no-underline ">
              <span className="font-sousTitre text-2xl text-cyan-500 drop-shadow-md duration-300 hover:text-slate-900">
                Ville (petite et grande)
              </span>{" "}
            </Link>
            : Découvrez les épisodes de la série En Sortant de l'école à travers
            une représentation urbaine où chaque bâtiment illustre un épisode.
            Les petites et grandes villes vous offrent des perspectives
            différentes sur la série, avec des niveaux de détail variés.
          </li>
          <li>
            <Link to="/monde/petit" className="no-underline ">
              <span className="font-sousTitre text-2xl text-teal-500 drop-shadow-md duration-300 hover:text-slate-900">
                Monde (petit et grand)
              </span>{" "}
            </Link>
            : Explorez les épisodes sous la forme d'un monde imaginaire, où
            chaque paysage et élément représente un épisode de la série. Les
            petits et grands mondes vous plongent dans un univers onirique et
            poétique, où chaque élément est lié à la série d'une manière unique.
          </li>
          <li>
            <Link to="/matrice" className="no-underline ">
              <span className="font-sousTitre text-2xl text-amber-500 drop-shadow-md duration-300 hover:text-slate-900">
                Matrice
              </span>{" "}
            </Link>
            : Plongez dans une matrice de données où chaque cellule représente
            un épisode de la série. Cette visualisation met en évidence les
            liens entre les différents épisodes, les écoles et les techniques,
            et vous permet de naviguer facilement entre les œuvres.
          </li>
          <li>
            <Link to="/galaxie" className="no-underline ">
              <span className="font-sousTitre text-2xl text-orange-500 drop-shadow-md duration-300 hover:text-slate-900">
                Galaxie
              </span>{" "}
            </Link>
            : Explorez les épisodes comme s'ils étaient des étoiles dans une
            galaxie lointaine. Chaque épisode brille de mille feux et vous
            emmène dans un voyage à travers l'espace, à la découverte des
            différentes techniques d'animation et les écoles.
          </li>
          <li>
            <Link to="/fleur" className="no-underline ">
              <span className="font-sousTitre text-2xl text-rose-500 drop-shadow-md duration-300 hover:text-slate-900">
                Fleur
              </span>{" "}
            </Link>
            : Admirez les épisodes sous la forme de fleurs aux pétales
            multicolores. Chaque fleur représente un épisode, et ses pétales
            symbolisent les techniques d'animation et les palettes de couleurs
            utilisées. En survolant chaque fleur, découvrez le nom de l'épisode
            et du réalisateur.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
