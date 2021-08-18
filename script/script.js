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

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
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
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
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
    const expensesTitle = document.querySelectorAll(".expenses-title");
    const expensesAmount = document.querySelectorAll(".expenses-amount");
    if (expensesItems.length === 2) {
      expensesTitle[2].value = "";
      expensesAmount[1].value = "";
    }
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
      expensesTitle[3].value = "";
      expensesAmount[2].value = "";
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
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
    const incomeTitle = document.querySelectorAll(".income-title");
    const incomeAmount = document.querySelectorAll(".income-amount");
    if (incomeItems.length === 2) {
      incomeTitle[2].value = "";
      incomeAmount[1].value = "";
    }
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
      incomeTitle[3].value = "";
      incomeAmount[2].value = "";
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome.replace(/[А-Яа-яЁё\s]/gi, "")) {
        alert("Допустимы только русские символы");
      } else {
        if (itemIncome !== "" && cashIncome !== "") {
          this.income[itemIncome] = cashIncome;
        }
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
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
    expensesPlus.addEventListener("click", this.addExpensesBlock);
    incomePlus.addEventListener("click", this.addIncomeBlock);
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
  }
}

const appData = new AppData();

appData.eventsListeners();
