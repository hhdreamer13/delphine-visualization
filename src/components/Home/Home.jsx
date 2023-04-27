/* eslint-disable react/no-unescaped-entities */
const Home = () => {
  return (
    <div className="">
      <div className="relative mx-auto mt-20 flex w-full flex-col items-center justify-center p-2 text-lg">
        <div className="relative">
          <img
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
          C'est quoi la série En sortant de l'école ?
        </p>
        <p>
          En sortant de l'école est une collection de courts métrages
          d’animation de 3 minutes, qui se propose d’associer poétiquement, dans
          la liberté artistique la plus exigeante, des œuvres de grands poètes
          français à l'univers graphique de jeunes réalisateurs tout juste
          sortis des écoles d'animation françaises.
        </p>
      </div>
    </div>
  );
};

export default Home;
