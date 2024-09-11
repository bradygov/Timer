let timer;
let isRunning = false;
let timeLeft = 1500; // 25 minutes in seconds

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const statusDisplay = document.getElementById('status');
const progress = document.getElementById('progress');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update the progress
    const percentage = (timeLeft / 1500) * 100; // 1500 seconds = 25 minutes
    const offset = (percentage / 100) * (Math.PI * 2 * 16.5); // Circumference of the circle
    progress.style.strokeDashoffset = offset;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        statusDisplay.textContent = "Focus!";
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                statusDisplay.textContent = "Time's up! Take a break.";
                timeLeft = 1500; // Reset the timer
                updateDisplay();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 1500; // Reset to 25 minutes
    updateDisplay();
    statusDisplay.textContent = "";
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initial display update
updateDisplay();