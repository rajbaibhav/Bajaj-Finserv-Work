function buildTree(node, adj) {
    let treeObj = {};
    let maxDepth = 0;
    let children = adj.get(node) || [];


    children.sort();

    for (let child of children) {
        let { tree: childTree, depth: childDepth } = buildTree(child, adj);
        treeObj[child] = childTree;
        maxDepth = Math.max(maxDepth, childDepth);
    }
    return { tree: treeObj, depth: maxDepth + 1 };
}

function processGraph(data) {
    let invalid_entries = [];
    let duplicate_edges = [];
    let seenEdges = new Set();
    let childToParent = new Map();
    if (!Array.isArray(data)) {
        return { error: "Invalid input" };
    }

    let valid_edges = [];

    for (let edge of data) {
        let isString = typeof edge === 'string';
        let original = isString ? edge : String(edge);
        let trimmed = isString ? edge.trim() : "";

        if (!isString || !/^[A-Z]->[A-Z]$/.test(trimmed)) {
            invalid_entries.push(original);
            continue;
        }

        let [u, v] = trimmed.split("->");
        if (u === v) {
            invalid_entries.push(original);
            continue;
        }

        if (seenEdges.has(trimmed)) {
            duplicate_edges.push(original);
            continue;
        }
        seenEdges.add(trimmed);

        if (childToParent.has(v)) {
            continue;
        }


        childToParent.set(v, u);
        valid_edges.push({ u, v });
    }


    let nodes = new Set();
    let adj = new Map();

    for (let { u, v } of valid_edges) {
        nodes.add(u);
        nodes.add(v);

        if (!adj.has(u)) {
            adj.set(u, []);
        }
        adj.get(u).push(v);
    }


    let undirected = new Map();
    for (let u of nodes) undirected.set(u, []);
    for (let [v, u] of childToParent.entries()) {
        undirected.get(u).push(v);
        undirected.get(v).push(u);
    }

    let visited = new Set();
    let hierarchies = [];
    let total_trees = 0;
    let total_cycles = 0;
    let max_depth = 0;
    let largest_tree_root = null;

    for (let node of nodes) {
        if (!visited.has(node)) {
            let comp = new Set();
            let q = [node];
            visited.add(node);

            while (q.length > 0) {
                let curr = q.shift();
                comp.add(curr);
                for (let neighbor of undirected.get(curr)) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        q.push(neighbor);
                    }
                }
            }

            let compRoots = [];
            for (let n of comp) {
                if (!childToParent.has(n)) {
                    compRoots.push(n);
                }
            }

            if (compRoots.length === 1) {

                let root = compRoots[0];
                let { tree, depth } = buildTree(root, adj);
                let finalTree = {};
                finalTree[root] = tree;

                hierarchies.push({
                    root: root,
                    tree: finalTree,
                    depth: depth
                });

                total_trees++;
                if (depth > max_depth) {
                    max_depth = depth;
                    largest_tree_root = root;
                } else if (depth === max_depth) {
                    if (largest_tree_root === null || root < largest_tree_root) {
                        largest_tree_root = root;
                    }
                }
            } else if (compRoots.length === 0) {

                let arr = Array.from(comp);
                arr.sort();
                let root = arr[0];

                hierarchies.push({
                    root: root,
                    tree: {},
                    has_cycle: true
                });
                total_cycles++;
            }
        }
    }

    hierarchies.sort((a, b) => a.root.localeCompare(b.root));

    return {
        hierarchies,
        invalid_entries,
        duplicate_edges,
        summary: {
            total_trees,
            total_cycles,
            largest_tree_root
        }
    };
}

module.exports = {
    processGraph
};
