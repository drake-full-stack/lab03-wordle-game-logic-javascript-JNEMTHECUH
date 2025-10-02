// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// TODO: Add keyboard event listener
// document.addEventListener("keydown", (event) => {
//     // Your code here!
// });
document.addEventListener('keydown', (event) => {
    // Convert the key to uppercase so it's consistent
    const key = event.key.toUpperCase();

    // Log the raw key press for debugging
    logDebug(`Key pressed: ${event.key}`);

    // Check if the game is over
    if (gameOver) {
        logDebug("Game is over — input ignored");
        return;
    }

    if (key === "BACKSPACE") {
        deleteLetter();
    } else if (key === "ENTER") {
        submitGuess();
    } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
    } else {
        // Anything else (numbers, symbols, etc.) gets ignored
        logDebug(`Ignored key: ${event.key}`);
    }       

    })


// TODO: Implement addLetter function
function addLetter(letter) {
    logDebug(`🎯 addLetter("${letter}") called`, 'info');

    // Check if current row is already full 
    if (currentTile >= 5) {
        logDebug(" Cannot add letter — row is full!", 'error');
        return;
    }

    // Get the current row and its tiles
    const row = rows[currentRow];
    const tiles = row.querySelectorAll('.tile');

    // Get the specific tile we’re filling
    const tile = tiles[currentTile];

    // Set the tile content and apply styling
    tile.textContent = letter;
    tile.classList.add('filled');

    // Move to the next tile
    currentTile++;

    // Log what just happened
    logDebug(`Letter "${letter}" placed at row ${currentRow}, tile ${currentTile}`, 'success');
    logDebug(`Current word: "${getCurrentWord()}"`, 'info');
}
// TODO: Implement deleteLetter function  
// function deleteLetter() {
//     // Your code here!
// }

// TODO: Implement submitGuess function
// function submitGuess() {
//     // Your code here!
// }

// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }