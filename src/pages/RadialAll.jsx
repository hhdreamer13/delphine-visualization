/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import _ from "lodash";
import dataset from "../utils/poanimaDataset.json";
import TitleWordsRadialAll from "../components/TitleWordsRadial/TitleWordsRadialAll";
import Legend from "../components/Legend";
import techniqueColors from "../utils/techniqueColors.json";

const RadialAllWrapper = () => {
  const [data, setData] = useState(dataset);

  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose mb-10 w-full">
        <h2 className="text-center text-3xl uppercase tracking-widest drop-shadow-md">
          Le Grand Monde
        </h2>
      </div>

      <div className="mx-auto flex w-full justify-center">
        <div className="mt-20 hidden w-40 lg:block">
          <Legend obj={techniqueColors} />
        </div>

        <div id="chart-container">
          <div className="m-1">
            <TitleWordsRadialAll data={data} />
          </div>
        </div>
        <div id="buttons" className="mt-20 hidden w-40 justify-center lg:block">
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words))}
            className="btn-outline btn-sm btn my-2 w-28 font-normal normal-case"
          >
            Croissant
          </button>
          <button
            onClick={() => setData(dataset)}
            className="btn-secondary btn-sm btn my-2 w-28 font-normal normal-case"
          >
            Réinitialiser
          </button>
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words).reverse())}
            className="btn-outline btn-sm btn my-2 w-28 font-normal normal-case"
          >
            Décroissant
          </button>
        </div>
      </div>
      <div className="prose text-justify text-lg">
        <h3 className="my-5 text-3xl">Un tour du monde des épisodes</h3>
        <p>
          "Le Grand Monde" est une visualisation circulaire qui présente les
          épisodes de la série "En sortant de l'école" en mettant l'accent sur
          les techniques d'animation. Ce monde coloré et dynamique vous offre un
          aperçu étonnant des méthodes artistiques utilisées dans chaque
          épisode, vous permettant d'apprécier leur diversité et leur
          inventivité.
        </p>
        <p>
          Dans cette visualisation, chaque segment du cercle représente un
          épisode, et sa couleur correspond à la technique d'animation utilisée.
          Admirez les nuances vives et distinctes qui symbolisent les
          différentes techniques et illustrent la richesse artistique de la
          série.
        </p>
        <p>Pour explorer "Le Grand Monde", suivez ces étapes :</p>
        <ol>
          <li>
            Survolez un segment avec votre curseur pour obtenir des informations
            détaillées sur l'épisode.
          </li>
          <li>
            Utilisez les boutons en haut à droite pour trier les épisodes par
            nombre de mots croissant, décroissant ou pour réinitialiser
            l'affichage.
          </li>
          <li>
            Consultez la légende à gauche pour identifier les techniques
            d'animation représentées par les différentes couleurs.
          </li>
        </ol>
        <p>
          En parcourant "Le Grand Monde", vous pourrez apprécier la variété des
          techniques d'animation et comprendre comment elles sont réparties
          entre les épisodes. Les couleurs vives et distinctes facilitent
          l'identification des techniques utilisées et rendent la visualisation
          encore plus attrayante. Embarquez pour un voyage fascinant à travers
          l'art et l'animation et découvrez les trésors cachés de la série "En
          sortant de l'école".
        </p>
      </div>
    </div>
  );
};

export default RadialAllWrapper;
