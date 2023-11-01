const pythonButton = document.getElementById('pythonButton');
const javaButton = document.getElementById('javaButton');

pythonButton.addEventListener('click', () => {
    loadParagraph('python');
});

javaButton.addEventListener('click', () => {
    loadParagraph('java');
});

function loadParagraph(language) {
    fetch(`http://127.0.0.1:8080/api/data?language=${language}`)
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