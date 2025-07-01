let startTime, intervalId, elapsed = 0;

let running = false;


function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  const time = elapsed + (running ? now - startTime : 0);
  document.getElementById('display').textContent = formatTime(time);
}

function startStopwatch() {
  if (!running) {
    running = true;
    startTime = Date.now();
    intervalId = setInterval(updateDisplay, 50);
  }
}

function pauseStopwatch() {
  if (running) {
    running = false;
    elapsed += Date.now() - startTime;
    clearInterval(intervalId);
  }
}

function resetStopwatch() {
  running = false;
  clearInterval(intervalId);
  elapsed = 0;
  document.getElementById('display').textContent = "00:00:00";
  document.getElementById('laps').innerHTML = "";
}

function lapTime() {
  if (!running) return;
  const now = Date.now();
  const lap = elapsed + (now - startTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = formatTime(lap);
  document.getElementById("laps").appendChild(lapItem);
}