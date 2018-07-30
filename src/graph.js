class Stack {
    constructor() {
        this.array = [];
    }

    push(el) {
        return this.array.push(el);
    }

    pop() {
        return this.array.pop();
    }

    isEmpty() {
        return this.array.length === 0;
    }
}

class Queue {
    constructor() {
        this.array = [];
    }

    enqueue(el) {
        return this.array.push(el);
    }

    dequeue() {
        return this.array.shift();
    }

    isEmpty() {
        return this.array.length === 0;
    }
}

export class AdjacencyMatrixDirectedGraph {
    constructor(verticesCount) {
        this.matrix = [];

        for (let i = 0; i < verticesCount; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < verticesCount; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    addEdge(vertex1, vertex2) {
        this.matrix[vertex1][vertex2] = 1;
    }

    removeEdge(vertex1, vertex2) {
        this.matrix[vertex1][vertex2] = 0;
    }

    hasEdge(vertex1, vertex2) {
        return this.matrix[vertex1][vertex2] === 1;
    }

    traverseBreadthFirst(start) {
        const visitedVertex = this.matrix.map(() => false); // array of length N
        const q = new Queue();
        q.enqueue(start);
        while (!q.isEmpty()) {
            const el = q.dequeue();
            visitedVertex[el] = true;
            this.matrix[el].forEach((x, index) => {
                if (x === 1 && visitedVertex[index] !== true) {
                    q.enqueue(index)
                }
            });

            const allVerticesVisited = !visitedVertex.includes(false);
            if (q.isEmpty() && !allVerticesVisited) {
                q.enqueue(visitedVertex.indexOf(false));
            }
        }

        return visitedVertex;
    }

    traverseDepthFirst(start) {
        const visitedVertex = this.matrix.map(() => false); // array of length N
        const s = new Stack();
        s.push(start);
        while (!s.isEmpty()) {
            const el = s.pop();
            visitedVertex[el] = true;
            this.matrix[el].forEach((x, index) => {
                if (x === 1 && visitedVertex[index] !== true) {
                    s.push(index)
                }
            });

            const allVerticesVisited = !visitedVertex.includes(false);
            if (s.isEmpty() && !allVerticesVisited) {
                s.push(visitedVertex.indexOf(false));
            }
        }

        return visitedVertex;
    }
}
