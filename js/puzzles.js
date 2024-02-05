// puzzles.js

// Puzzle definitions with detailed setup
const puzzles = [
    {
        id: 'puzzle1',
        question: 'Decode this message: "Gur mreb vf gur xrl gb rirelguvat."',
        solution: 'the deer is the key to everything',
        hint: 'This is a Caesar cipher, where each letter is shifted. Try reversing the shift.',
        solved: false
    },
    {
        id: 'puzzle2',
        question: 'What prime number comes next: 2, 3, 5, 7, ?',
        solution: '11',
        hint: 'These are prime numbers, which are only divisible by 1 and themselves.',
        solved: false
    },
    {
        id: 'puzzle3',
        question: 'I speak without a mouth and hear without ears. What am I?',
        solution: 'echo',
        hint: 'It\'s a phenomenon that returns sound back to the listener.',
        solved: false
    }
];

let awaitingSolutionForPuzzleId = null;

// Process user commands and manage puzzle interaction states
function processCommand(command) {
    if (awaitingSolutionForPuzzleId) {
        checkPuzzleSolution(command.trim().toLowerCase(), awaitingSolutionForPuzzleId);
        awaitingSolutionForPuzzleId = null; // Reset the awaiting state
    } else {
        const [action, arg] = command.split(' ');
        switch (action) {
            case 'solve':
                attemptSolvePuzzle(arg);
                break;
            case 'hint':
                provideHint(arg);
                break;
            case 'status':
                showPuzzleStatus();
                break;
            default:
                updateTerminal('Available commands: solve [puzzleId], hint [puzzleId], status');
        }
    }
}

// Attempt to solve a puzzle based on user input
function attemptSolvePuzzle(puzzleId) {
    const puzzle = puzzles.find(p => p.id === puzzleId);
    if (puzzle) {
        if (puzzle.solved) {
            updateTerminal(`Puzzle ${puzzleId} has already been solved.`);
        } else {
            awaitingSolutionForPuzzleId = puzzleId; // Set the state to expect a solution for this puzzle
            updateTerminal(`Solve ${puzzleId}: ${puzzle.question}`);
        }
    } else {
        updateTerminal(`No puzzle found with ID: ${puzzleId}.`);
    }
}

// Check the user's solution against the correct answer
function checkPuzzleSolution(solution, puzzleId) {
    const puzzle = puzzles.find(p => p.id === puzzleId);
    if (puzzle && solution === puzzle.solution) {
        puzzle.solved = true;
        updateTerminal(`Correct! Puzzle ${puzzleId} solved.`);
    } else {
        updateTerminal('Incorrect solution. Try again, or use "hint" for a clue.');
    }
}

// Provide a hint for a specified puzzle
function provideHint(puzzleId) {
    const puzzle = puzzles.find(p => p.id === puzzleId);
    if (puzzle) {
        updateTerminal(`Hint for ${puzzleId}: ${puzzle.hint}`);
    } else {
        updateTerminal(`No puzzle found with ID: ${puzzleId}.`);
    }
}

// Show the current status of all puzzles
function showPuzzleStatus() {
    puzzles.forEach(puzzle => {
        const status = puzzle.solved ? 'Solved' : 'Unsolved';
        updateTerminal(`${puzzle.id}: ${status}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Any initialization logic or welcome message
    updateTerminal("Welcome to the Warpcast Puzzle Challenge! Type 'status' to see puzzle list.");
});
