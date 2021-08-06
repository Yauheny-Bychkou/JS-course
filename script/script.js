'use strict';

let addExpenses;
let deposit;
let accumulatedMonth;
let budgetDay;
let money; 
let sum;
let i;
let expensesAmount;
let expenses1;
let amount;
let expenses2;
let amount2;
let div;
let appData;

const isNumber = function (n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}; 

const start = function(){
  do{
    money = prompt('Ваш месячный доход?', '5000');
  }
  while(!isNumber(money));
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
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'taxi, food');
        appData.addExpenses = addExpenses.split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for(i=0; i < 2; i++){
        expenses1 = prompt('Введите обязательную статью расходов', 'taxi'); 
        do{
        amount = +prompt('Во сколько это обойдется?', '100');     
        }
        while(!isNumber(amount));      
      appData.expenses[expenses1] = amount;
  }
  },
  getExpensesMonth: function(){
    sum = 0;
      for(i=0; i < 2; i++){
        expenses1 = prompt('Введите обязательную статью расходов', 'taxi'); 
        do{
        amount = +prompt('Во сколько это обойдется?', '100');     
        }
        while(!isNumber(amount));      
      sum += amount;
  }
  return sum;
  },
  getAccumulatedMonth: function(){
    return money - expensesAmount;
  },
  getTargetMonth: function(){
    div = Math.ceil(appData.mission / accumulatedMonth);
  if (div > 0){
    return "Цель будет достигнута за, месяцев: "+ div;
  } else {
    return "Цель не будет достигнута";
  }
  },
  getStatusInHome: function(){
    if(budgetDay >= 1200) {
  return('У вас очень высокий доход');
} else if(budgetDay >= 600){ 
  return('У вас средний уровень дохода');
} else if(budgetDay >= 0){ 
  return('К сожалению у вас уровень дохода ниже среднего');
} 
  }
};
  
appData.asking();
start();

accumulatedMonth= appData.getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth / 30);


console.log(appData);
console.log('Сумма всех обязательных расходов за месяц:');
console.log('Накопления за месяц (Доходы минус расходы):', appData.getAccumulatedMonth());
console.log(appData.getTargetMonth());
console.log('budgetDay: ', budgetDay);
console.log('Уровень дохода: ', appData.getStatusInHome());