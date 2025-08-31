/**
 * Dijkstra's algorithm to find the shortest path between two stations
 * @param {Array} stations - List of all stations
 * @param {Array} routes - List of routes between stations with distances
 * @param {string} from - Starting station ID
 * @param {string} to - Destination station ID
 * @returns {Object} - Optimal route with path and total distance
 */
function findOptimalRoute(stations, routes, from, to) {
  // Validate inputs
  if (!stations || !routes || !from || !to) {
    throw new Error('Invalid input parameters');
  }

  // Create a graph representation
  const graph = {};
  
  // Initialize graph with all stations
  stations.forEach(station => {
    graph[station.id] = { distance: Infinity, previous: null, neighbors: {} };
  });

  // Add edges to the graph
  routes.forEach(route => {
    if (graph[route.from] && graph[route.to]) {
      graph[route.from].neighbors[route.to] = route.distance;
      graph[route.to].neighbors[route.from] = route.distance; // For undirected graph
    }
  });

  // Validate if stations exist in the graph
  if (!graph[from] || !graph[to]) {
    return null;
  }

  // Initialize starting point
  graph[from].distance = 0;
  const unvisited = new Set(Object.keys(graph));

  // Main algorithm
  while (unvisited.size > 0) {
    // Find the unvisited node with the smallest distance
    let current = null;
    let minDistance = Infinity;
    
    for (const node of unvisited) {
      if (graph[node].distance < minDistance) {
        minDistance = graph[node].distance;
        current = node;
      }
    }

    // If no path exists to the remaining nodes
    if (current === null || graph[current].distance === Infinity) {
      break;
    }

    // If we've reached the destination
    if (current === to) {
      break;
    }

    // Update distances to neighbors
    for (const neighbor in graph[current].neighbors) {
      if (unvisited.has(neighbor)) {
        const distance = graph[current].distance + graph[current].neighbors[neighbor];
        if (distance < graph[neighbor].distance) {
          graph[neighbor].distance = distance;
          graph[neighbor].previous = current;
        }
      }
    }

    // Mark as visited
    unvisited.delete(current);
  }

  // If no path exists
  if (graph[to].distance === Infinity) {
    return null;
  }

  // Reconstruct the path
  const path = [];
  let current = to;
  while (current !== null) {
    path.unshift(current);
    current = graph[current].previous;
  }

  return {
    path,
    distance: graph[to].distance,
    fromStation: from,
    toStation: to
  };
}

module.exports = {
  findOptimalRoute
};
