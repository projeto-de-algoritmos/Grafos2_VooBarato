const axios = require("axios");
const RAPIDAPIKEY = "e3d6c10830msh904500a825325adp125f7djsnb806e48b0453";
const RAPIDAPIHOST = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com";

export const getCountries = async (origin, time, destination, graph) => {
  await axios
    .get(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/BR/BYN/pt-BR/${origin}/${destination}/${time}/`,
      {
        headers: {
          useQueryString: true,
          "x-rapidapi-key": RAPIDAPIKEY,
          "x-rapidapi-host": RAPIDAPIHOST,
        },
      }
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      if (response.data.Routes.length !== 0) {
        graph.createNodes(response.data);
      }
    });
};

// export const getLatLong = async () => {
// };
