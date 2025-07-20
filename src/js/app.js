"use strict";

// const { Container } = require("postcss");

//                                          BankList App

const account1 = {
  owner: "Kiarash Rahimi",
  movement: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  currency: "EUR",
  locale: "en-US",
  movementDate: [
    "2024-11-18T21:31:17.178Z",
    "2024-12-23T07:42:02.383Z",
    "2024-01-02T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-05T14:11:59.604Z",
    "2024-07-22T17:01:17.194Z",
    "2024-07-21T23:36:17.929Z",
    "2024-07-20T10:51:36.790Z",
  ],
};
const account2 = {
  owner: "Mamal Rostami",
  movement: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  currency: "EUR",
  locale: "pt-TP",
  movementDate: [
    "2024-11-18T21:31:17.178Z",
    "2024-12-23T07:42:02.383Z",
    "2024-01-02T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-05T14:11:59.604Z",
    "2024-07-22T17:01:17.194Z",
    "2024-07-21T23:36:17.929Z",
    "2024-07-20T10:51:36.790Z",
  ],
};
const account3 = {
  owner: "Sara Amiri",
  movement: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  currency: "EUR",
  locale: "en-UK",
  movementDate: [
    "2024-11-18T21:31:17.178Z",
    "2024-12-23T07:42:02.383Z",
    "2024-01-02T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-05T14:11:59.604Z",
    "2024-07-22T17:01:17.194Z",
    "2024-07-21T23:36:17.929Z",
    "2024-07-20T10:51:36.790Z",
  ],
};
const account4 = {
  owner: "Ali Shirazi ",
  movement: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  currency: "USD",
  locale: "en-US",
  movementDate: [
    "2024-11-18T21:31:17.178Z",
    "2024-12-23T07:42:02.383Z",
    "2024-01-02T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-05T14:11:59.604Z",
    "2024-07-22T17:01:17.194Z",
    "2024-07-21T23:36:17.929Z",
    "2024-07-20T10:51:36.790Z",
  ],
};
//Dom variable----------------------
const accounts = [account1, account2, account3, account4];
const movement = document.querySelector(".movements__row");
const containerMovements = document.querySelector(".movements");
const labelBalance = document.querySelector(".balance__vlaue");
const labelSumIn = document.querySelector(".summary__valueIn");
const labelSumOut = document.querySelector(".summary__valueOut");
const labelSumINser = document.querySelector(".summary__valueInsert");
const userInput = document.querySelector(".input__user");
const pinInput = document.querySelector(".input__pin");
const btnLogin = document.querySelector(".button__login");
const welcomelbl = document.querySelector(".label__welcome");
const containerApp = document.querySelector(".containerApp");
const bluePartLogin = document.querySelector(".blue__Login");
const iconHeader = document.querySelector(".header__icon");
const formHeader = document.querySelector(".header__form");
const inputTransferTo = document.querySelector(".form__input__transferTo");
const inputAmountTransfer = document.querySelector(
  ".form__input__amountTransfer"
);
const inputLoanAmount = document.querySelector(".input__loanRequest");

