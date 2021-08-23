import { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
// import { DatePicker } from "@material-ui/pickers";
// import { getCountries } from "./structures/api";
import { cityCode } from "./structures/cityCode.json";
// import Graph from "./structures/graph";
import "./App.css";

function App() {
  // const [countries] = useState(
  //   useState([
  //     {
  //       Code: "BR",
  //       Name: "Brasil",
  //     },
  //     {
  //       Code: "US",
  //       Name: "Estados Unidos",
  //     },
  //     {
  //       Code: "MZ",
  //       Name: "Moçambique",
  //     },
  //     {
  //       Code: "RU",
  //       Name: "Rússia",
  //     },
  //     {
  //       Code: "AR",
  //       Name: "Argentina",
  //     },
  //   ])
  // );
  // const [graph] = useState(new Graph());

  const [origin, setOrigin] = useState("");
  const [inputValueOrigin, setInputValueOrigin] = useState("");

  const [destination, setDestination] = useState("");
  const [inputValueDestination, setInputValueDestination] = useState("");

  const [selectedDate] = useState("");

  useEffect(() => {
    console.log(origin);
  }, [origin]);

  useEffect(() => {
    console.log(destination);
  }, [destination]);

  // useEffect(() => {
  //   countries[0].forEach((country) => {
  //     getCountries("BSB-sky", "2021-08-24", `${country.Code}-sky`, graph);
  //     getCountries(`${country.Code}-sky`, "2021-08-24", "CDG-sky", graph);
  //   });
  //   getCountries(`BSB-sky`, "2021-08-24", "CDG-sky", graph);
  //   console.log(graph);
  // }, [countries, graph]);

  return (
    <div className="App">
      <div className="Content">
        <div className="Map"></div>
        <div className="SideBar">
          <Autocomplete
            value={inputValueOrigin}
            onChange={(event, newValue) => {
              if (newValue === null) {
                setOrigin("");
              } else {
                setOrigin(newValue.code);
              }
            }}
            inputValue={inputValueOrigin}
            onInputChange={(event, newInputValueOrigin) => {
              if (typeof newInputValueOrigin === "string") {
                setInputValueOrigin(newInputValueOrigin);
              } else {
                setInputValueOrigin("Origin");
              }
            }}
            id="controllable-states-demo"
            options={cityCode}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              } else if (option.city === undefined) {
                return "Origin";
              }
              return `${option.city} - ${option.country}, ${option.code}`;
            }}
            style={{ width: 300 }}
            renderInput={(params) => {
              return (
                <TextField {...params} label="Origin" variant="outlined" />
              );
            }}
          />

          <Autocomplete
            value={inputValueDestination}
            onChange={(event, newValue) => {
              if (newValue === null) {
                setDestination("");
              } else {
                setDestination(newValue.code);
              }
            }}
            inputValue={inputValueDestination}
            onInputChange={(event, newInputValue) => {
              if (typeof newInputValue === "string") {
                setInputValueDestination(newInputValue);
              } else {
                setInputValueDestination("Destination");
              }
            }}
            id="controllable-states-demo"
            options={cityCode}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              } else if (option.city === undefined) {
                return "Destination";
              }
              return `${option.city} - ${option.country}, ${option.code}`;
            }}
            style={{ width: 300 }}
            renderInput={(params) => {
              return (
                <TextField {...params} label="Destination" variant="outlined" />
              );
            }}
          />

          {/* <DatePicker
            label=""
            value={selectedDate}
            onChange={(event, newValue) => {
              console.log(newValue);
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
