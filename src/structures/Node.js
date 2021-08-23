export default class Node {
    constructor(airport) {
        this.airport = airport;
        this.neighbors = new Map(); // mapeia por aeroporto vizinho e voos
    }

    addNeighbor(destiny, price, time) {
        if (this.neighbors.has(destiny)) {
            this.neighbors.get(destiny.airport).push(
                new Edge(this.airport, destiny, price, time)
            );
        } else {
            this.neighbors.set(destiny, []);
            this.neighbors.get(destiny).push(
                new Edge(this.airport, destiny, price, time)
            );
        }
    }
}

class Edge {
    constructor(origin, destiny, price, time) {
        this.origin = origin;
        this.destiny = destiny;
        this.price = price;
        this.time = time;
    }

    getPrice() {
        return this.price;
    }
}