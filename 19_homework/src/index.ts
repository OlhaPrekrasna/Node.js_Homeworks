// Task_1

// Напишите стрелочную функцию `sumEvenNumbers`, которая принимает массив чисел и возвращает сумму всех четных чисел.
const sumEvenNumbers = (numbers: number[]): number => {
  return numbers
    .filter((num) => num % 2 === 0)
    .reduce((sum, num) => sum + num, 0);
};

console.log(sumEvenNumbers([11, 28, 16, 41, 5, 26]));

// Task_2

// Определите интерфейс `StringToBooleanFunction` для функции, которая принимает строку и возвращает `boolean` (например, проверяет, является ли строка пустой). Реализуйте такую функцию.
interface StringToBooleanFunction {
  (str: string): boolean;
}

const isEmpty: StringToBooleanFunction = (str) => {
  return str.length === 0;
};

console.log(isEmpty(''));
console.log(isEmpty('testing'));

// Task_3

// Создайте тип `CompareStrings` для функции, принимающей две строки и возвращающей `boolean` (например, для проверки равенства строк). Напишите функцию, соответствующую этому типу.

type CompareStrings = (name1: string, name2: string) => boolean;

const areStringsEqual: CompareStrings = (name1, name2) => {
  return name1 === name2;
};

console.log(areStringsEqual('Bob', 'Bob'));
console.log(areStringsEqual('TypeScript', 'JavaScript'));

// Task_4
// Напишите обобщенную функцию `getLastElement`, которая принимает массив любого типа и возвращает последний элемент этого массива.

function getLastElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

console.log(getLastElement([5, 12, 18]));
console.log(getLastElement(['Eva', 'Stella', 'Niki']));
console.log(getLastElement([]));

// Task_5

// Создайте обобщенную функцию `make Triple`, которая принимает три аргумента одного типа и возвращает массив из этих трёх элементов.
function makeTriple<T>(a: T, b: T, c: T): T[] {
  return [a, b, c];
}

console.log(makeTriple('JS', 'C#', 'PHP'));
console.log(makeTriple(1, 2, 3));
console.log(makeTriple(true, false, true));
