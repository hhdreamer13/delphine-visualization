import { useState } from "react";
import TitleWordsRadialSeason from "../components/TitleWordsRadial/TitleWordsRadialSeason";
import data from "../utils/poanimaDataset.json";

const RadialSeasonWrapper = () => {
  const filterData = (seasonNumber) => {
    return data.filter((item) => item.season === seasonNumber);
  };

  const [filteredData, setFilteredData] = useState(filterData(1));
  const [selectedSeason, setSelectedSeason] = useState(1);

  const handleSeasonChange = (event) => {
    const seasonNumber = parseInt(event.target.value, 10);
    setSelectedSeason(seasonNumber);
    setFilteredData(filterData(seasonNumber));
  };

  return (
    <div>
      <h1>Radial per season chart</h1>
      <div>
        <label htmlFor="season-select">Filter by Season:</label>
        <select
          id="season-select"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              Season {index + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <TitleWordsRadialSeason data={filteredData} />
      </div>
    </div>
  );
};

export default RadialSeasonWrapper;
