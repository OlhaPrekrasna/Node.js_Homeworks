// Задание 1

function calculateTotal(
  price: number,
  quantity: number,
  discount: number = 0
): number {
  const total = price * quantity;
  const discounted = total - (total * discount) / 100;
  return discounted;
}

console.log(calculateTotal(100, 2));
console.log(calculateTotal(100, 2, 10));

// Задание 2
let id: string | number;

function displayId(id: string | number): void {
  if (typeof id === 'string') {
    console.log(`ID: ${id.toUpperCase()}`);
  } else {
    console.log(`ID: ${id * 10}`);
  }
}

id = 'gdgddjshjsakldmdnsje';
displayId(id);

id = 7;
displayId(id);

// Задание 3

type OrderStatus = 'pending' | 'shipped' | 'delivered';

interface Order {
  orderId: string;
  amount: number;
  status: OrderStatus;
}

const orders: Order[] = [
  { orderId: '1', amount: 150, status: 'pending' },
  { orderId: '2', amount: 250, status: 'shipped' },
  { orderId: '3', amount: 400, status: 'delivered' },
  { orderId: '4', amount: 800, status: 'pending' },
];

function filterOrdersByStatus(orders: Order[], status: OrderStatus): Order[] {
  return orders.filter((order) => order.status === status);
}

console.log(filterOrdersByStatus(orders, 'pending'));

// Задание 4

type ProductInfo = [string, number, number];

const productInfo: ProductInfo = ['Orange', 12, 5];

type Inventory = {
  [key: string]: number;
};

function updateStock(inventory: Inventory, product: ProductInfo): Inventory {
  const [name, price, quantity] = product;
  if (inventory[name]) {
    inventory[name] += quantity;
  } else {
    inventory[name] = quantity;
  }
  return inventory;
}

let inventory: Inventory = {
  Orange: 10,
  Apple: 3,
};

console.log(updateStock(inventory, productInfo));

