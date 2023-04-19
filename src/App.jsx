import { useState } from "react";
import data from "./utils/poanimaDataset.json";
import EpisodeWordsBarChart from "./components/EpisodeWordsBarChart/EpisodeWordsBarChart";
import TitleWordsRadialAll from "./components/TitleWordsRadial/TitleWordsRadialAll";
import FlowerAnimation from "./components/FlowerAnimation/FlowerAnimation";
import SchoolForce from "./components/SchoolForce/SchoolForce";
import SeasonEpisodeHeatmaps from "./components/SeasonEpisodeHeatmaps/SeasonEpisodeHeatmaps";
import TitleWordsRadialSeason from "./components/TitleWordsRadial/TitleWordsRadialSeason";

function App() {
  const [films, setFilms] = useState(data.filter((d) => d.season === 1));
  const [season, setSeason] = useState(1);

  const handleChange = () => {
    const randomSeason = Math.floor(Math.random() * 10) + 1;
    setFilms(data.filter((d) => d.season === randomSeason));
    setSeason(randomSeason);
  };

  return (
    <div className="my-10 flex min-h-screen w-screen flex-col items-center">
      <h1>Data visualization</h1>
      <button className="btn-ghost btn my-10" onClick={handleChange}>
        Change Season: {season}
      </button>
      <div className="mb-20">
        <SeasonEpisodeHeatmaps data={data} />
      </div>
      <div className="mb-20">
        <SchoolForce data={data} />
      </div>
      <div className="mb-20">
        <FlowerAnimation data={films} />
      </div>
      <div className="mb-20">
        <TitleWordsRadialSeason data={films} />
      </div>
      <div className="mb-20">
        <TitleWordsRadialAll data={data} />
      </div>
      <div className="">
        <EpisodeWordsBarChart data={data} />
      </div>
    </div>
  );
}

export default App;
