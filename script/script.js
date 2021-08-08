'use strict';

let money; 
let appData;

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
  mission: 1000000,
  asking: function(){
        let amount;
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = appData.addExpenses.split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for(let i=0; i < 2; i++){
        let expenses1 = prompt('Введите обязательную статью расходов', 'taxi'); 
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
  }
};

start();
appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Сумма всех обязательных расходов за месяц:', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log('Уровень дохода: ', appData.getStatusInHome());
console.log('Наша программа включает в себя данные:');

for (let key in appData){
  console.log(key +' '+ appData[key]);
}