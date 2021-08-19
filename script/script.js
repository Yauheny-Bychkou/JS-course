"use strict";

let start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  buttonPlus = document.querySelector(".btn_plus"),
  buttonPlusTwo = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0],
  additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0],
  additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelectorAll(".income-title"),
  incomeItem = document.querySelectorAll(".income-items"),
  expensesTitle = document.querySelectorAll(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount"),
  incomeAmount = document.querySelector(".income-amount"),
  expensesAmount = document.querySelector(".expenses-amount"),
  depositBank = document.querySelector(".deposit-bank");

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.budget = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }
  start() {
    this.budget = +salaryAmount.value;

    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc(additionalExpensesItem, true);
    this.getAddExpInc(additionalIncomeItem, false);
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();
  }
  cancel() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.budget = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    expensesItems = document.querySelectorAll(".expenses-items");
    const expensesTitle = document.querySelectorAll(".expenses-title");
    const expensesAmount = document.querySelectorAll(".expenses-amount");
    if (expensesItems.length === 2) {
      expensesTitle[2].style.display = "none";
      expensesAmount[1].style.display = "none";
    }
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "initial";
      expensesTitle[3].style.display = "none";
      expensesAmount[2].style.display = "none";
      expensesTitle[2].style.display = "none";
      expensesAmount[1].style.display = "none";
    }

    incomeItems = document.querySelectorAll(".income-items");
    const incomeTitle = document.querySelectorAll(".income-title");
    const incomeAmount = document.querySelectorAll(".income-amount");
    if (incomeItems.length === 2) {
      incomeTitle[2].style.display = "none";
      incomeAmount[1].style.display = "none";
    }
    if (incomeItems.length === 3) {
      incomePlus.style.display = "initialnone";
      incomeTitle[3].style.display = "none";
      incomeAmount[2].style.display = "none";
      incomeTitle[2].style.display = "none";
      incomeAmount[1].style.display = "none";
    }

    document.querySelectorAll("input[type='text']").forEach((item) => {
      item.removeAttribute("disabled");
      item.value = "";
    });
    depositBank.style.display = "none";
    depositAmount.style.display = "none";
    depositPercent.style.display = "none";
    depositBank.value = "";
    depositAmount.value = "";
    depositPercent.value = "";
    depositCheck.checked = false;
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    const eventFunc = (event) => {
      incomePeriodValue.value = this.calcPeriod();
    };
    document.querySelector(".period-select").addEventListener("input", eventFunc);
  }
  addExpIncBlock(btn, items, str) {
    const cloneItem = items[0].cloneNode(true);
    cloneItem.querySelectorAll("input").forEach((inp) => (inp.value = ""));
    items[0].parentNode.insertBefore(cloneItem, btn);
    items = document.querySelectorAll(`.${str}-items`);
    if (items.length === 3) {
      btn.style.display = "none";
    }
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split("-")[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== "" && itemAmount !== "") {
        this[startStr][itemTitle] = +itemAmount;
      }
    };
    expensesItems.forEach(count);
    incomeItems.forEach(count);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpInc(addPlace, bool) {
    let addPlaceItem;
    if (bool) {
      addPlaceItem = additionalExpensesItem.value.split(",");
    } else {
      addPlaceItem = additionalIncomeItem;
    }
    addPlaceItem.forEach((item) => {
      let itemValue;
      if (bool) {
        itemValue = item.trim();
        addPlace = this.addExpenses;
      } else {
        itemValue = item.value.trim();
        addPlace = this.addIncome;
      }
      if (itemValue !== "") {
        addPlace.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getRange(event) {
    periodAmount.innerText = periodSelect.value;
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === "other") {
      depositPercent.style.display = "initial";
      depositPercent.value = "";
      depositPercent.addEventListener("change", function () {
        if (depositPercent.value > 100 || depositPercent.value < 0) {
          alert("Введите корректное значение в поле проценты");
          start.disabled = true;
        } else {
          start.disabled = false;
        }
      });
    } else {
      depositPercent.value = valueSelect;
      depositPercent.style.display = "none";
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "initial";
      depositAmount.style.display = "initial";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositPercent.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);
    }
  }
  eventsListeners() {
    const isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    start.addEventListener("click", () => {
      if (isNumber(salaryAmount.value)) {
        this.start();
      }
      document.querySelectorAll("input[type=text]").forEach((input) => {
        input.disabled = true;
      });
      start.style.display = "none";
      cancel.style.display = "initial";
    });
    cancel.addEventListener("click", () => {
      this.cancel();
      start.style.display = "initial";
      cancel.style.display = "none";
      document.querySelectorAll("input[type=text]").forEach((input) => {
        input.disabled = false;
      });
    });
    expensesPlus.addEventListener("click", () => {
      this.addExpIncBlock(expensesPlus, expensesItems, "expenses");
    });

    incomePlus.addEventListener("click", () => {
      this.addExpIncBlock(incomePlus, incomeItems, "income");
    });
    document.querySelector(".period-select").addEventListener("input", this.getRange);

    document.querySelectorAll("input[placeholder=Наименование]").forEach((input) => {
      input.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[A-Za-zА]/, "");
      });
    });
    document.querySelectorAll("input[placeholder=Сумма]").forEach((input) => {
      input.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/, "");
      });
    });
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
  }
}

const appData = new AppData();

appData.eventsListeners();
