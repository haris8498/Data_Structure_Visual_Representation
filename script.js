// ===== AUTHENTICATION CHECK =====
function checkAuthentication() {
    const session = localStorage.getItem('algomaster_session');
    if (!session && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return false;
    }
    
    if (session) {
        const user = JSON.parse(session);
        const welcomeEl = document.getElementById('welcome-user');
        if (welcomeEl) {
            welcomeEl.textContent = `Welcome, ${user.username}!`;
        }
    }
    return true;
}

function handleLogout() {
    localStorage.removeItem('algomaster_session');
    window.location.href = 'login.html';
}

// Check authentication on page load
if (document.getElementById('welcome-user')) {
    checkAuthentication();
}

// ===== SEARCH BAR FUNCTIONALITY =====
function filterTopics() {
    const searchInput = document.getElementById('searchBar');
    if (!searchInput) return;
    
    const filter = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(filter) || description.includes(filter)) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.5s';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== BUBBLE SORT VISUALIZATION =====
let array = [];
let isSorting = false;

// Generate random array
function generateArray() {
    if (isSorting) return;
    const container = document.getElementById('sort-visualizer');
    if (!container) return;
    
    array = [];
    container.innerHTML = '';
    isSorting = false;
    
    // Generate 10 random values between 10 and 99
    for (let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 90) + 10);
    }
    
    // Create bubbles with values
    array.forEach((value, idx) => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = value;
        bubble.id = `bubble-${idx}`;
        bubble.style.background = '#ffd700';
        bubble.style.transform = 'scale(1)';
        container.appendChild(bubble);
    });
}

// Sleep function for animation delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Algorithm with visualization
async function runBubbleSort() {
    if (isSorting) return;
    isSorting = true;
    
    const n = array.length;
    const container = document.getElementById('sort-visualizer');
    if (!container) return;
    
    // Bubble sort algorithm
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight bubbles being compared
            const bubble1 = document.getElementById(`bubble-${j}`);
            const bubble2 = document.getElementById(`bubble-${j + 1}`);
            
            bubble1.style.background = '#ff4444';
            bubble2.style.background = '#ff4444';
            bubble1.style.transform = 'scale(1.2)';
            bubble2.style.transform = 'scale(1.2)';
            
            await sleep(300);
            
            // Compare and swap if needed
            if (array[j] > array[j + 1]) {
                // Swap in array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                
                // Swap text content
                bubble1.textContent = array[j];
                bubble2.textContent = array[j + 1];
                
                // Add swap animation
                bubble1.style.transform = 'scale(1.2) translateY(-10px)';
                bubble2.style.transform = 'scale(1.2) translateY(-10px)';
                
                await sleep(300);
            }
            
            // Reset colors and scale
            bubble1.style.background = '#ffd700';
            bubble2.style.background = '#ffd700';
            bubble1.style.transform = 'scale(1)';
            bubble2.style.transform = 'scale(1)';
        }
        
        // Mark the last element as sorted (green)
        const sortedBubble = document.getElementById(`bubble-${n - i - 1}`);
        sortedBubble.style.background = '#00ff00';
    }
    
    // Mark first element as sorted
    const firstBubble = document.getElementById('bubble-0');
    if (firstBubble) firstBubble.style.background = '#00ff00';
    
    isSorting = false;
}

// ===== SELECTION SORT VISUALIZATION =====
let selectionArray = [];
let isSelectionSorting = false;

// Generate random array for selection sort
function generateSelectionArray() {
    if (isSelectionSorting) return;
    const container = document.getElementById('selection-visualizer');
    if (!container) return;
    
    selectionArray = [];
    container.innerHTML = '';
    isSelectionSorting = false;
    
    // Generate 10 random values between 10 and 99
    for (let i = 0; i < 10; i++) {
        selectionArray.push(Math.floor(Math.random() * 90) + 10);
    }
    
    // Create bubbles with values
    selectionArray.forEach((value, idx) => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = value;
        bubble.id = `selection-bubble-${idx}`;
        bubble.style.background = '#ffd700';
        bubble.style.transform = 'scale(1)';
        container.appendChild(bubble);
    });
}

