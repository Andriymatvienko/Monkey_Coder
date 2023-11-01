const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;
let animationFinished = false;


  // Функция для отображения абзацев на странице
  function displayParagraphs(paragraphs) {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
      let span = `<span>${char}</span>`
      typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
  
    const characters = typingText.querySelectorAll("span");
    characters.forEach((char, index) => {
      char.classList.add("typewriter");
      char.style.animationDelay = `${index * 0.01}s`; // Задержка анимации для каждого символа
    });
  
    // Установите animationFinished в false в начале анимации
    animationFinished = false;
  
    // Установите animationFinished в true по завершении анимации
    characters[characters.length - 1].addEventListener('animationend', () => {
      animationFinished = true;
      inpField.value = ""; // Очистите поле ввода после окончания анимации
    });
  }
  
function initTyping() {
    if (!animationFinished) return;

    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";

    }   
   
    
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        event.preventDefault();
        const spaces = '    '; // четыре пробела
        const cursorPosition = inpField.selectionStart; // Получаем текущую позицию курсора
        const value = inpField.value;
        const textBeforeCursor = value.substring(0, cursorPosition);
        const textAfterCursor = value.substring(cursorPosition, value.length);

        // Вставляем пробелы по позиции курсора
        inpField.value = textBeforeCursor + spaces + textAfterCursor;

        // Перемещаем курсор в конец вставленных пробелов
        const newCursorPosition = cursorPosition + spaces.length;
        inpField.setSelectionRange(newCursorPosition, newCursorPosition);

        // Обновляем `charIndex` только при успешной вставке пробелов
        if (inpField.value.charAt(cursorPosition) === ' ') {
            charIndex += spaces.length;
        }

        // Установить фокус на поле ввода после вставки пробелов
        // inpField.focus();

        // Обеспечить видимость текстового курсора
        inpField.selectionStart = newCursorPosition;
        inpField.selectionEnd = newCursorPosition;
    }
});
  

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

