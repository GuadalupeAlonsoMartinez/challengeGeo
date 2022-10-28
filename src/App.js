import React, { useState } from "react";
import "./App.css";

function App() {
  const [positionsState, setPositionsState] = useState([]);
  const eventClick = function () {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Show a map centered at latitude / longitude.
      saveCoords(latitude, longitude);
    });
  };
  const saveCoords = function (latitude, longitude) {
    var listPosition = localStorage.getItem("positions");
    var positions = [];
    if (listPosition !== null) {
      positions = JSON.parse(listPosition);
    }
    positions.push({ latitude, longitude });
    setPositionsState([positionsState,...positions]);
    localStorage.setItem("positions", JSON.stringify(positions));
  };
  const createRows = function () {
    return positionsState.map((position,index) => {
      const { latitude, longitude } = position;
      return (
        <tr key={index}> 
          <td>{latitude}</td>
          <td>{longitude}</td>
        </tr>
      );
    });
  };
  return (
    <div className="App">
      <button onClick={eventClick}>LOCATION NOW</button>
      <table>
        <thead>
          <tr>
            <th>latitude</th>
            <th>longitude</th>
          </tr>
        </thead>
        <tbody>{createRows()} </tbody>
      </table>
    </div>
  );
}

export default App;
