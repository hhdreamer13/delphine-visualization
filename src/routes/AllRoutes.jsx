import { Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
import FlowerWrapper from "../pages/Flower";
import ForceWrapper from "../pages/Force";
import HeatmapWrapper from "../pages/Heatmap";
import RadialBarAllWrapper from "../pages/RadialAll";
import BarSeasonWrapper from "../pages/BarSeason";
import BarAllWrapper from "../pages/BarAll";
import RadialSeasonWrapper from "../pages/RadialSeason";

const AllRoutes = () => {
  return (
    <>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/matrice" element={<HeatmapWrapper />} />
        <Route path="/galaxie" element={<ForceWrapper />} />
        <Route path="/fleur" element={<FlowerWrapper />} />
        <Route path="/monde/petit" element={<RadialSeasonWrapper />} />
        <Route path="/monde/grand" element={<RadialBarAllWrapper />} />
        <Route path="/ville/petite" element={<BarSeasonWrapper />} />
        <Route path="/ville/grande" element={<BarAllWrapper />} />
      </Route>
    </>
  );
};

export default AllRoutes;