// Selection Sort Algorithm with visualization
async function runSelectionSort() {
    if (isSelectionSorting) return;
    isSelectionSorting = true;
    
    const n = selectionArray.length;
    
    // Selection sort algorithm
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        // Highlight current position (being filled)
        const currentBubble = document.getElementById(`selection-bubble-${i}`);
        currentBubble.style.background = '#00bfff';
        currentBubble.style.transform = 'scale(1.1)';
        
        await sleep(400);
        
        // Find minimum in unsorted portion
        for (let j = i + 1; j < n; j++) {
            const compareBubble = document.getElementById(`selection-bubble-${j}`);
            compareBubble.style.background = '#ff4444';
            compareBubble.style.transform = 'scale(1.1)';
            
            await sleep(200);
            
            if (selectionArray[j] < selectionArray[minIdx]) {
                // Reset previous minimum
                if (minIdx !== i) {
                    const prevMinBubble = document.getElementById(`selection-bubble-${minIdx}`);
                    prevMinBubble.style.background = '#ffd700';
                    prevMinBubble.style.transform = 'scale(1)';
                }
                
                // Set new minimum
                minIdx = j;
                compareBubble.style.background = '#ff00ff';
                compareBubble.style.transform = 'scale(1.15)';
            } else {
                compareBubble.style.background = '#ffd700';
                compareBubble.style.transform = 'scale(1)';
            }
            
            await sleep(200);
        }
        
        // Swap if minimum is not at current position
        if (minIdx !== i) {
            const minBubble = document.getElementById(`selection-bubble-${minIdx}`);
            
            // Highlight swap
            currentBubble.style.transform = 'scale(1.2) translateY(-15px)';
            minBubble.style.transform = 'scale(1.2) translateY(-15px)';
            
            await sleep(400);
            
            // Swap in array
            let temp = selectionArray[i];
            selectionArray[i] = selectionArray[minIdx];
            selectionArray[minIdx] = temp;
            
            // Swap text content
            currentBubble.textContent = selectionArray[i];
            minBubble.textContent = selectionArray[minIdx];
            
            await sleep(300);
            
            // Reset minimum bubble
            minBubble.style.background = '#ffd700';
            minBubble.style.transform = 'scale(1)';
        }
        
        // Mark current position as sorted (green)
        currentBubble.style.background = '#00ff00';
        currentBubble.style.transform = 'scale(1)';
        
        await sleep(200);
    }
    
    // Mark last element as sorted
    const lastBubble = document.getElementById(`selection-bubble-${n - 1}`);
    if (lastBubble) lastBubble.style.background = '#00ff00';
    
    isSelectionSorting = false;
}

// ===== INSERTION SORT VISUALIZATION =====
let insertionArray = [];
let isInsertionSorting = false;

// Generate random array for insertion sort
function generateInsertionArray() {
    if (isInsertionSorting) return;
    const container = document.getElementById('insertion-visualizer');
    if (!container) return;
    
    insertionArray = [];
    container.innerHTML = '';
    isInsertionSorting = false;
    
    // Generate 10 random values between 10 and 99
    for (let i = 0; i < 10; i++) {
        insertionArray.push(Math.floor(Math.random() * 90) + 10);
    }
    
    // Create bubbles with values
    insertionArray.forEach((value, idx) => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = value;
        bubble.id = `insertion-bubble-${idx}`;
        bubble.style.background = '#ffd700';
        bubble.style.transform = 'scale(1)';
        container.appendChild(bubble);
    });
}

