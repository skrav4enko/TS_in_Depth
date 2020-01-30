showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

// =====================================
// Task 02.01
// =====================================

enum Category { JavaScript, CSS, HTML, TypeScript, Angular };

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category: Category;
}

function getAllBooks(): readonly Book[] {
  const books: readonly Book[] = <const>[
    { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true},
    { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
    { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
    { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
  ];

  return books;
}

function logFirstAvailable(books: readonly object[] = getAllBooks()): void {
  const numOfBooks: number = books.length;
  let title: string = '';

  for (const book of books) {
    if (book['available']) {
      title = book['title'];
      break;
    }
  }

  console.log(`Total number of books: ${numOfBooks}`);
  console.log(`First available book: ${title}`);
}

function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
  const books = getAllBooks();
  const titles: string[] = [];

  for (const book of books) {
    if ((book as any).category === category) {
      titles.push(book['title']);
    }
  }

  return titles;
}

function logBookTitles(titles: string[]): void {
  titles.forEach((title: string) => console.log(title));
}

function getBookAuthorByIndex(index: number): [string, string] {
  const books = getAllBooks();
  const { title, author } = books[index] as any;

  return [title, author];
}

function calcTotalPages(): bigint {
  const data = <const>[
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
  ];

  const result = data.reduce((acc: bigint, obj: any) => {
    return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
  }, 0n)

  return result;
}

// logFirstAvailable(getAllBooks());

// const titles = getBookTitlesByCategory(Category.JavaScript);
// logBookTitles(titles);

// const book = getBookAuthorByIndex(3);
// console.log(book);

// console.log(calcTotalPages());


// =====================================
// Task 03.01
// =====================================

function getBookById(id: number): object | undefined {
  const books = getAllBooks();
  return books.find(book => book['id'] === id);
}

const titles = getBookTitlesByCategory(Category.JavaScript);
// titles.forEach((title: string) => console.log(title));

const book = getBookById(1);
// console.log(book);

// =====================================
// Task 03.02
// =====================================

function createCustomerId(name: string, id: number): string {
  return `${name}${id}`;
}

let myId = createCustomerId('Ann', 10);
// console.log(myId);

let idGenerator: (name: string, id: number) => string;
idGenerator = createCustomerId;

myId = idGenerator('Boris', 20);
// console.log(myId);

idGenerator = (name: string, id: number) => `${id}${name}`;
myId = idGenerator('Clara', 25);
// console.log(myId);

// =====================================
// Task 03.03
// =====================================

function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Creating customer ${name}`);

  if (age) {
    console.log(`Age: ${age}`);
  }

  if (city) {
    console.log(`City: ${city}`);
  }
}

// createCustomer('Ann');
// createCustomer('Boris', 30);
// createCustomer('Clara', 20, 'Manchester');

const books = getBookTitlesByCategory();
// console.log(books);

// logFirstAvailable();

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
  console.log(`Checking out books for ${customer}`);

  const titles: string[] = [];

  for (const id of bookIDs) {
    const book: any = getBookById(id);

    if (book && book.available) {
      titles.push(book.title);
    }
  }

  return titles;
}

const myBooks = checkoutBooks('Anna', 1, 2, 4);
// console.log(myBooks);

// =====================================
// Task 03.04
// =====================================

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: any[]): string[] {
  const books: ReadonlyArray<any> = getAllBooks();

  if (args.length === 0) {
    return [];
  }
  else if (args.length === 1) {
    const [arg] = args;

    if (typeof arg === 'string') {
      return books.filter(book => books['author'] === arg).map(book => book.title);
    }
    else if (typeof arg === 'boolean') {
      return books.filter(book => books['available'] === arg).map(book => book.title);
    }
  }
  else if (args.length === 2) {
    const [id, available] = args;

    if (typeof id === 'number' && typeof available === 'boolean') {
      return books.filter(book => books['id'] === id && books['available'] === available).map(book => book.title);
    }
  }
}

const checkedOutBooks = getTitles(false);
// console.log(checkedOutBooks);

// =====================================
// Task 03.05
// =====================================

function assertStringValue(val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error('value should have been a string');
  }
}

function booksTitleTransform(title:any): string {
  assertStringValue(title);

  return [...title].reverse().join('');
}

const title1 = booksTitleTransform((getAllBooks()[0] as any).title);
console.log(title1);
const title2 = booksTitleTransform((getAllBooks()[0] as any).id);
console.log(title2);


// =====================================
// Task 04.01
// =====================================

function printBook(book: Book): void {
  console.log(`${book.title} by ${book.author}`);
}
