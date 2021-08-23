export default class Node {
  constructor(price, country) {
    this.price = price;
    this.country = country;

    // Neighbors
    this.neighbors = new Map();
    // {id, price}
  }

  getVisit() {
    return this.isVisited;
  }

  visitNode() {
    this.isVisited = true;
  }

  setNeighbors(value) {
    this.neighbors.set(value.OutboundLeg.DestinationId, value.MinPrice);
  }

  getNeighbors() {
    return this.neighbors;
  }
}
