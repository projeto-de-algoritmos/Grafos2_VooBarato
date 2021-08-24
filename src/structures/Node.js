export default class Node {
    constructor(airport) {
        this.airport = airport;
        this.neighbors = new Map(); // mapeia por aeroporto vizinho e voos
        this.visited = false;
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

    visitNode() {
        this.visited = true;
    }

    isVisited() {
        return this.visited;
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