/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import SchoolForce from "../components/SchoolForce/SchoolForce";
import data from "../utils/poanimaDataset.json";

const ForceWrapper = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mx-auto my-20 mb-40 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose w-full">
        <h2 className="-ml-16 text-left text-3xl uppercase tracking-widest drop-shadow-md">
          La galaxie
        </h2>
      </div>
      <div className="m-10">
        <SchoolForce data={data} />
      </div>
      <div className="prose -ml-16 text-justify text-lg">
        <h3 className="my-5 text-3xl">
          Carte cosmique des écoles et des techniques
        </h3>
        <p>
          La visualisation "La Galaxie" évoque un cosmos où les écoles
          d'animation et les techniques artistiques gravitent les unes autour
          des autres. Les étoiles filantes de cette galaxie sont les éléments
          suivants:
        </p>
        <ul className="custom-bullet">
          <li>
            Les écoles d'animation: Représentées par des nœuds chatoyants, elles
            scintillent au sein du réseau, éclairant les chemins de la
            créativité et de l'innovation.
          </li>
          <li>
            Les films d'animation: Tels des satellites, ces nœuds plus petits
            orbitent autour de leurs écoles respectives, témoignant de la
            richesse et de la diversité des œuvres de la série.
          </li>
          <li>
            Les techniques artistiques: Les couleurs flamboyantes des petits
            nœuds illustrent les différentes techniques d'animation utilisées
            dans les films, illuminant la toile de leurs nuances variées.
          </li>
        </ul>
        Pour naviguer dans cet univers enchanteur :
        <ol className="">
          <li className="">
            Survolez les nœuds avec votre souris pour révéler les mystères de
            chaque école, film et technique d'animation.
          </li>
          <li className="">
            La légende à droite du graphique dévoile les couleurs associées à
            chaque école, tandis que les techniques d'animation scintillent en
            dessous avec leurs teintes respectives.
          </li>
          <li className="">
            Déplacez les nœuds pour mieux explorer les connections entre les
            écoles et les films d'animation, et percez les secrets de cet
            univers fascinant.
          </li>
        </ol>
        <p>
          Plongez dans ce voyage cosmique et découvrez les écoles et les
          techniques qui ont sculpté le monde de cette série à travers les
          années. Dans cette odyssée céleste, chaque étoile est une porte
          ouverte sur l'infini des possibilités créatives et artistiques.
        </p>
      </div>
    </div>
  );
};

export default ForceWrapper;
