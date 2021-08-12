'use strict';


let appData;
let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    buttonPlusTwo = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],    
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItem = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

//const plusTwo = document.querySelectorAll('button');

const isNumber = function (n){
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
  start: function(){
  
  if(salaryAmount.value === ''){
    alert('Ошибка, поле "месячный доход" должно быть заполнено');
    return;
  }  
  appData.budget = +salaryAmount.value;
  
  appData.getExpenses();
  appData.getIncome();
  appData.getExpensesMonth();
  appData.getAddExpenses();
  appData.getAddIncome();
  appData.getBudget();
  
  appData.showResult();
 
  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    let eventFunc = function(event){
      incomePeriodValue.value = appData.calcPeriod();
    };
    document.querySelector('.period-select').addEventListener('input', eventFunc);

  },
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function(){ 
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = +cashExpenses;
      } 
    });
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome  !== ''){
        appData.income[itemIncome] = cashIncome;
      } 

    });
       for (let key in appData.income){
         appData.incomeMonth += +appData.income[key];
       }

  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function(){
    for (let key in appData.expenses){
      appData.expensesMonth += appData.expenses[key];

    }
  },
  getBudget: function(){
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getRange: function(event){
    periodAmount.innerText = periodSelect.value;

  },
  getTargetMonth: function(){
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusInHome: function(){
    if(appData.budgetDay >= 1200) {
  return('У вас очень высокий доход');
} else if(appData.budgetDay >= 600){ 
  return('У вас средний уровень дохода');
} else if(appData.budgetDay >= 0){ 
  return('К сожалению у вас уровень дохода ниже среднего');
} 
  },
  getInfoDeposit: function(){
    
    if(appData.deposit){
      const isNumber = function (n){
            return !isNaN(parseFloat(n)) && isFinite(n);
          }; 

          const start = function(){
            do{
              appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(appData.percentDeposit));
          return appData.percentDeposit;
          };
          start();
          const startDeposit = function(){
            do{
              appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);
            }
            while(!isNumber(appData.moneyDeposit));
          return appData.moneyDeposit;
          };
          startDeposit ();
      
    }
  },
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
  }
};
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click',appData.addIncomeBlock);
document.querySelector('.period-select').addEventListener('input', appData.getRange);