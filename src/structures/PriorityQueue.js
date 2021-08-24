export default class PQ {
  constructor() {
    this.N = 0;
    this.heap = [];
    this.heap.push(null);
  }

  static less(A, B) {
    return A > B;
  }

  fixUp(k) {
    while (k > 1 && PQ.less(this.heap[Math.floor(k / 2)], this.heap[k])) {
      let t = this.heap[k];
      this.heap[k] = this.heap[Math.floor(k / 2)];
      this.heap[Math.floor(k / 2)] = t;

      k = Math.floor(k / 2);
    }
  }

  fixDown(k, n) {
    let j;

    while (2 * k <= n) {
      j = 2 * k;

      if (j < n && PQ.less(this.heap[j], this.heap[j + 1])) j++;

      if (!PQ.less(this.heap[k], this.heap[j])) break;
      else {
        let t = this.heap[k];
        this.heap[k] = this.heap[j];
        this.heap[j] = t;

        k = j;
      }
    }
  }

  PQempty() {
    return this.N === 0;
  }

  PQinsert(newItem) {
    this.heap[++this.N] = newItem;
    this.fixUp(this.N);
  }

  PQdelMin() {
    let t = this.heap[1];
    this.heap[1] = this.heap[this.N];
    this.heap[this.N] = t;

    this.fixDown(1, --this.N);

    return this.heap[this.N + 1];
  }

  printQueue() {
    for (let i = 1; i <= this.N; i++) {
      console.log(this.heap[i]);
    }
  }
}
