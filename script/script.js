'use strict';

let money; 
let appData;
const buttonCalculation = document.getElementById('start');
const buttonPlusOne = document.getElementsByTagName('button')[0];
const buttonPlusTwo = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const incomeItem = document.querySelectorAll('.additional_income-item');
const inputBudgetDay = document.getElementsByClassName('budget_day-value');
const inputExpensesMonth = document.getElementsByClassName('expenses_month-value');
const inputAdditionalIncome = document.getElementsByClassName('additional_income-value');
const inputAdditionalExpenses = document.getElementsByClassName('additional_expenses-value');
const inputIncomePeriod = document.getElementsByClassName('income_period-value');
const inputTargetMonth = document.getElementsByClassName('target_month-value');
const inputBudgetMonth = document.querySelector('.budget_month-value');
const inputSalaryAmount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('.income-title');
const inputIncomeAmount = document.querySelector('.income-amount');
const inputExpensesTitle = document.querySelector('.expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputDepositCheck = document.querySelector('#deposit-check');
const inputDepositAmount = document.querySelector('.deposit-amount');
const inputDepositPercent = document.querySelector('.deposit-percent');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');

//const plusTwo = document.querySelectorAll('button');

const isNumber = function (n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}; 

const start = function(){
  do{
    money = +prompt('Ваш месячный доход?', '5000');
  }
  while(!isNumber(money));
 return money;
};

appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  budget: money,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 3,
  asking: function(){

       if(confirm('Есть ли у вас дополнительный источник заработка?')){
         let itemIncome;
         let cashIncome;

         const isWord = function (n){
         return isNaN(parseFloat(n));
         }; 
         const startWord = function(){
          do{
            itemIncome = prompt('Какой у вас есть дополнительный заработок', 'Таксую');
          }
          while(!isWord(itemIncome));
          return itemIncome;
          };
          startWord();
          
          const isNumber = function (n){
            return !isNaN(parseFloat(n)) && isFinite(n);
          }; 

          const start = function(){
            do{
              cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 1000);
            }
            while(!isNumber(cashIncome));
          return cashIncome;
          };
          start();
         appData.income[itemIncome] = cashIncome;
       }
        let expenses1;
        let amount;
        let words;
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = appData.addExpenses.split(', ');

        
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
         
        for(let i=0; i < 2; i++){
          const isWord = function (n){
          return isNaN(parseFloat(n));
          }; 
          const startWord = function(){
          do{
           expenses1 = prompt('Введите обязательную статью расходов', 'taxi');
          }
          while(!isWord(expenses1));
          return expenses1;
          };
          startWord();
          
         
        do{
        amount = +prompt('Во сколько это обойдется?', '100');     
        }
        while(!isNumber(amount));      
      appData.expenses[expenses1] = amount;
  }
  },

  getExpensesMonth: function(){
      for (let key in appData.expenses){
        appData.expensesMonth += appData.expenses[key];
      }  
  },

  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function(){
    let div = Math.ceil(appData.mission / appData.budgetMonth);
  if (div > 0){
    return "Цель будет достигнута за, месяцев: "+ div;
  } else {
    return "Цель не будет достигнута";
  }
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
  calcSavedMoney: function(){
    return appData.budgetMonth *appData.period;
  }
};

start();
appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();


console.log('Сумма всех обязательных расходов за месяцц:', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log('Уровень дохода: ', appData.getStatusInHome());
console.log('appData.addExpenses', appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));

console.log('Наша программа включает в себя данные:');


for (let key in appData){
  console.log(key +' '+ appData[key]);
}