// Insertion Sort Algorithm with visualization
async function runInsertionSort() {
    if (isInsertionSorting) return;
    isInsertionSorting = true;
    
    const n = insertionArray.length;
    
    // Mark first element as sorted (green)
    const firstBubble = document.getElementById('insertion-bubble-0');
    if (firstBubble) firstBubble.style.background = '#00ff00';
    
    // Insertion sort algorithm
    for (let i = 1; i < n; i++) {
        let key = insertionArray[i];
        let j = i - 1;
        
        // Highlight the key element being inserted
        const keyBubble = document.getElementById(`insertion-bubble-${i}`);
        keyBubble.style.background = '#ff4444';
        keyBubble.style.transform = 'scale(1.2) translateY(-20px)';
        
        await sleep(500);
        
        // Shift elements greater than key to the right
        while (j >= 0 && insertionArray[j] > key) {
            const compareBubble = document.getElementById(`insertion-bubble-${j}`);
            compareBubble.style.background = '#ff00ff';
            compareBubble.style.transform = 'scale(1.1)';
            
            await sleep(300);
            
            // Shift element to the right
            insertionArray[j + 1] = insertionArray[j];
            
            const nextBubble = document.getElementById(`insertion-bubble-${j + 1}`);
            nextBubble.textContent = insertionArray[j + 1];
            nextBubble.style.background = '#ffd700';
            
            await sleep(300);
            
            compareBubble.style.transform = 'scale(1)';
            j--;
        }
        
        // Insert the key at correct position
        insertionArray[j + 1] = key;
        const insertBubble = document.getElementById(`insertion-bubble-${j + 1}`);
        insertBubble.textContent = key;
        insertBubble.style.background = '#00ff00';
        insertBubble.style.transform = 'scale(1)';
        
        await sleep(400);
        
        // Mark all elements from 0 to i as sorted (green)
        for (let k = 0; k <= i; k++) {
            const sortedBubble = document.getElementById(`insertion-bubble-${k}`);
            if (sortedBubble) {
                sortedBubble.style.background = '#00ff00';
                sortedBubble.style.transform = 'scale(1)';
            }
        }
        
        await sleep(200);
    }
    
    isInsertionSorting = false;
}

// ===== LINEAR SEARCH VISUALIZATION =====
let linearArray = [];
let isLinearSearching = false;

function generateLinearArray() {
    if (isLinearSearching) return;
    const container = document.getElementById('linear-visualizer');
    if (!container) return;
    
    container.innerHTML = '';
    linearArray = [23, 45, 12, 67, 89, 34, 75, 56, 91, 28];
    isLinearSearching = false;
    
    linearArray.forEach((value, idx) => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = value;
        bubble.id = `linear-bubble-${idx}`;
        bubble.style.background = '#ffd700';
        bubble.style.transform = 'scale(1)';
        bubble.style.opacity = '1';
        container.appendChild(bubble);
    });
    
    const resultEl = document.getElementById('linear-result');
    if (resultEl) resultEl.textContent = 'Click "Start Search" to find number 75';
}

async function runLinearSearch() {
    if (isLinearSearching) return;
    isLinearSearching = true;
    
    const target = 75;
    const resultEl = document.getElementById('linear-result');
    if (resultEl) resultEl.textContent = `Searching for ${target}...`;
    
    let found = false;
    
    // Linear search - check each element one by one
    for (let i = 0; i < linearArray.length; i++) {
        const bubble = document.getElementById(`linear-bubble-${i}`);
        
        // Highlight current element being checked
        if (bubble) {
            bubble.style.background = '#ff4444';
            bubble.style.transform = 'scale(1.3)';
        }
        
        await sleep(600);
        
        // Check if this is the target
        if (linearArray[i] === target) {
            if (bubble) {
                bubble.style.background = '#00ff00';
                bubble.style.transform = 'scale(1.4)';
            }
            if (resultEl) resultEl.textContent = `✓ Found ${target} at index ${i}!`;
            found = true;
            break;
        } else {
            // Not the target, mark as checked
            if (bubble) {
                bubble.style.background = '#666';
                bubble.style.transform = 'scale(0.9)';
                bubble.style.opacity = '0.5';
            }
        }
        
        await sleep(300);
    }
    
    if (!found && resultEl) {
        resultEl.textContent = `✗ ${target} not found in array`;
    }
    
    isLinearSearching = false;
}

// ===== LINKED LIST VISUALIZATION =====
let linkedList = [];

function resetList() {
    linkedList = [10, 20, 30];
    renderLinkedList();
}

function addNode() {
    const newValue = Math.floor(Math.random() * 90) + 10;
    linkedList.push(newValue);
    renderLinkedList();
    const resultEl = document.getElementById('list-result');
    if (resultEl) resultEl.textContent = `Added node with value ${newValue}`;
}

function removeNode() {
    if (linkedList.length === 0) {
        const resultEl = document.getElementById('list-result');
        if (resultEl) resultEl.textContent = 'List is empty!';
        return;
    }
    const removed = linkedList.pop();
    renderLinkedList();
    const resultEl = document.getElementById('list-result');
    if (resultEl) resultEl.textContent = `Removed node with value ${removed}`;
}

