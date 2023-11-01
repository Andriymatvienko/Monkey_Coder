function loadParagraph() {
  fetch('http://127.0.0.1:8080/api/data')
    .then(response => response.json())
    .then(data => {
      displayParagraphs(data);
    })
    .catch(error => {
      console.error('Error while fetching paragraph:', error);
    });
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();