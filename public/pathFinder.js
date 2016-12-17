function paths({ graph = [], from, to }, path = []) {
    const linkedNodes = memoize(nodes.bind(null, graph));
    return explore(from, to);

    function explore(currNode, to, paths = []) {
        path.push(currNode);
        for (let linkedNode of linkedNodes(currNode)) {
            if (linkedNode === to) {
                let result = path.slice(); // copy values
                result.push(to);
                paths.push(result);
                continue;
            }
            // do not re-explore edges
            if (!hasEdgeBeenFollowedInPath({
                    edge: {
                        from: currNode,
                        to: linkedNode
                    },
                    path
                })) {
                explore(linkedNode, to, paths);
            }
        }
        path.pop(); // sub-graph fully explored
        return paths;
    }
}

/**
 * Get all nodes linked
 * to from `node`.
 */
function nodes(graph, node) {
    return graph.reduce((p, c) => {
        (c[0] === node) && p.push(c[1]);
        return p;
    }, []);
}

/**
 * Has an edge been followed
 * in the given path?
 */
function hasEdgeBeenFollowedInPath({ edge, path }) {
    var indices = allIndices(path, edge.from);
    return indices.some(i => path[i + 1] === edge.to);
}

/**
 * Utility to get all indices of
 * values matching `val` in `arr`.
 */
function allIndices(arr, val) {
    var indices = [],
        i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            indices.push(i);
        }
    }
    return indices;
}

/**
 * Avoids recalculating linked
 * nodes.
 */
function memoize(fn) {
    const cache = new Map();
    return function() {
        var key = JSON.stringify(arguments);
        var cached = cache.get(key);
        if (cached) {
            return cached;
        }
        cached = fn.apply(this, arguments)
        cache.set(key, cached);
        return cached;;
    };
}
const SPEED = 0;
const DISTANCE = 1;
var optimizeBy = SPEED;
const graph = [
    ["S", "T"],
    ["S", "X"],
    ["T", "X"],
    ["T", "V"],
    ["U", "S"],
    ["U", "T"],
    ["V", "U"],
    ["X", "V"],
    ["X", "W"],
    ["W", "V"],
    ["W", "S"]
];

const graphObj = {
  "S": {
    "T": [
      5,
      7
    ],
    "X": [
      4,
      4
    ]
  },
  "T": {
    "X": [
      3,
      1
    ],
    "V": [
      5,
      2
    ]
  },
  "U": {
    "S": [
      7,
      2
    ],
    "T": [
      4,
      6
    ]
  },
  "V": {
    "U": [
      4,
      5
    ]
  },
  "X": {
    "V": [
      2,
      1
    ],
    "W": [
      5,
      3
    ]
  },
  "W": {
    "U": [
      7,
      5
    ],
    "S": [
      8,
      3
    ]
  }
};

function callPaths(){
  document.getElementById("allPathList").innerHTML = "";
  var allpaths = paths({
    graph,
    from:document.getElementById('sel1').value,
    to:document.getElementById('sel2').value
  });
  var allPathList = document.getElementById("allPathList");
  for(var i=0; i<allpaths.length; i++){
    var item = allpaths[i];
    var elem = document.createElement("li");
    elem.setAttribute("class","list-group-item");
    elem.innerHTML = graphJoin(item);
    allPathList.appendChild(elem);
  }
  console.log(allpaths);
}

function graphJoin(itemArr){
  var str = "";
  for(var i=0; i<itemArr.length; i++){

    str += itemArr[i];
    if(i == (itemArr.length-1))
      return str;
    //debugger;
    if(itemArr[i+1] && graphObj[itemArr[i]][itemArr[i+1]] )
      var param = graphObj[itemArr[i]][itemArr[i+1]][optimizeBy];
      if(param)
        str += "-- ("+param +") -->";
  }
  return str;
}
