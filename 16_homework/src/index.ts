// Задание 1

function greetUser(name: string): void {
  console.log(`Hello, ${name}!`);
}
greetUser('Bob');

// Задание 2

interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log(`Name: ${person.name}, Age: ${person.age}, City: ${person.city}`);
}

const person: Person = { name: 'Eva', age: 25, city: 'Berlin' };
printPersonInfo(person);

// Задание 3

function squareNumber(num: number): number {
  return num * num;
}

console.log(squareNumber(12));

// Задание 4

function isEven(num: number): boolean {
  return num % 2 === 0;
}

console.log(isEven(8));
console.log(isEven(9));

// Задание 5
interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log(`Student: ${student.name}, Grade: ${student.grade}`);
}

const student: Student = { name: 'Daniel', grade: 5 };
printStudentInfo(student);

// Задание 6
function logMessage(message: string): void {
  console.log(message);
}

logMessage('Some text');
