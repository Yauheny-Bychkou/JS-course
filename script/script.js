"use strict";

let appData;
let start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
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
  expensesAmount = document.querySelector(".expenses-amount");

//const plusTwo = document.querySelectorAll('button');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  budget: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
  },
  cancel: function () {
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
    let expensesTitle = document.querySelectorAll(".expenses-title");
    let expensesAmount = document.querySelectorAll(".expenses-amount");
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
    let incomeTitle = document.querySelectorAll(".income-title");
    let incomeAmount = document.querySelectorAll(".income-amount");
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
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    let eventFunc = function (event) {
      incomePeriodValue.value = appData.calcPeriod();
    };
    document.querySelector(".period-select").addEventListener("input", eventFunc);
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
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

    expensesItems = document.querySelectorAll(".expenses-items");
    let expensesTitle = document.querySelectorAll(".expenses-title");
    let expensesAmount = document.querySelectorAll(".expenses-amount");
    if (expensesItems.length === 2) {
      expensesTitle[2].value = "";
      expensesAmount[1].value = "";
    }
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
      expensesTitle[3].value = "";
      expensesAmount[2].value = "";
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
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

    incomeItems = document.querySelectorAll(".income-items");
    let incomeTitle = document.querySelectorAll(".income-title");
    let incomeAmount = document.querySelectorAll(".income-amount");
    if (incomeItems.length === 2) {
      incomeTitle[2].value = "";
      incomeAmount[1].value = "";
    }
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
      incomeTitle[3].value = "";
      incomeAmount[2].value = "";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome.replace(/[А-Яа-яЁё\s]/gi, "")) {
        alert("Допустимы только русские символы");
      } else {
        if (itemIncome !== "" && cashIncome !== "") {
          appData.income[itemIncome] = cashIncome;
        }
      }
    });
    for (let key in appData.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      this.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getRange: function (event) {
    periodAmount.innerText = periodSelect.value;
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusInHome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас очень высокий доход";
    } else if (appData.budgetDay >= 600) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay >= 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      const isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      };

      const start = function () {
        do {
          appData.percentDeposit = prompt("Какой годовой процент?", 10);
        } while (!isNumber(appData.percentDeposit));
        return appData.percentDeposit;
      };
      start();
      const startDeposit = function () {
        do {
          appData.moneyDeposit = prompt("Какая сумма заложена?", 1000);
        } while (!isNumber(appData.moneyDeposit));
        return appData.moneyDeposit;
      };
      startDeposit();
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
};

start.addEventListener("click", function () {
  if (isNumber(salaryAmount.value)) {
    appData.start();
  }

  start.style.display = "none";
  cancel.style.display = "initial";
});

cancel.addEventListener("click", function () {
  appData.cancel();
  start.style.display = "initial";
  cancel.style.display = "none";
});
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
document.querySelector(".period-select").addEventListener("input", appData.getRange);

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
