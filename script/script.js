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
let amount;
let month;
let accumulatedMonth;
let target;
let budgetDay;
let getStatusInHome;

const sum = function getExpensesMonth(a,b){
  return Number(a) + Number(b);
};

const diff = function getAccumulatedMonth(c,d){
  return Number(c) - Number(d);
};

const spl = function getTargetMonth(f,g){
  return Math.ceil(Number(f) / Number(g));
};

const showTypeOf = function (data){
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

amount = sum(amount1, amount2);
month = diff(money, amount);
accumulatedMonth= month;
target = spl(mission, accumulatedMonth);
budgetDay = Math.floor(accumulatedMonth / 30);

getStatusInHome = function(){
if(budgetDay >= 1200) {
  return('У вас очень высокий доход');
} else if(budgetDay >= 600){ 
  return('У вас средний уровень дохода');
} else if(budgetDay >= 0){ 
  return('К сожалению у вас уровень дохода ниже среднего');
} 
};

console.log('Сумма всех обязательных расходов за месяц:', amount);
console.log('Накопления за месяц (Доходы минус расходы):', month);
console.log('За какой период будет достигнута цель, месяцев: ', target);
console.log('budgetDay: ', budgetDay);
console.log('Уровень дохода: ', getStatusInHome());
console.log(addExpenses.split(', '));