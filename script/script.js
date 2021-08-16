"use strict";

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

const AppData = function () {
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
};

AppData.prototype.start = function () {
  this.budget = +salaryAmount.value;

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();

  this.showResult();
};

AppData.prototype.cancel = function () {
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
};

AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  let eventFunc = function (event) {
    incomePeriodValue.value = _this.calcPeriod();
  };
  document.querySelector(".period-select").addEventListener("input", eventFunc);
};

AppData.prototype.addExpensesBlock = function () {
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
};

AppData.prototype.addIncomeBlock = function () {
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
};

AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome.replace(/[А-Яа-яЁё\s]/gi, "")) {
      alert("Допустимы только русские символы");
    } else {
      if (itemIncome !== "" && cashIncome !== "") {
        _this.income[itemIncome] = cashIncome;
      }
    }
  });
  for (let key in _this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(",");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  const _this = this;
  for (let key in _this.expenses) {
    this.expensesMonth += _this.expenses[key];
  }
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getRange = function (event) {
  periodAmount.innerText = periodSelect.value;
};

AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusInHome = function () {
  const _this = this;
  if (_this.budgetDay >= 1200) {
    return "У вас очень высокий доход";
  } else if (_this.budgetDay >= 600) {
    return "У вас средний уровень дохода";
  } else if (_this.budgetDay >= 0) {
    return "К сожалению у вас уровень дохода ниже среднего";
  }
};

AppData.prototype.getInfoDeposit = function () {
  const _this = this;
  if (_this.deposit) {
    const isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    const start = function () {
      do {
        _this.percentDeposit = prompt("Какой годовой процент?", 10);
      } while (!isNumber(_this.percentDeposit));
      return _this.percentDeposit;
    };
    start();
    const startDeposit = function () {
      do {
        _this.moneyDeposit = prompt("Какая сумма заложена?", 1000);
      } while (!isNumber(_this.moneyDeposit));
      return _this.moneyDeposit;
    };
    startDeposit();
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventsListeners = function () {
  const _this = this;
  const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  start.addEventListener("click", function () {
    if (isNumber(salaryAmount.value)) {
      _this.start();
    }
    document.querySelectorAll("input[type=text]").forEach((input) => {
      input.disabled = true;
    });
    start.style.display = "none";
    cancel.style.display = "initial";
  });

  cancel.addEventListener("click", function () {
    _this.cancel();
    start.style.display = "initial";
    cancel.style.display = "none";
    document.querySelectorAll("input[type=text]").forEach((input) => {
      input.disabled = false;
    });
  });
  expensesPlus.addEventListener("click", _this.addExpensesBlock);
  incomePlus.addEventListener("click", _this.addIncomeBlock);
  document.querySelector(".period-select").addEventListener("input", _this.getRange);

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
};

const appData = new AppData();

appData.eventsListeners();
