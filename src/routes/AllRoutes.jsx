import { Route } from "react-router-dom";
import data from "../utils/poanimaDataset.json";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
import SeasonEpisodeHeatmaps from "../components/SeasonEpisodeHeatmaps/SeasonEpisodeHeatmaps";
import SchoolForce from "../components/SchoolForce/SchoolForce";
import TitleWordsRadialSeason from "../components/TitleWordsRadial/TitleWordsRadialSeason";
import TitleWordsRadialAll from "../components/TitleWordsRadial/TitleWordsRadialAll";
import EpisodeWordsBarChart from "../components/EpisodeWordsBarChart/EpisodeWordsBarChart";
import FlowerWrapper from "../pages/Flower";
import RadialSeasonWrapper from "../pages/RadialSeason";

const AllRoutes = () => {
  return (
    <>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route
          path="/heatmap"
          element={<SeasonEpisodeHeatmaps data={data} />}
        />
        <Route path="/force" element={<SchoolForce data={data} />} />
        <Route path="/flower" element={<FlowerWrapper />} />
        <Route path="/radial" element={<RadialSeasonWrapper />} />
        <Route
          path="/radial-all"
          element={<TitleWordsRadialAll data={data} />}
        />
        <Route path="/bar-all" element={<EpisodeWordsBarChart data={data} />} />
      </Route>
    </>
  );
};

export default AllRoutes;