function renderLinkedList() {
    const container = document.getElementById('list-visualizer');
    if (!container) return;
    
    container.innerHTML = '';
    
    linkedList.forEach((value, idx) => {
        // Create node
        const node = document.createElement('div');
        node.className = 'll-node';
        node.innerHTML = `<div class="ll-data">${value}</div><div class="ll-pointer">→</div>`;
        container.appendChild(node);
        
        // Add arrow between nodes (except after last node)
        if (idx < linkedList.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'll-arrow';
            arrow.textContent = '→';
            container.appendChild(arrow);
        }
    });
    
    // Add NULL at the end
    const nullNode = document.createElement('div');
    nullNode.className = 'll-null';
    nullNode.textContent = 'NULL';
    container.appendChild(nullNode);
}

// ===== CIRCULAR LINKED LIST VISUALIZATION =====
let circularList = [];

function resetCircularList() {
    circularList = [10, 20, 30];
    renderCircularList();
}

function addCircularNode() {
    const newValue = Math.floor(Math.random() * 90) + 10;
    circularList.push(newValue);
    renderCircularList();
    const resultEl = document.getElementById('circular-result');
    if (resultEl) resultEl.textContent = `Added node with value ${newValue}`;
}

function removeCircularNode() {
    if (circularList.length === 0) {
        const resultEl = document.getElementById('circular-result');
        if (resultEl) resultEl.textContent = 'List is empty!';
        return;
    }
    const removed = circularList.pop();
    renderCircularList();
    const resultEl = document.getElementById('circular-result');
    if (resultEl) resultEl.textContent = `Removed node with value ${removed}`;
}

function renderCircularList() {
    const container = document.getElementById('circular-visualizer');
    if (!container) return;
    
    container.innerHTML = '';
    
    circularList.forEach((value, idx) => {
        // Create node
        const node = document.createElement('div');
        node.className = 'll-node';
        node.innerHTML = `<div class="ll-data">${value}</div><div class="ll-pointer">→</div>`;
        container.appendChild(node);
        
        // Add arrow between nodes
        if (idx < circularList.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'll-arrow';
            arrow.textContent = '→';
            container.appendChild(arrow);
        }
    });
    
    // Add circular arrow back to first
    if (circularList.length > 0) {
        const circularArrow = document.createElement('div');
        circularArrow.className = 'll-circular-arrow';
        circularArrow.textContent = '↺ HEAD';
        container.appendChild(circularArrow);
    }
}

// ===== DOUBLY LINKED LIST VISUALIZATION =====
let doublyList = [];

function resetDoublyList() {
    doublyList = [10, 20, 30];
    renderDoublyList();
}

function addDoublyNode() {
    const newValue = Math.floor(Math.random() * 90) + 10;
    doublyList.push(newValue);
    renderDoublyList();
    const resultEl = document.getElementById('doubly-result');
    if (resultEl) resultEl.textContent = `Added node with value ${newValue}`;
}

function removeDoublyNode() {
    if (doublyList.length === 0) {
        const resultEl = document.getElementById('doubly-result');
        if (resultEl) resultEl.textContent = 'List is empty!';
        return;
    }
    const removed = doublyList.pop();
    renderDoublyList();
    const resultEl = document.getElementById('doubly-result');
    if (resultEl) resultEl.textContent = `Removed node with value ${removed}`;
}

function renderDoublyList() {
    const container = document.getElementById('doubly-visualizer');
    if (!container) return;
    
    container.innerHTML = '';
    
    doublyList.forEach((value, idx) => {
        // Create node
        const node = document.createElement('div');
        node.className = 'll-node dll-node';
        node.innerHTML = `<div class="ll-pointer">←</div><div class="ll-data">${value}</div><div class="ll-pointer">→</div>`;
        container.appendChild(node);
        
        // Add bi-directional arrows between nodes
        if (idx < doublyList.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'll-bidirectional';
            arrow.innerHTML = '⇄';
            container.appendChild(arrow);
        }
    });
    
    // Add NULL markers
    const nullStart = document.createElement('div');
    nullStart.className = 'll-null';
    nullStart.textContent = 'NULL';
    container.insertBefore(nullStart, container.firstChild);
    
    const nullEnd = document.createElement('div');
    nullEnd.className = 'll-null';
    nullEnd.textContent = 'NULL';
    container.appendChild(nullEnd);
}

// ===== QUEUE VISUALIZATION =====
let queue = [];

