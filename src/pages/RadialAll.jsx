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
        <h2 className="text-center text-3xl uppercase tracking-widest">
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
            className="btn-outline btn-sm btn my-2 w-28 normal-case"
          >
            Croissant
          </button>
          <button
            onClick={() => setData(dataset)}
            className="btn-outline btn-sm btn my-2 w-28 normal-case"
          >
            Réinitialiser
          </button>
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words).reverse())}
            className="btn-outline btn-sm btn my-2 w-28 normal-case"
          >
            Décroissant
          </button>
        </div>
      </div>
      <div className="prose text-justify text-lg">
        <h3>Un tour du monde des Techniques d'animation</h3>
        <p>
          La visualisation "Le Grand Monde" offre une perspective circulaire
          unique sur les épisodes de la série "En sortant de l'école". Chaque
          segment du cercle représente un épisode, et la couleur de chaque
          segment correspond à la technique d'animation utilisée dans cet
          épisode. Cette présentation en forme de monde met en valeur la
          diversité et la richesse des techniques artistiques employées tout au
          long des saisons.
        </p>
        <p>Pour explorer cette visualisation, suivez ces étapes :</p>
        <ol>
          <li>
            Passez le curseur de votre souris sur un segment pour obtenir des
            informations détaillées sur l'épisode, notamment le nombre de mots
            et la technique d'animation utilisée.
          </li>
          <li>
            Utilisez les boutons en haut à gauche pour trier les épisodes par
            nombre de mots croissant, décroissant ou pour réinitialiser
            l'affichage.
          </li>
          <li>
            Consultez la légende à droite pour identifier les techniques
            d'animation représentées par les différentes couleurs.
          </li>
        </ol>
        <p>
          En explorant "Le Grand Monde", vous pouvez apprécier la variété des
          techniques d'animation et comprendre comment elles sont réparties
          entre les épisodes. Les couleurs vives et distinctes facilitent
          l'identification des techniques utilisées et rendent la visualisation
          encore plus attrayante.
        </p>
      </div>
    </div>
  );
};

export default RadialAllWrapper;
