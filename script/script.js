'use strict';
let income = 'freelance';
let mission = 1000000;
let period = 7;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'taxi, food');
let deposit = confirm('Есть ли у вас депозит в банке?');
let accumulatedMonth;
let budgetDay;
let money; 
let sum;
let i;
let expensesAmount;
let expenses1;
let amount1;
let expenses2;
let amount2;
let div;

const isNumber = function (n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}; 

const start = function(){
  do{
    money = prompt('Ваш месячный доход?', '5000');
  }
  while(!isNumber(money));
};
  
const getExpensesMonth = function (){
  sum = 0;
  for(i=0; i < 2; i++){
      if(i===0){
        expenses1 = prompt('Введите обязательную статью расходов', 'taxi');
        do{
        amount1 = +prompt('Во сколько это обойдется?', '100');  
        }
        while(!isNumber(amount1));
      }
      if(i===1){
        expenses2 = prompt('Введите обязательную статью расходов', 'taxi');
        do{
        amount2 = +prompt('Во сколько это обойдется?', '100');
        }
        while(!isNumber(amount2));
      }
      sum = amount1 + amount2;
  }
  return sum;
};

const getAccumulatedMonth = function (){
  return money - expensesAmount;
};

const getTargetMonth = function (){
  div = Math.ceil(mission / accumulatedMonth());
  if (div > 0){
    return "Цель будет достигнута за, месяцев: "+ div;
  } else {
    return "Цель не будет достигнута";
  }
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

start();
expensesAmount= getExpensesMonth();
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

accumulatedMonth= getAccumulatedMonth;
budgetDay = Math.floor(accumulatedMonth() / 30);

console.log('Сумма всех обязательных расходов за месяц:', expensesAmount);
console.log('Накопления за месяц (Доходы минус расходы):', getAccumulatedMonth());
console.log(getTargetMonth());
console.log('budgetDay: ', budgetDay);
console.log('Уровень дохода: ', getStatusInHome());
console.log(addExpenses.split(', '));