function resetQueue() {
    queue = [10, 20, 30];
    renderQueue();
}

function enqueue() {
    if (queue.length >= 8) {
        const resultEl = document.getElementById('queue-result');
        if (resultEl) resultEl.textContent = 'Queue is full!';
        return;
    }
    const newValue = Math.floor(Math.random() * 90) + 10;
    queue.push(newValue);
    renderQueue();
    const resultEl = document.getElementById('queue-result');
    if (resultEl) resultEl.textContent = `Enqueued ${newValue} at rear`;
}

function dequeue() {
    if (queue.length === 0) {
        const resultEl = document.getElementById('queue-result');
        if (resultEl) resultEl.textContent = 'Queue is empty!';
        return;
    }
    const removed = queue.shift();
    renderQueue();
    const resultEl = document.getElementById('queue-result');
    if (resultEl) resultEl.textContent = `Dequeued ${removed} from front`;
}

function renderQueue() {
    const container = document.getElementById('queue-visualizer');
    if (!container) return;
    
    container.innerHTML = '';
    
    queue.forEach((value, idx) => {
        const box = document.createElement('div');
        box.className = 'queue-box';
        box.textContent = value;
        if (idx === 0) box.classList.add('queue-front');
        if (idx === queue.length - 1) box.classList.add('queue-rear');
        container.appendChild(box);
    });
}

// ===== BINARY TREE VISUALIZATION =====
let treeData = {
    value: 50,
    left: { value: 30, left: { value: 20 }, right: { value: 40 } },
    right: { value: 70, left: { value: 60 }, right: { value: 80 } }
};
let traversalResult = [];

function resetTree() {
    treeData = {
        value: 50,
        left: { value: 30, left: { value: 20 }, right: { value: 40 } },
        right: { value: 70, left: { value: 60 }, right: { value: 80 } }
    };
    traversalResult = [];
    renderTree();
    const resultEl = document.getElementById('tree-result');
    if (resultEl) resultEl.textContent = 'Binary Tree Structure';
}

async function inorderTraverse() {
    traversalResult = [];
    await inorderTraversal(treeData);
    const resultEl = document.getElementById('tree-result');
    if (resultEl) resultEl.textContent = `Inorder Traversal (L→Root→R): ${traversalResult.join(' → ')}`;
}

async function preorderTraverse() {
    traversalResult = [];
    await preorderTraversal(treeData);
    const resultEl = document.getElementById('tree-result');
    if (resultEl) resultEl.textContent = `Preorder Traversal (Root→L→R): ${traversalResult.join(' → ')}`;
}

async function postorderTraverse() {
    traversalResult = [];
    await postorderTraversal(treeData);
    const resultEl = document.getElementById('tree-result');
    if (resultEl) resultEl.textContent = `Postorder Traversal (L→R→Root): ${traversalResult.join(' → ')}`;
}

async function inorderTraversal(node) {
    if (!node) return;
    
    if (node.left) await inorderTraversal(node.left);
    
    // Highlight current node
    const nodeEl = document.querySelector(`[data-value="${node.value}"]`);
    if (nodeEl) {
        nodeEl.style.background = '#00ff00';
        nodeEl.style.transform = 'scale(1.3)';
    }
    traversalResult.push(node.value);
    await sleep(800);
    if (nodeEl) {
        nodeEl.style.background = 'rgba(255, 215, 0, 0.3)';
        nodeEl.style.transform = 'scale(1)';
    }
    
    if (node.right) await inorderTraversal(node.right);
}

async function preorderTraversal(node) {
    if (!node) return;
    
    // Highlight current node (Root first)
    const nodeEl = document.querySelector(`[data-value="${node.value}"]`);
    if (nodeEl) {
        nodeEl.style.background = '#ff4444';
        nodeEl.style.transform = 'scale(1.3)';
    }
    traversalResult.push(node.value);
    await sleep(800);
    if (nodeEl) {
        nodeEl.style.background = 'rgba(255, 215, 0, 0.3)';
        nodeEl.style.transform = 'scale(1)';
    }
    
    if (node.left) await preorderTraversal(node.left);
    if (node.right) await preorderTraversal(node.right);
}

