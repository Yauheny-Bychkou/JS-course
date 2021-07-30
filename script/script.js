let num = 266219;
let sum = 1;
let deg = 3;
while(num >= 1) {
  sum *= num % 10;
  num = Math.floor(num / 10);
}
console.log('2*6*6*2*1*9= ', sum);
let rez = sum ** deg;
console.log('1296^3=', rez);
console.log(String(rez).slice(0,2));
