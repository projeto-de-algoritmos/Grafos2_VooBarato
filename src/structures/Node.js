export default class Node {
    constructor(airport) {
        this.airport = airport;
        this.neighbors = new Map(); // mapeia por aeroporto vizinho e voos
        this.isVisited = false;
    }

    addNeighbor(destiny, price) {
        if (this.neighbors.has(destiny)) {
            this.neighbors.get(destiny.airport).push(
                new Edge(this.airport, destiny, price)
            );
        } else {
            this.neighbors.set(destiny, []);
            this.neighbors.get(destiny).push(
                new Edge(this.airport, destiny, price)
            );
        }
    }
}

class Edge {
    constructor(origin, destiny, price) {
        this.origin = origin;
        this.destiny = destiny;
        this.price = price;
    }

    getPrice() {
        return this.price;
    }
}