async function postorderTraversal(node) {
    if (!node) return;
    
    if (node.left) await postorderTraversal(node.left);
    if (node.right) await postorderTraversal(node.right);
    
    // Highlight current node (Root last)
    const nodeEl = document.querySelector(`[data-value="${node.value}"]`);
    if (nodeEl) {
        nodeEl.style.background = '#00bfff';
        nodeEl.style.transform = 'scale(1.3)';
    }
    traversalResult.push(node.value);
    await sleep(800);
    if (nodeEl) {
        nodeEl.style.background = 'rgba(255, 215, 0, 0.3)';
        nodeEl.style.transform = 'scale(1)';
    }
}

function renderTree() {
    const container = document.getElementById('tree-visualizer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create tree structure
    const treeHTML = `
        <div class="tree-level">
            <div class="tree-node" data-value="50">${treeData.value}</div>
        </div>
        <div class="tree-connections">
            <svg width="100%" height="60">
                <line x1="50%" y1="0" x2="25%" y2="60" stroke="#00ff00" stroke-width="2"/>
                <line x1="50%" y1="0" x2="75%" y2="60" stroke="#00ff00" stroke-width="2"/>
            </svg>
        </div>
        <div class="tree-level">
            <div class="tree-node" data-value="30">${treeData.left.value}</div>
            <div class="tree-node" data-value="70">${treeData.right.value}</div>
        </div>
        <div class="tree-connections">
            <svg width="100%" height="60">
                <line x1="25%" y1="0" x2="15%" y2="60" stroke="#00ff00" stroke-width="2"/>
                <line x1="25%" y1="0" x2="35%" y2="60" stroke="#00ff00" stroke-width="2"/>
                <line x1="75%" y1="0" x2="65%" y2="60" stroke="#00ff00" stroke-width="2"/>
                <line x1="75%" y1="0" x2="85%" y2="60" stroke="#00ff00" stroke-width="2"/>
            </svg>
        </div>
        <div class="tree-level">
            <div class="tree-node" data-value="20">${treeData.left.left.value}</div>
            <div class="tree-node" data-value="40">${treeData.left.right.value}</div>
            <div class="tree-node" data-value="60">${treeData.right.left.value}</div>
            <div class="tree-node" data-value="80">${treeData.right.right.value}</div>
        </div>
    `;
    
    container.innerHTML = treeHTML;
}

// ===== GRAPH VISUALIZATION =====
let graphNodes = [
    { id: 'A', x: 50, y: 50 },
    { id: 'B', x: 150, y: 50 },
    { id: 'C', x: 250, y: 50 },
    { id: 'D', x: 50, y: 150 },
    { id: 'E', x: 150, y: 150 },
    { id: 'F', x: 250, y: 150 }
];

let graphEdges = [
    ['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'],
    ['C', 'F'], ['D', 'E'], ['E', 'F']
];

function resetGraph() {
    renderGraph();
    const resultEl = document.getElementById('graph-result');
    if (resultEl) resultEl.textContent = 'Undirected Graph - Nodes connected by edges';
}

async function highlightPath() {
    const resultEl = document.getElementById('graph-result');
    if (resultEl) resultEl.textContent = 'Highlighting path: A → B → E → F';
    
    const path = ['A', 'B', 'E', 'F'];
    
    for (let i = 0; i < path.length; i++) {
        const node = document.querySelector(`[data-node="${path[i]}"]`);
        if (node) {
            node.style.background = '#00ff00';
            node.style.transform = 'scale(1.3)';
        }
        
        if (i < path.length - 1) {
            // Highlight edge
            const edge = document.querySelector(`[data-edge="${path[i]}-${path[i+1]}"], [data-edge="${path[i+1]}-${path[i]}"]`);
            if (edge) edge.setAttribute('stroke', '#00ff00');
        }
        
        await sleep(800);
    }
}

function renderGraph() {
    const container = document.getElementById('graph-visualizer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create SVG for edges
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.top = '0';
    svg.style.left = '0';
    
    // Draw edges
    graphEdges.forEach(([from, to]) => {
        const fromNode = graphNodes.find(n => n.id === from);
        const toNode = graphNodes.find(n => n.id === to);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x + 30);
        line.setAttribute('y1', fromNode.y + 30);
        line.setAttribute('x2', toNode.x + 30);
        line.setAttribute('y2', toNode.y + 30);
        line.setAttribute('stroke', '#ffd700');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('data-edge', `${from}-${to}`);
        svg.appendChild(line);
    });
    
    container.appendChild(svg);
    
    // Draw nodes
    graphNodes.forEach(node => {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'graph-node';
        nodeEl.textContent = node.id;
        nodeEl.setAttribute('data-node', node.id);
        nodeEl.style.left = node.x + 'px';
        nodeEl.style.top = node.y + 'px';
        container.appendChild(nodeEl);
    });
}

// Initialize array on page load for bubble sort
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sort-visualizer')) {
        generateArray();
    }
    if (document.getElementById('selection-visualizer')) {
        generateSelectionArray();
    }
    if (document.getElementById('insertion-visualizer')) {
        generateInsertionArray();
    }
    if (document.getElementById('search-visualizer')) {
        generateSearchArray();
    }
    if (document.getElementById('linear-visualizer')) {
        generateLinearArray();
    }
    if (document.getElementById('list-visualizer')) {
        resetList();
    }
    if (document.getElementById('circular-visualizer')) {
        resetCircularList();
    }
    if (document.getElementById('doubly-visualizer')) {
        resetDoublyList();
    }
    if (document.getElementById('queue-visualizer')) {
        resetQueue();
    }
    if (document.getElementById('tree-visualizer')) {
        resetTree();
    }
    if (document.getElementById('graph-visualizer')) {
        resetGraph();
    }
});

