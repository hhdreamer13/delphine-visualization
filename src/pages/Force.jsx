/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import SchoolForce from "../components/SchoolForce/SchoolForce";
import data from "../utils/poanimaDataset.json";
import Lottie from "lottie-react";
import draggable from "../assets/91007-pinview.json";

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
      <div className="relative m-10">
        <SchoolForce data={data} />
        <div
          className="absolute -bottom-10 right-[77px] hidden w-28 rotate-180 flex-col items-center justify-center p-0 -hue-rotate-90 saturate-150 lg:flex"
          title="Les nœuds sont déplaçables"
        >
          <Lottie animationData={draggable} loop autoplay speed={0.1} />
          {/* <p className="animate-pulse">déplaçable</p> */}
        </div>
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
            les écoles d'animation : représentées par des nœuds chatoyants,
            elles scintillent au sein du réseau, éclairant les chemins de la
            créativité et de l'innovation.
          </li>
          <li>
            les films d'animation : tels des satellites, ces nœuds plus petits
            orbitent autour de leurs écoles respectives, témoignant de la
            richesse et de la diversité des œuvres de la série.
          </li>
          <li>
            Les couleurs : la couleur des petits nœuds illustrent la technique
            principale utilisée dans le film, et les cercles plus grands,
            scintillent de la couleur des écoles.
          </li>
        </ul>
        <p>Pour naviguer dans cette galaxie lointaine :</p>
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
          Dans ce voyage cosmique, vous découvrez les écoles et les techniques
          qui ont sculpté le monde de la série à travers les années. Dans cette
          odyssée céleste, chaque étoile est une porte ouverte sur l'infini des
          possibilités créatives et artistiques.
        </p>
      </div>
    </div>
  );
};

export default ForceWrapper;