const btnTransfer = document.querySelector(".btn__transfer");
const modal = document.querySelector(".index__modal");
const buttonCloseModal = document.querySelector(".btn__modal");
const modalExist = document.querySelector(".index__modal__exist");
const btnCloseAccount = document.querySelector(".btn__closeAccount");
const userCloseAccount = document.querySelector(".inputUser__closeAccount");
const pinCloseAccount = document.querySelector(".inputPin__closeAccount");
const labelDate = document.querySelector(".date");
const sortMovementBtn = document.querySelector(".index__button__sort");
const btnModalExist = document.querySelector(".btn__modal__exist");
const btnLoanRequest = document.querySelector(".btn__requestLoan");
const timeLogedOut = document.querySelector(".timeLogedOut");
const headertbl = document.querySelector(".headertbl");
const modalCurrentAccount = document.querySelector(
  ".index__modal__currentAccount"
);
const btnModalCurrentAccount = document.querySelector(
  ".btn__modal__currentAccount"
);
// Switch Button Function------------
const switchButton = function (button, button2, keyboard) {
  button.addEventListener("keydown", function (e) {
    if (e.key === keyboard) button2.focus();
  });
};
switchButton(userInput, pinInput, "Enter");
switchButton(userInput, pinInput, "ArrowRight");
switchButton(pinInput, userInput, "ArrowLeft");
switchButton(inputTransferTo, inputAmountTransfer, "ArrowRight");
switchButton(inputAmountTransfer, inputTransferTo, "ArrowLeft");
switchButton(userCloseAccount, pinCloseAccount, "ArrowRight");
switchButton(pinCloseAccount, userCloseAccount, "ArrowLeft");
//calculating dates-------------------
const formatMovementDate = function (date, locale) {
  const passDays = (Date1, Date2) =>
    Math.abs(Math.floor((Date1 - Date2) / (1000 * 60 * 60 * 24)));
  const dayPassed = passDays(new Date(), date);
  if (dayPassed === 0) return "today";
  if (dayPassed === 1) return "yesterday";
  if (dayPassed <= 7) return `${dayPassed} days ago`;
  else {
    // const year = date.getFullYear();
    // const month = `${date.getMonth() + 1}`.padStart(2, "0");
    // const day = `${date.getDate()}`.padStart(2, "0");
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
//Formatting currency-----------------
const formatCurrencies = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    useGrouping: false,
  }).format(value);
};
//display Movements-------------------
const dispalyMovement = function (acc, sort) {
  containerMovements.innerHTML = "";
  const mov = sort ? acc.movement.slice().sort((a, b) => a - b) : acc.movement;
  mov.forEach(function (mov, index) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    //Formatting mov
    const formatMov = formatCurrencies(Math.abs(mov), acc.locale, acc.currency);
    console.log(formatCurrencies(mov, acc.locale, acc.currency));
    //we can use this loop also for movementDate
    const date = new Date(acc.movementDate[index]);
    const displayDate = formatMovementDate(date, acc.locale);
    const typeClass = type === "withdrawal" ? "bg-red-500" : "bg-green-500";
    const html = ` 
    <div class="movements__row movements__type__${type}">
    <div class="flex justify-between px-14 mt-6">
      <div class="flex gap-6">
        <div
          class="text-md font-semibold text-white ${typeClass} rounded-xl px-4 py-1"
        >
          <span>${index + 1}</span> ${type}
        </div>
        <p class="text-slate-500 font-semibold text-md">${displayDate}</p>
      </div>
      <div class="text-2xl font-bold text-slate-500 index__p__movementAmount">${formatMov}</div>
    </div>
    <div class="w-full h-1 bg-slate-100 mt-6"></div>
  </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
//Sorting movements and display them
let sorted = false;
sortMovementBtn.addEventListener("click", function (e) {
  e.preventDefault();
  dispalyMovement(currentAccount, !sorted);
  sorted = !sorted;
});
//Display Balance------------------
const displayBalance = function (acc) {
  acc.balance = acc.movement.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = formatCurrencies(
    acc.balance,
    acc.locale,
    acc.currency
  );
};
//Creating Username---------------
const createUsername = (account) => {
  account.forEach(
    (acc) =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((letter) => letter.at(0))
        .join(""))
  );
};
//Update Ui------------------------
const updateUi = function (acc) {
  //Display Movements
  dispalyMovement(acc);
  //Display Balance
  displayBalance(acc);
  //display Salary
  calculateDisplaySalary(acc);
};
createUsername(accounts);
//Display Calculate Salary-----------
const calculateDisplaySalary = function (acc) {
  const income = acc.movement
    .filter((amount) => amount > 0)
    .reduce((acc, cur) => acc + cur);
  labelSumIn.textContent = formatCurrencies(income, acc.locale, acc.currency);
  const outcome = acc.movement
    .filter((amount) => amount <= 0)
    .reduce((acc, cur) => acc + cur);
  labelSumOut.textContent = formatCurrencies(
    Math.abs(outcome),
    acc.locale,
    acc.currency
  );
  const insert = acc.movement
    .filter((amount) => amount > 0)
    .map((amount) => (amount * acc.interestRate) / 100)
    .filter((amount) => amount >= 1)
    .reduce((acc, cur) => acc + cur);
  labelSumINser.textContent = formatCurrencies(
    insert,
    acc.locale,
    acc.currency
  );
};

//Login-------------------------------
const now = new Date();
let currentAccount, timer;
let reciverAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === userInput.value);
  console.log(currentAccount);
  if (currentAccount?.pin === +pinInput.value) {
    //Dispaly Ui and Welcome Message
    pinInput.value = userInput.value = "";
    bluePartLogin.classList.add("hidden");
    welcomelbl.textContent = `Welcome back ,${currentAccount.owner
      .split(" ")
      .at(0)}`;
    //date
    const options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    //Auto location
    //const locale = navigator.language;
    labelDate.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //Manual time
    // const year = now.getFullYear();
    // const month = `${now.getMonth() + 1}`.padStart(2, "0");
    // const day = `${now.getDate()}`.padStart(2, "0");
    // const hour = now.getHours();
    // const minute = `${now.getMinutes()}`.padStart(2, "0");

    containerApp.classList.remove("hidden");

    //timer
    if (timer) clearInterval(timer);
    timer = starterLogOutTimer();

    updateUi(currentAccount);

    //Add current date for loan and transfer
    currentAccount.movementDate.push(new Date().toISOString());
  }
});
//Transfer-----------------------------
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = inputAmountTransfer.value;
  const reciverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (amount > 0) {
    if (reciverAccount) {
      if (currentAccount.balance >= amount) {
        if (reciverAccount.username !== currentAccount.username) {
          reciverAccount.movement.push(+amount);
          currentAccount.movement.push(-amount);
          updateUi(currentAccount);
        } //Show you cant send money to your account
        else {
          containerApp.classList.add("hidden");
          modalCurrentAccount.classList.remove("hidden");
        }
      } else {
        containerApp.classList.add("hidden");
        modal.classList.remove("hidden");
      }
      // Show doesn't exist
    } else {
      containerApp.classList.add("hidden");
      modalExist.classList.remove("hidden");
    }
  }
  inputTransferTo.value = inputAmountTransfer.value = "";
  reciverAccount.movementDate.push(new Date().toISOString());
  clearInterval(timer);
  timer = starterLogOutTimer();
});
//RequestLoan button----------------------
btnLoanRequest.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movement.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movement.push(+amount);
      currentAccount.movementDate.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 4000);
    console.log("Sucssesfully");
  }
  inputLoanAmount.value = "";
  clearInterval(timer);
  timer = starterLogOutTimer();
});
//CancelButton in modal---------------------
const buttonCanceled = function (button, modalRemove, appShow) {
  button.addEventListener("click", function () {
    modalRemove.classList.add("hidden");
    appShow.classList.remove("hidden");
  });
};
buttonCanceled(buttonCloseModal, modal, containerApp);
buttonCanceled(btnModalCurrentAccount, modalCurrentAccount, containerApp);
buttonCanceled(btnModalExist, modalExist, containerApp);
// close Account button
btnCloseAccount.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentAccount.username === userCloseAccount.value &&
    currentAccount.pin === +pinCloseAccount.value
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.classList.add("hidden");
  }
});
//convering iterable ui amount to array and calculate sum of them with Array.from()
labelBalance.addEventListener("click", function () {
  const movementsUi = Array.from(
    document.querySelectorAll(".index__p__movementAmount"),
    (el) => Number(el.textContent.replace("$", ""))
  ).reduce((acc, cur) => acc + cur);
  console.log(movementsUi);
  //Way 2:
  const movementsUi2 = [
    ...document.querySelectorAll(".index__p__movementAmount"),
  ];
  const movUi2 = movementsUi2
    .map((el) => Number(el.textContent.replace("$", "")))
    .reduce((acc, cur) => acc + cur);
  console.log(movUi2);
});
//Practise methodt
const option = {
  style: "currency",
  currency: "EUR",
};
const starterLogOutTimer = function () {
  let time = 100;
  //                                                           این تیک رو ما برای این اوردیم که این تیکه کد که قبلا به عنوان ارگومان در تابع کال بک ما بود الان به عنوان تابع جدا هست .حالا یبار اونو فرا میخونیم و بعد از اون هر ثانیه اجرا میشه
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    //Dereasing 1s
    time--;
    timeLogedOut.textContent = `${min}:${sec}`;
    //when 0 second stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      containerApp.classList.add("hidden");
      welcomelbl.textContent = `Goodbye ${currentAccount.owner
        .split(" ")
        .at(0)}`;
      headertbl.classList.remove("hidden");
    }
  };
  //in each call print the remaining in ui
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
