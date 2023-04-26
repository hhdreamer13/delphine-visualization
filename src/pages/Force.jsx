/* eslint-disable react/no-unescaped-entities */
import SchoolForce from "../components/SchoolForce/SchoolForce";
import data from "../utils/poanimaDataset.json";

const ForceWrapper = () => {
  return (
    <div className="mx-auto my-20 flex w-full flex-col items-center justify-center">
      <div id="description" className="prose w-full">
        <h2 className="-ml-16 text-left text-3xl uppercase tracking-widest">
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
        <p className="">
          La visualisation de galaxie ci-dessus illustre les relations entre les
          écoles d'animation et les techniques utilisées dans les films
          d'animation. Cette visualisation présente les écoles en tant que nœuds
          dans un graphique, tandis que les films sont également représentés par
          des nœuds et sont reliés aux écoles auxquelles ils appartiennent. Les
          couleurs des nœuds indiquent les différentes écoles et techniques
          d'animation utilisées dans les films.
        </p>
        <ul className="">
          <li className="">
            Pour explorer cette visualisation, il suffit de passer la souris sur
            les nœuds représentant les écoles ou les films pour afficher les
            détails de chacun d'entre eux. Les nœuds représentant les écoles
            sont plus grands que ceux des films.
          </li>
          <li className="">
            La légende située à droite du graphique montre les couleurs
            associées à chaque école. Les techniques d'animation sont également
            affichées sous le graphique avec leurs couleurs respectives.
          </li>
          <li className="">
            En interagissant avec cette visualisation, vous pouvez également
            déplacer les nœuds pour explorer les relations entre les films et
            les écoles d'animation.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ForceWrapper;
