import Node from "./node";

var visited = new Set();

export default class Graph {
  constructor() {
    this.nodes = new Map();
  }

  createNodes(countries) {
    countries.Quotes.forEach((country, id) => {
      if (this.nodes.get(country.OutboundLeg.OriginId) === undefined) {
        var countryInfo = countries.Places.filter(
          (res) => res.PlaceId === countries.Quotes[id].OutboundLeg.OriginId
        );
        var countryName = countryInfo[0].Name;
        this.nodes.set(country.OutboundLeg.OriginId, new Node(-1, countryName));
      }
      var node = this.nodes.get(country.OutboundLeg.OriginId);
      node.setNeighbors(country);
    });
  }

  async brushDFS(startNode, color) {
    visited.clear();
    if (!this.nodes.get(startNode).getVisit()) {
      this.dfs(startNode, color);
    }
  }

  async dfs(startNode, color) {
    visited.add(startNode);
    await this.holdAlg(80);

    this.nodes.get(startNode).setColor(color);

    for (const bug of this.nodes.get(startNode).getNeighbors()) {
      for (const neighbor of bug) {
        if (!this.nodes.get(neighbor).getVisit() && !visited.has(neighbor)) {
          this.dfs(neighbor, color);
        }
      }
    }
  }
}
