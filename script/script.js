let income = 'freelance';
let mission = 1000000;
let period = 7;
let money = prompt('Ваш месячный доход?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
let purpose = Math.ceil(mission / budgetMonth);
let budgetDay = Math.floor(budgetMonth/30);

if(budgetDay >= 1200) {
  console.log('У вас очень высокий доход');
} else if(budgetDay >= 600){ 
  console.log('У вас средний уровень дохода');
} else if(budgetDay >= 0){ 
  console.log('К сожалению у вас уровень дохода ниже среднего');
} 

console.log('budgetMonth: ', budgetMonth);
console.log('budgetDay: ', budgetDay);
console.log('purpose, месяцев: ', purpose);
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('The period is', period, 'mounth and purpose make', mission, 'dollars');
console.log(addExpenses.toLowerCase);
console.log(addExpenses.split(', '));
