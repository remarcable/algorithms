import { AdjacencyMatrixDirectedGraph } from './graph';

describe('AdjacencyMatrixDirectedGraph(verticesCount)', () => {
    describe('constructor(verticesCount)', () => {
        it('initializes an N * N matrix with 0', () => {
            const { matrix } = new AdjacencyMatrixDirectedGraph(10);
            matrix.forEach((row) => {
                expect(row.filter(entry => entry === 0).length).toBe(10);
                row.forEach((entry) => {
                    expect(entry).toBe(0);
                })
            });
        });
    });

    traverseGraphTest('traverseBreadthFirst');
    traverseGraphTest('traverseDepthFirst');
    function traverseGraphTest(traverseFunctionName) {
        describe(`${traverseFunctionName}(start)`, () => {
            it('returns an array with all elements being true', () => {
                const graph = new AdjacencyMatrixDirectedGraph(10);
                graph.addEdge(0, 1);
                graph.addEdge(1, 2);
                graph.addEdge(2, 3);
                graph.addEdge(3, 4);
                graph.addEdge(4, 5);
                graph.addEdge(5, 6);
                graph.addEdge(6, 7);
                graph.addEdge(7, 8);
                graph.addEdge(8, 9);

                const result = graph[traverseFunctionName](0);
                expect(result).toHaveLength(10);
                expect(result.filter(x => x === true)).toHaveLength(10); // all values are expected to be true
            });

            it('can cope with cycles', () => {
                const graph = new AdjacencyMatrixDirectedGraph(3);
                graph.addEdge(0, 1);
                graph.addEdge(1, 2);
                graph.addEdge(2, 0);

                const result = graph[traverseFunctionName](0);
                expect(result).toHaveLength(3);
                expect(result.filter(x => x === true)).toHaveLength(3);
            });

            it('travseres all vertices in not connected', () => {
                const graph = new AdjacencyMatrixDirectedGraph(5);
                graph.addEdge(0, 1);
                graph.addEdge(1, 2);
                graph.addEdge(3, 0);
                graph.addEdge(4, 3);

                const result = graph[traverseFunctionName](0); // 4 => 3 => 0 => 1 => 2
                expect(result).toHaveLength(5);
                expect(result.filter(x => x === true)).toHaveLength(5);
            });

            it('traverses a graph without edges', () => {
              const graph = new AdjacencyMatrixDirectedGraph(20);
              const result = graph[traverseFunctionName](0);
              expect(result).toHaveLength(20);
              expect(result.filter(x => x === true)).toHaveLength(20);
            });
        });
    }
});
