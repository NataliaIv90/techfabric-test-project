// Основні дані щодо рівнів - кількість балів для переходу далі, фото героя і фону

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

// Створення класу Об'єкт гра, в якому присвоєно стандартні значення змінних (рівень, поточні бали, загальна кількість балів) 

class GameObj {
  constructor(lvl = 1, currentScore = 0, totalScore = 0) {
    this.lvl = lvl;
    this.currentScore = currentScore;
    this.totalScore = totalScore;
  }

  // ф-я для обнулення балів користувача

  resetUserScores() {
    const totalScore = document.querySelector(".app__userScore"),
      currentScore = document.querySelector(".app__currentLvlProgress"),
      userLevel = document.querySelector(".app__lvlValue");
    this.currentScore = 0;
    this.totalScore = 0;
    this.lvl = 1;
    totalScore.innerText = 0;
    currentScore.value = 0;
    userLevel.innerText = 1;
  }

  // Ф-я для перевірки даних форми

  checkForm() {
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
      this.submitForm();
    }
  }

  // Ф-я для прийому даних форми

  submitForm() {
    const nickInp = document.querySelector("#registrationForm__nik"),
      nameInp = document.querySelector("#registrationForm__name"),
      emailInp = document.querySelector("#registrationForm__email");
    localStorage.setItem("name", nameInp.value);
    localStorage.setItem("nick", nickInp.value);
    localStorage.setItem("email", emailInp.value);
    this.resetUserScores();
    document.querySelector(".app__userName").innerText = nameInp.value;
    document.querySelector(".registrationForm__Container").classList.add("hidden");
    document.querySelector(".app").classList.remove("hidden");
  }

  // Ф-я для зміни фону, картинки ворога та начення рівня на панелі стану

  changeGameData() {
    document.querySelector(".app__currentLvlProgress").max = lvlInfo[this.lvl]['maxScore'];
    document.querySelector(".gameWrapper").style.backgroundImage = lvlInfo[this.lvl]['bgImage'];
    document.querySelector(".app__character").style.backgroundImage = lvlInfo[this.lvl]["enemyImg"];
  };

  // ф-я для зміни видимості героїв/кнопок між рівнями

  toggleCongrats() {
    document.querySelector(".app__character").parentElement.classList.toggle("hidden");
    if (this.lvl < 5) {
      document.querySelector(".result__nextLvlBtn").parentElement.classList.toggle("hidden");
    } else {
      document.querySelector(".result__totalScore").innerText = this.totalScore;
      document.querySelector(".result__finishBtn").parentElement.classList.toggle("hidden");
    }
  };

  // ф-я для зарахування кліку по персонажу, а також перевірки, чи потрібно переходити на наступний рівень

  submitClick() {
    if (this.currentScore < lvlInfo[this.lvl]["maxScore"]) {
      this.currentScore += 1;
      this.totalScore += 1;
      document.querySelector(".app__userScore").innerText = this.totalScore;
      document.querySelector(".app__currentLvlProgress").value = this.currentScore;
      if (this.currentScore == lvlInfo[this.lvl]["maxScore"]) {
        this.toggleCongrats();
      }
    }
  }

  // ф-я для початку нової гри

  startGame() {
    document.querySelector(".app__startBtn").parentElement.classList.add("hidden");
    document.querySelector(".app__character").parentElement.classList.remove("hidden");
    this.resetUserScores();
    this.changeGameData();
  }

  // перехід на наступний рівень

  goNextLevel() {
    this.toggleCongrats();
    this.lvl += 1;
    this.currentScore = 0;
    document.querySelector(".app__lvlValue").innerText = this.lvl;
    this.changeGameData();
    document.querySelector(".app__currentLvlProgress").value = this.currentScore;
  }

  // закінчення гри

  endGame() {
    document.querySelector(".result__finishBtn").parentElement.classList.add("hidden");
    document.querySelector(".app__startBtn").parentElement.classList.remove("hidden");
    document.querySelector(".gameWrapper").style.backgroundImage = 'url("./img/startGame-bg.png")';
  }
}

// створення змінної game за допомогою конструктора

let game = new GameObj();

// При натисканні кнопки чи enter перевіряється, чи відповідають введені дані параметрам та приймаються дані від користувача

document.querySelector(".registrationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  game.checkForm();
})

document.querySelector(".registrationForm__submitBtn").addEventListener("submit", (e) => {
  e.preventDefault();
  game.checkForm();
})

// Добавляю клас hidden для підказки в разі невірного введеного значення інпутів

document.querySelectorAll(".gameInp").forEach(el => {
  el.addEventListener("input", () => {
    el.nextElementSibling.classList.add("hidden");
  })
})

// event listener для кліку по персонажу

document.querySelector(".app__character").addEventListener("click", () => {
  game.submitClick();
})

//  подія для кліку на кнопку початку гри

document.querySelector(".app__startBtn").addEventListener("click", () => {
  game.startGame();
})

// подія кліку на кнопку "наступна гра" - викликаємо ф-ю зміни видимості розділів з персонажем/кнопками
// змінюємо значення рівня, обнуляємо значення для поточної кількості балів

document.querySelector(".result__nextLvlBtn").addEventListener("click", () => {
  game.goNextLevel();
})

// подія клік на кнопку "кінець гри" - ховаємо поточну кнопку, показуємо "старт гри", змінюємо фон

document.querySelector(".result__finishBtn").addEventListener("click", () => {
  game.endGame();
})