const gameWrapper = document.querySelector(".gameWrapper"),
  registrationForm = document.querySelector(".registrationForm"),
  registrationFormSubmitBtn = document.querySelector(".registrationForm__submitBtn"),
  app = document.querySelector(".app"),
  startGameBtn = document.querySelector(".app__startBtn"),
  nextLvlBtn = document.querySelector(".result__nextLvlBtn"),
  endGameBtn = document.querySelector(".result__finishBtn"),
  appName = document.querySelector(".app__userName"),
  totalScore = document.querySelector(".app__userScore"),
  currentScore = document.querySelector(".app__currentLvlProgress"),
  userLevel = document.querySelector(".app__lvlValue"),
  characterImg = document.querySelector(".app__character"),
  getPointsBtn = document.querySelector(".app__pointsBtn");


let currentScoreValue = 0,
  totalScoreValue = 0,
  lvlValue = 1;


function resetUserScores() {
  currentScoreValue = 0;
  totalScoreValue = 0;
  lvlValue = 1;
  totalScore.innerText = 0;
  currentScore.value = 0;
  userLevel.innerText = 1;
}

// Функція для перевірки значень інпутів
function checkForm() {
  const nickInp = document.querySelector("#registrationForm__nik"),
    nameInp = document.querySelector("#registrationForm__name"),
    emailInp = document.querySelector("#registrationForm__email");

  const emailRegex = /^([A-Z]|[1-9]){1,}[@][A-Z]{1,}[.][A-Z]{1,}$/i,
    nameRegex = /^[A-Z]{1,}$/i;

  const emailIsValid = emailRegex.test(emailInp.value),
    nickIsValid = nickInp.value.length > 0,
    nameIsValid = (nameRegex.test(nameInp.value)) && (nameInp.value.length > 0);

  if (!emailIsValid) {
    // alert("Email is not valid");
    emailInp.nextElementSibling.classList.remove("hidden");
  } else if (!nickIsValid) {
    // alert("Nick is not valid");
    nickInp.nextElementSibling.classList.remove("hidden");
  } else if (!nameIsValid) {
    // alert("Name is not valid");
    nameInp.nextElementSibling.classList.remove("hidden");
  } else {
    submitForm();
  }

  // Запис даних форми у local storage 
  function submitForm() {
    localStorage.setItem("name", nameInp.value);
    localStorage.setItem("nick", nickInp.value);
    localStorage.setItem("email", emailInp.value);
    localStorage.setItem("totalScore", 0);
    resetUserScores();
    appName.innerText = nameInp.value;
    registrationForm.parentElement.classList.add("hidden");
    app.classList.remove("hidden");
    alert("Form submitted");
  }
}

// event listeners для запуску функції перевірки значень інпутів при submit форми реєстрації

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkForm();
})

registrationFormSubmitBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  checkForm();
})

// Добавляю клас hidden для підказки в разі невірного введеного значення інпутів
document.querySelectorAll(".gameInp").forEach(el => {
  el.addEventListener("input", () => {
    el.nextElementSibling.classList.add("hidden");
  })
})

// start game

// Дані про рівні - максимальне число кліків, адреси картинок для героїв та фону

const lvlInfo = {
  1: {
    maxScore: 5,
    bgImage: 'url("./img/1/bg.jpg")',
    enemyImg: 'url("./img/1/img.png")'
  },
  2: {
    maxScore: 7,
    bgImage: 'url("./img/2/bg.jpg")',
    enemyImg: 'url("./img/2/img.png")'
  },
  3: {
    maxScore: 9,
    bgImage: 'url("./img/3/bg.jpg")',
    enemyImg: 'url("./img/3/img.png")'
  },
  4: {
    maxScore: 11,
    bgImage: 'url("./img/4/bg.jpg")',
    enemyImg: 'url("./img/4/img.png")'
  },
  5: {
    maxScore: 13,
    bgImage: 'url("./img/5/bg.jpg")',
    enemyImg: 'url("./img/5/img.png")'
  }
}

// функція для toggle видимості розділу з картинкою персонажа та кнопок (наступна гра/кінець гри)

function toggleCongrats() {
  characterImg.parentElement.classList.toggle("hidden");
  if (lvlValue < 5) {
    nextLvlBtn.parentElement.classList.toggle("hidden");
  } else {
    document.querySelector(".result__totalScore").innerText = totalScoreValue;
    endGameBtn.parentElement.classList.toggle("hidden");
  }
};

//  функція "старт гри" - встановлюємо максимальну кількість кліків, змінюємо фон та персонажа

function startGame(lvl) {
  currentScore.max = lvlInfo[lvl]['maxScore'];
  gameWrapper.style.backgroundImage = lvlInfo[lvl]['bgImage'];
  characterImg.style.backgroundImage = lvlInfo[lvl]["enemyImg"];
};

// event listener для кліку по персонажу

characterImg.addEventListener("click", () => {
  if (currentScoreValue < lvlInfo[lvlValue]["maxScore"]) {
    currentScoreValue += 1;
    totalScoreValue += 1;
    totalScore.innerText = totalScoreValue;
    currentScore.value = currentScoreValue;
    if (currentScoreValue == lvlInfo[lvlValue]["maxScore"]) {
      toggleCongrats();
    }
  }
})

//  подія для кліку на кнопку початку гри

startGameBtn.addEventListener("click", () => {
  startGameBtn.parentElement.classList.add("hidden");
  characterImg.parentElement.classList.remove("hidden");
  resetUserScores();
  startGame(1);
})

// подія кліку на кнопку "наступна гра" - викликаємо ф-ю зміни видимості розділів з персонажем/кнопками
// змінюємо значення рівня, обнуляємо значення для поточної кількості балів

nextLvlBtn.addEventListener("click", () => {
  toggleCongrats();
  lvlValue++;
  userLevel.innerText = lvlValue;
  startGame(lvlValue);
  currentScoreValue = 0;
  currentScore.value = currentScoreValue;
})

// подія клік на кнопку "кінець гри" - ховаємо поточну кнопку, показуємо "старт гри", змінюємо фон

endGameBtn.addEventListener("click", () => {
  endGameBtn.parentElement.classList.add("hidden");
  startGameBtn.parentElement.classList.remove("hidden");
  gameWrapper.style.backgroundImage = 'url("./img/startGame-bg.png")';

})