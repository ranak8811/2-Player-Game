// IIFE
(function () {
  const p1ScoreDisplay = document.getElementById("p1Score");
  const p2ScoreDisplay = document.getElementById("p2Score");
  const wScoreDisplay = document.getElementById("wScore");
  const inputScore = document.getElementById("inputScore");
  const p1Btn = document.getElementById("p1Btn");
  const p2Btn = document.getElementById("p2Btn");
  const resetBtn = document.getElementById("resetBtn");
  const winnerMessage = document.getElementById("winnerMessage");
  const timerDisplay = document.getElementById("timer");

  let p1Score = 0;
  let p2Score = 0;
  let winningScore = 5;
  let gameOver = false;
  let timerInterval;

  function updateScores(playerDisplay) {
    if (!gameOver) {
      if (playerDisplay === p1ScoreDisplay) {
        p1Score++;
        p1ScoreDisplay.textContent = p1Score;
      } else if (playerDisplay === p2ScoreDisplay) {
        p2Score++;
        p2ScoreDisplay.textContent = p2Score;
      }

      if (p1Score === winningScore || p2Score === winningScore) {
        gameOver = true;
        winnerMessage.textContent = `🎉 Player ${
          p1Score === winningScore ? 1 : 2
        } wins the game! 🎉`;
        winnerMessage.style.display = "block";
        clearInterval(timerInterval);
        p1Btn.setAttribute("disabled", "disabled");
        p2Btn.setAttribute("disabled", "disabled");
        playerDisplay.classList.add("winner");
        wScoreDisplay.classList.remove("winner");
      }
    }
  }

  p1Btn.addEventListener("click", () => {
    updateScores(p1ScoreDisplay);
  });

  p2Btn.addEventListener("click", () => {
    updateScores(p2ScoreDisplay);
  });

  resetBtn.addEventListener("click", () => {
    reset();
  });

  inputScore.addEventListener("change", () => {
    winningScore = Number(inputScore.value);
    wScoreDisplay.textContent = winningScore;
    reset();
  });

  function reset() {
    clearInterval(timerInterval);
    p1Score = 0;
    p2Score = 0;
    p1ScoreDisplay.textContent = p1Score;
    p2ScoreDisplay.textContent = p2Score;
    gameOver = false;
    winnerMessage.style.display = "none";
    timerDisplay.textContent = "5:00";
    p1Btn.removeAttribute("disabled");
    p2Btn.removeAttribute("disabled");
    p1ScoreDisplay.classList.remove("winner");
    p2ScoreDisplay.classList.remove("winner");
    wScoreDisplay.classList.remove("winner");
  }

  function startTimer(duration, display) {
    let timer = duration,
      minutes,
      seconds;
    timerInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(timerInterval);
        gameOver = true;
        winnerMessage.textContent = "⌛ Time's up! No one wins!";
        winnerMessage.style.display = "block";
        p1Btn.setAttribute("disabled", "disabled");
        p2Btn.setAttribute("disabled", "disabled");
      }
    }, 1000);
  }

  startTimer(300, timerDisplay);
})();
