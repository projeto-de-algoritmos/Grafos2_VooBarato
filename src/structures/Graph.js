import Node from "./Node";
import PQ from "./PriorityQueue";

export default class Graph {
  constructor() {
    this.nodes = new Map();
  }

  createNodes(flightMap) {
    flightMap.Quotes.forEach((flight, idx) => {
      var price = flight.MinPrice;
      var originInfo = flightMap.Places.filter(
        (res) => res.PlaceId === flightMap.Quotes[idx].OutboundLeg.OriginId
      );
      var destinyInfo = flightMap.Places.filter(
        (res) => res.PlaceId === flightMap.Quotes[idx].OutboundLeg.DestinationId
      );

      var originAirport = originInfo[0].IataCode;
      var destinyAirport = destinyInfo[0].IataCode;

      if (!this.nodes.has(originAirport))
        this.nodes.set(originAirport, new Node(originAirport));
      if (this.nodes.has(destinyAirport))
        this.nodes.set(destinyAirport, new Node(destinyAirport));

            this.nodes.get(originAirport).addNeighbor(destinyAirport, price);
        })
    }

    // dijkstra(origin, destiny) {
    //     const pq = new PQ();
    //     const paths = new Map();

    //     paths.set(origin.airport, [0, origin.airport])
    //     origin.visitNode();

    //     const current = origin;

    //     while (!destiny.isVisited()) {
    //         for (let [k, v] of current.neighbors) {

    //         }
    //     }

    // }
}

