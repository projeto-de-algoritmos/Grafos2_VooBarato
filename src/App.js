import { useEffect, useState } from "react";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { Alert } from "@material-ui/lab";
import { getCountries } from "./structures/api";
import { cityCode } from "./structures/cityCode.json";
import Graph from "./structures/Graph";
import "./App.css";
import Map from "./Map";

const filter = createFilterOptions();

function App() {
  const [countries] = useState(
    useState([
      {
        Code: "BR",
        Name: "Brasil",
      },
      {
        Code: "US",
        Name: "Estados Unidos",
      },
      {
        Code: "MX",
        Name: "Mexico",
      },
      {
        Code: "RU",
        Name: "Rússia",
      },
      {
        Code: "AR",
        Name: "Argentina",
      },
    ])
  );
  const [graph] = useState(new Graph());

  const [alert, setAlert] = useState(false);

  const [origin, setOrigin] = useState("");

  const [destination, setDestination] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    var result = new Date();
    result.setDate(result.getDate() + 60);

    var date = ("0" + result.getDate()).slice(-2);
    var month = ("0" + (result.getMonth() + 1)).slice(-2);
    var year = result.getFullYear();

    setMaxDate(`${year}-${month}-${date}`);
  }, [maxDate]);

  useEffect(() => {
    var result = new Date();

    var date = ("0" + result.getDate()).slice(-2);
    var month = ("0" + (result.getMonth() + 1)).slice(-2);
    var year = result.getFullYear();

    setMinDate(`${year}-${month}-${date}`);
  }, [minDate]);

  // useEffect(() => {
  //   getLatLong();
  // }, []);

  const searchTravel = () => {
    if (origin === "" || destination === "" || selectedDate === "") {
      setAlert(true);
      setTimeout(() => setAlert(false), 10000);
      return;
    }

    countries[0].forEach((country) => {
      getCountries(`${origin}-sky`, selectedDate, `${country.Code}-sky`, graph);
      getCountries(
        `${country.Code}-sky`,
        selectedDate,
        `${destination}-sky`,
        graph
      );
    });
    getCountries(`${origin}-sky`, selectedDate, `${destination}-sky`, graph);

    console.log(graph);
    setTimeout(() => console.log(graph), 10000);
  };

  return (
    <div className="App">
      <div className="Content">
        <div className="MapContent">
          <div></div>
          <Map />
        </div>
        <div className="SideBar">
          <div className="Title">
            <h3>VooBarato</h3>
          </div>
          <div className="Form">
            <div className="FormInput">
              <Autocomplete
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setOrigin("");
                  } else {
                    setOrigin(newValue.code);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                options={cityCode}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  } else if (option.city === undefined) {
                    return "";
                  }
                  return `${option.city} - ${option.country}, ${option.code}`;
                }}
                style={{ width: 300 }}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Origem" variant="outlined" />
                  );
                }}
              />

              <Autocomplete
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setDestination("");
                  } else {
                    setDestination(newValue.code);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                options={cityCode}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  } else if (option.city === undefined) {
                    return "";
                  }
                  return `${option.city} - ${option.country}, ${option.code}`;
                }}
                style={{ width: 300 }}
                renderInput={(params) => {
                  return (
                    <TextField {...params} label="Destino" variant="outlined" />
                  );
                }}
              />
              <TextField
                id="date"
                label="Data de partida"
                type="date"
                onSelect={(event) => {
                  setSelectedDate(event.target.value);
                }}
                maxDate={() => {}}
                style={{ width: 300 }}
                format="YYYY-MM-DD"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: minDate,
                    max: maxDate,
                  },
                }}
              />
            </div>
            <div className="FormSubmit">
              <Button
                variant="contained"
                color="primary"
                onClick={() => searchTravel()}
              >
                {" "}
                Vai{" "}
              </Button>

              <Collapse in={alert}>
                <Alert severity="warning">Preencha todos os campos</Alert>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
