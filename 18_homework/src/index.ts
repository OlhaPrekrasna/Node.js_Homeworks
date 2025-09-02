// Task_1

type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: 'John',
  permissions: ['read', 'write', 'delete'],
  email: 'john@example.com',
};

console.log(adminUser);

// Task_2

type Car = {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number;
};

const myCar: Car = {
  make: 'BMW',
  model: 'X5',
  engine: {
    type: 'Petrol',
    horsepower: 132,
  },
  year: 2023,
};

function printCarInfo(car: Car): void {
  console.log(`Марка: ${car.make}, Модель: ${car.model}`);
  console.log(
    `Двигатель: ${car.engine.type}, Мощность: ${car.engine.horsepower}`
  );
  if (car.year) {
    console.log(`Год выпуска: ${car.year}`);
  }
}

printCarInfo(myCar);

// Task_3

interface Product {
  name: string;
  price: number;
}

interface CalculateDiscount {
  (product: Product, discount: number): number;
}

const calculateDiscount: CalculateDiscount = (product, discount) => {
  return product.price - (product.price * discount) / 100;
};

const product: Product = { name: 'BMW', price: 100000 };
console.log(calculateDiscount(product, 10));

// Task_4

interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { name: 'Daniel', salary: 3000 },
  { name: 'Eva', salary: 4000 },
  { name: 'Jonny', salary: 5000 },
];

function getSalaries(employees: Employee[]): number[] {
  return employees.map((emp) => emp.salary);
}

console.log(getSalaries(employees));

// Task_5

interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  firstName: 'Daniel',
  lastName: 'Reynolds',
  grade: 98,
};

function printStudentInfo(student: Student): void {
  console.log(
    `Student: ${student.firstName} ${student.lastName}, Grade: ${student.grade}`
  );
}

printStudentInfo(student);

// Task_6

interface ConcatStrings {
  (str1: string, str2: string): string;
}

const concatStrings: ConcatStrings = (str1, str2) => {
  return str1 + str2;
};

console.log(concatStrings('Hello, ', 'World!'));
