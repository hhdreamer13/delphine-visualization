import React, { useState } from "react";
import FlowerAnimation from "../components/FlowerAnimation/FlowerAnimation";
import data from "../utils/poanimaDataset.json";

const FlowerWrapper = () => {
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
      <h1>Flower Chart</h1>
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
        <FlowerAnimation data={filteredData} />
      </div>
    </div>
  );
};

export default FlowerWrapper;
