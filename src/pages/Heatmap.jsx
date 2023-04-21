/* eslint-disable react/no-unescaped-entities */
import SeasonEpisodeHeatmaps from "../components/SeasonEpisodeHeatmaps/SeasonEpisodeHeatmaps";
import data from "../utils/poanimaDataset.json";

const HeatmapWrapper = () => {
  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose w-full">
        <h2 className="-ml-16 text-left text-3xl uppercase tracking-widest">
          La Matrice
        </h2>
      </div>
      <div className="m-10">
        <SeasonEpisodeHeatmaps data={data} />
      </div>
      <div className="prose -ml-16 text-justify text-lg">
        <h3>Les Écoles et Techniques à travers les Saisons</h3>
        <p>
          La visualisation Matrice d'animation ci-dessus représente les
          différentes écoles et techniques d'animation utilisées dans chaque
          épisode des 10 saisons de la série{" "}
          <span className="italic">"En sortant de l'école"</span>.
        </p>
        <p>Voici comment explorer cette visualisation :</p>
        <ol>
          <li>
            Passez votre souris sur les cases pour afficher les détails de
            chaque épisode.
          </li>
          <li>
            Utilisez le bouton bascule en haut à droite pour changer entre les
            modes de visualisation "Écoles" et "Techniques".
          </li>
          <li>
            Dans la légende, cliquez sur un élément pour filtrer la
            visualisation en fonction de l'école ou de la technique
            sélectionnée.
          </li>
          <li>Cliquez à nouveau pour désélectionner.</li>
        </ol>
        <p>
          Les colonnes représentent les épisodes et les lignes les saisons. Les
          cases colorées montrent les écoles ou les techniques d'animation,
          selon le mode de visualisation choisi.
        </p>
      </div>
    </div>
  );
};

export default HeatmapWrapper;
