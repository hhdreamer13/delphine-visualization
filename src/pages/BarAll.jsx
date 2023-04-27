/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import _ from "lodash";
import dataset from "../utils/poanimaDataset.json";
import EpisodeWordsBarChart from "../components/EpisodeWordsBarChart/EpisodeWordsBarChart";

const BarAllWrapper = () => {
  const [data, setData] = useState(dataset);

  return (
    <div className="mx-auto my-20 mb-40 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose mb-10 w-full">
        <h2 className="text-center text-3xl uppercase tracking-widest drop-shadow-md">
          La Grande Ville
        </h2>
      </div>
      <div className="mx-auto flex w-full flex-row-reverse justify-center">
        <div id="buttons" className="mt-20 hidden w-40 justify-center lg:block">
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words))}
            className="btn-outline btn-sm btn my-2 w-28 rounded-sm font-normal normal-case"
          >
            Croissant
          </button>
          <button
            onClick={() => setData(dataset)}
            className="btn-secondary btn-sm btn my-2 w-28 rounded-sm font-normal normal-case"
          >
            Réinitialiser
          </button>
          <button
            onClick={() => setData(_.sortBy(data, (d) => d.words).reverse())}
            className="btn-outline btn-sm btn my-2 w-28 rounded-sm font-normal normal-case"
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
      <div className="prose text-justify text-lg">
        <h3 className="my-4 text-3xl">Un panorama urbain des épisodes</h3>
        <p>
          "La Grande Ville" est une visualisation ludique et colorée sous forme
          de graphique en barres qui représente l'ensemble des épisodes de la
          série "En sortant de l'école" comme les bâtiments d'une ville
          empreinte de poésie et de créativité.
        </p>
        <p>
          Cette visualisation invite à un voyage à travers les épisodes de la
          série "En sortant de l'école", où chaque barre du graphique incarne un
          épisode animé et sa hauteur témoigne du nombre de mots du poème
          adapté.
        </p>
        <ul className="custom-bullet">
          <li className="">
            <span className="">chaque barre :</span> une escale vers un épisode
            poétique
          </li>
          <li className="">
            <span className="">hauteur des barres :</span> l'intensité du récit
            en mots
          </li>
          <li className="">
            <span className="">couleurs :</span> du bleu au rouge, reflétant
            l'évolution du nombre de mots
          </li>
        </ul>
        <p>
          Les boutons "Croissant", "Décroissant" et "Réinitialiser" permettent
          d'ajuster l'ordre des barres selon le nombre de mots de chaque
          épisode. En survolant les barres, des informations supplémentaires sur
          l'épisode sont dévoilées, telles que le nombre de mots et les
          techniques d'animation employées.
        </p>
        <ol>
          <li>Ajustez l'ordre des barres pour explorer les récits</li>
          <li>Découvrez les épisodes en survolant les barres</li>
          <li>
            Baladez le curseur sur une barre pour dévoiler les secrets de
            l'épisode
          </li>
        </ol>
        <p>
          La visualisation "La Grande Ville" offre une fenêtre unique sur la
          diversité des approches narratives et artistiques de la série, mettant
          en lumière les différences et les similitudes entre les épisodes au
          fil des saisons. Les couleurs des barres permettent de repérer
          rapidement les épisodes avec un nombre de mots croissant, offrant
          ainsi un aperçu visuel de la richesse narrative des adaptations. Cette
          ville imaginaire invite à plonger dans l'univers fascinant de la série
          "En sortant de l'école".
        </p>
      </div>
    </div>
  );
};

export default BarAllWrapper;