// ===== BINARY SEARCH VISUALIZATION =====
let searchArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let isSearching = false;

function generateSearchArray() {
    if (isSearching) return;
    const container = document.getElementById('search-visualizer');
    if (!container) return;
    
    container.innerHTML = '';
    searchArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    isSearching = false;
    
    searchArray.forEach((value, idx) => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = value;
        bubble.id = `search-bubble-${idx}`;
        bubble.style.background = '#ffd700';
        bubble.style.transform = 'scale(1)';
        bubble.style.opacity = '1';
        container.appendChild(bubble);
    });
    
    const resultEl = document.getElementById('search-result');
    if (resultEl) resultEl.textContent = 'Click "Start Search" to find number 60';
}

async function runBinarySearch() {
    if (isSearching) return;
    isSearching = true;
    
    const target = 60;
    const resultEl = document.getElementById('search-result');
    if (resultEl) resultEl.textContent = `Searching for ${target}...`;
    
    let left = 0;
    let right = searchArray.length - 1;
    let found = false;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // Reset all colors
        for (let i = 0; i < searchArray.length; i++) {
            const bubble = document.getElementById(`search-bubble-${i}`);
            if (bubble) {
                bubble.style.background = '#444';
                bubble.style.transform = 'scale(0.9)';
                bubble.style.opacity = '0.5';
            }
        }
        
        // Highlight current search range
        for (let i = left; i <= right; i++) {
            const bubble = document.getElementById(`search-bubble-${i}`);
            if (bubble) {
                bubble.style.background = '#ffd700';
                bubble.style.transform = 'scale(1)';
                bubble.style.opacity = '1';
            }
        }
        
        await sleep(800);
        
        // Highlight middle element
        const midBubble = document.getElementById(`search-bubble-${mid}`);
        if (midBubble) {
            midBubble.style.background = '#ff4444';
            midBubble.style.transform = 'scale(1.3)';
        }
        
        await sleep(800);
        
        if (searchArray[mid] === target) {
            if (midBubble) {
                midBubble.style.background = '#00ff00';
                midBubble.style.transform = 'scale(1.4)';
            }
            if (resultEl) resultEl.textContent = `✓ Found ${target} at index ${mid}!`;
            found = true;
            break;
        } else if (searchArray[mid] < target) {
            // Eliminate left half
            for (let i = left; i <= mid; i++) {
                const bubble = document.getElementById(`search-bubble-${i}`);
                if (bubble) {
                    bubble.style.background = '#666';
                    bubble.style.opacity = '0.3';
                }
            }
            left = mid + 1;
        } else {
            // Eliminate right half
            for (let i = mid; i <= right; i++) {
                const bubble = document.getElementById(`search-bubble-${i}`);
                if (bubble) {
                    bubble.style.background = '#666';
                    bubble.style.opacity = '0.3';
                }
            }
            right = mid - 1;
        }
        
        await sleep(500);
    }
    
    if (!found && resultEl) {
        resultEl.textContent = `✗ ${target} not found in array`;
    }
    
    isSearching = false;
}