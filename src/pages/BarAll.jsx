/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import _ from "lodash";
import dataset from "../utils/poanimaDataset.json";
import EpisodeWordsBarChart from "../components/EpisodeWordsBarChart/EpisodeWordsBarChart";

const BarAllWrapper = () => {
  const [data, setData] = useState(dataset);

  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose mb-10 w-full">
        <h2 className="text-center text-3xl uppercase tracking-widest">
          La Grande Ville
        </h2>
      </div>
      <div className="mx-auto flex w-full flex-row-reverse justify-center">
        <div id="buttons" className="mt-20 w-40 justify-center">
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
        <div id="chart-container">
          <div className="m-10">
            <EpisodeWordsBarChart data={data} width="800" />
          </div>
        </div>
      </div>
      <div className="prose -ml-16 text-justify text-lg">
        <h3>Les Écoles et Techniques à travers les Saisons</h3>

        <p>
          La visualisation "La Grande Ville" présente un graphique à barres
          montrant le nombre de mots pour chaque épisode de la série{" "}
          <span className="italic">"En sortant de l'école"</span>. Les mots
          représentés proviennent des poèmes dont les animations sont adaptées.
          Chaque barre est colorée du plus clair au plus foncé, indiquant
          l'augmentation du nombre de mots dans l'épisode.
        </p>
        <p>
          Pour tirer le meilleur parti de cette visualisation, suivez ces étapes
          :
        </p>
        <ol>
          <li>
            Utilisez les boutons "Croissant", "Décroissant" et "Réinitialiser"
            pour ajuster l'ordre des barres en fonction du nombre de mots de
            chaque épisode.
          </li>
          <li>
            Passez le curseur de votre souris sur une barre pour obtenir des
            informations supplémentaires sur l'épisode, notamment le nombre de
            mots et les techniques d'animation employées.
          </li>
        </ol>
        <p>
          Cette visualisation offre une perspective unique sur la variété des
          approches narratives et artistiques de la série, mettant en évidence
          les différences et les similitudes entre les épisodes à travers les
          saisons. Les couleurs des barres permettent d'identifier rapidement
          les épisodes avec un nombre de mots croissant, offrant ainsi un aperçu
          visuel de la densité narrative des adaptations.
        </p>
      </div>
    </div>
  );
};

export default BarAllWrapper;
