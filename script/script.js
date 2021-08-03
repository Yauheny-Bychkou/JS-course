'use strict';
let income = 'freelance';
let mission = 1000000;
let period = 7;
let money = prompt('Ваш месячный доход?', '5000');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'taxi, food');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов', 'taxi');
let amount1 = prompt('Во сколько это обойдется?', '100');
let expenses2 = prompt('Введите обязательную статью расходов', 'food');
let amount2 = prompt('Во сколько это обойдется?', '50');
let accumulatedMonth;
let budgetDay;

const getExpensesMonth = function (){
  return Number(amount1) + Number(amount2);
};

const getAccumulatedMonth = function (){
  return money - getExpensesMonth();
};

const getTargetMonth = function (){
  return Math.ceil(mission / accumulatedMonth());
};

const showTypeOf = function (data){
  console.log(data, typeof(data));
};

const getStatusInHome = function(){
if(budgetDay >= 1200) {
  return('У вас очень высокий доход');
} else if(budgetDay >= 600){ 
  return('У вас средний уровень дохода');
} else if(budgetDay >= 0){ 
  return('К сожалению у вас уровень дохода ниже среднего');
} 
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

accumulatedMonth= getAccumulatedMonth;
budgetDay = Math.floor(accumulatedMonth() / 30);

console.log('Сумма всех обязательных расходов за месяц:', getExpensesMonth());
console.log('Накопления за месяц (Доходы минус расходы):', getAccumulatedMonth());
console.log('За какой период будет достигнута цель, месяцев: ', getTargetMonth());
console.log('budgetDay: ', budgetDay);
console.log('Уровень дохода: ', getStatusInHome());
console.log(addExpenses.split(', '));
