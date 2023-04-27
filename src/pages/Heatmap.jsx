/* eslint-disable react/no-unescaped-entities */
import SeasonEpisodeHeatmaps from "../components/SeasonEpisodeHeatmaps/SeasonEpisodeHeatmaps";
import data from "../utils/poanimaDataset.json";

const HeatmapWrapper = () => {
  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose w-full">
        <h2 className="-ml-16 text-left text-3xl uppercase tracking-widest drop-shadow-md">
          La Matrice
        </h2>
      </div>
      <div className="m-10">
        <SeasonEpisodeHeatmaps data={data} />
      </div>
      <div className="prose -ml-16 text-justify text-lg">
        <h3 className="my-5 text-3xl">
          Les Écoles et Techniques à travers les saisons
        </h3>
        <p>
          Plongez dans un monde de créativité et de diversité en explorant la
          Matrice d'Animation, une visualisation captivante qui met en lumière
          les différentes écoles et techniques d'animation utilisées dans chaque
          épisode des 10 saisons de la série "En sortant de l'école". Comme un
          vitrail révélant un monde coloré et riche en détails, cette
          représentation graphique vous invite à explorer l'univers créatif des
          artistes derrière la série.
        </p>
        <p>
          La Matrice est organisée en colonnes et lignes, où chaque colonne
          représente un épisode et chaque ligne représente une saison. Les cases
          colorées illustrent les écoles ou les techniques d'animation
          employées, selon le mode de visualisation choisi. Pour explorer cette
          visualisation, suivez ces étapes :
        </p>
        <p>Voici comment naviguer dans cette visualisation fascinante :</p>
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
          La Matrice d'Animation offre une perspective unique sur la richesse et
          la diversité des écoles et techniques d'animation qui ont contribué à
          donner vie à la série "En sortant de l'école". Prenez le temps
          d'explorer cette visualisation et découvrez les trésors cachés et les
          histoires qui se cachent derrière chaque case colorée.
        </p>
      </div>
    </div>
  );
};

export default HeatmapWrapper;
