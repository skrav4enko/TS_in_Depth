// showHello('greeting', 'TypeScript');

// function showHello(divName: string, name: string) {
//   const elt = document.getElementById(divName);
//   elt.innerText = `Hello from ${name}`;
// }

// types & interfaces

enum Category { JavaScript, CSS, HTML, TypeScript, Angular };

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category?: Category;
  pages?: number;
  markDamaged?: DamageLogger;
}

interface DamageLogger {
  (reason: string): void;
}

interface Person {
  name: string;
  email: string;
}

interface Author extends Person {
  numBooksPublished: number;
}

interface Librarian extends Person {
  department: string;
  assistCustomer: (customerName: string) => void;
}

type BookProperties = keyof Book;

type PersonBook = Person & Book;

type BookOrUndefined = Book | undefined;


// Functions

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

// function calcTotalPages(): bigint {
//   const data = <const>[
//     { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
//     { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
//     { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
//   ];

//   const result = data.reduce((acc: bigint, obj: any) => {
//     return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
//   }, 0n)

//   return result;
// }

function getBookById(id: number): BookOrUndefined {
  const books = getAllBooks();
  return books.find(book => book['id'] === id);
}

function createCustomerId(name: string, id: number): string {
  return `${name}${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Creating customer ${name}`);

  if (age) {
    console.log(`Age: ${age}`);
  }

  if (city) {
    console.log(`City: ${city}`);
  }
}

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

function assertStringValue(val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error('value should have been a string');
  }
}

function booksTitleTransform(title:any): string {
  assertStringValue(title);

  return [...title].reverse().join('');
}

function printBook(book: Book): void {
  console.log(`${book.title} by ${book.author}`);
}

function getBookProp(book: Book, prop: BookProperties): any {
  if (typeof book[prop] === 'function') {
    return (book[prop] as Function).name;
  }

  return book[prop];
}

// Classes

abstract class ReferenceItem {
  // title: string;
  // year: number;
  private _publisher: string;
  static department: string = 'Research Dep';

  get publisher(): string {
    return this._publisher.toUpperCase();
  }
  set publisher(newPublisher) {
    this._publisher = newPublisher;
  }

  constructor(public title: string, protected year: number) {
    console.log('Creating a new ReferenceItem...');
    // this.title = newTitle;
    // this.year = newYear;
  }

  printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
  }

  abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
  constructor(newTitle: string, newYear: number, public edition: number) {
    super(newTitle, newYear);
  }
  printItem(): void {
    super.printItem();
    console.log(`Edition: ${this.edition} (${this.year})`);
  }

  printCitation(): void {
    console.log(`${this.title} - ${this.year}`);
  }
}

class UniversityLibrarian implements Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(customerName): void {
    console.log(`${this.name} is assisting ${customerName}`);
  }
}

// =====================================
// Task 02.01
// =====================================

// logFirstAvailable(getAllBooks());

// const titles = getBookTitlesByCategory(Category.JavaScript);
// logBookTitles(titles);

// const book = getBookAuthorByIndex(3);
// console.log(book);

// console.log(calcTotalPages());


// =====================================
// Task 03.01
// =====================================

// const titles = getBookTitlesByCategory(Category.JavaScript);
// titles.forEach((title: string) => console.log(title));

// const book = getBookById(1);
// console.log(book);

// =====================================
// Task 03.02
// =====================================

// let myId = createCustomerId('Ann', 10);
// console.log(myId);

// let idGenerator: (name: string, id: number) => string;
// idGenerator = createCustomerId;

// myId = idGenerator('Boris', 20);
// console.log(myId);

// idGenerator = (name: string, id: number) => `${id}${name}`;
// myId = idGenerator('Clara', 25);
// console.log(myId);

// =====================================
// Task 03.03
// =====================================

// createCustomer('Ann');
// createCustomer('Boris', 30);
// createCustomer('Clara', 20, 'Manchester');

// const books = getBookTitlesByCategory();
// console.log(books);

// logFirstAvailable();

// const myBooks = checkoutBooks('Anna', 1, 2, 4);
// console.log(myBooks);

// =====================================
// Task 03.04
// =====================================

// const checkedOutBooks = getTitles(false);
// console.log(checkedOutBooks);

// =====================================
// Task 03.05
// =====================================

// const title1 = booksTitleTransform((getAllBooks()[0] as any).title);
// console.log(title1);
// const title2 = booksTitleTransform((getAllBooks()[0] as any).id);
// console.log(title2);

// =====================================
// Task 04.01
// =====================================

// const myBook: Book = {
//   id: 5,
//   title: '',
//   author: 'string',
//   available: true,
//   category: Category.CSS,
//   pages: 200,
//   markDamaged: (reason: string) => {console.log(`Damage: ${reason}`)},
// }

// =====================================
// Task 04.02
// =====================================

// const logDamage: DamageLogger = (reason: string) => console.log(`Damage: ${reason}`);
// logDamage('missing back cover');

// =====================================
// Task 04.03
// =====================================

// const favoriteAuthor: Author = {
//   name: 'Ann',
//   email: 'ann@gmail.com',
//   numBooksPublished: 10
// }

// const favoriteLibrarian: Librarian = {
//   name: 'Boris',
//   email: 'boris@example.com',
//   department: 'Classical Literature',
//   assistCustomer(name: string) {
//     console.log(`Assist ${name}`);
//   },
// }

// =====================================
// Task 04.04
// =====================================

// const offer: any = {
//   book: {
//     title: 'Essential Typescript'
//   }
// }

// console.log(offer.paper?.magazine);

// =====================================
// Task 04.05
// =====================================

// console.log(getBookProp(getAllBooks()[0], 'title'));
// console.log(getBookProp(getAllBooks()[0], 'markDamaged'));
// console.log(getBookProp(getAllBooks()[0], 'isbn'));


// =====================================
// Task 05.01
// =====================================

// const ref = new ReferenceItem('Hello, TypeScript', 2020);
// ref.printItem();
// ref.publisher = 'Random Publisher';
// console.log(ref);
// console.log(ref.publisher);

// =====================================
// Task 05.02
// =====================================

// const refBook = new Encyclopedia('Hello, TypeScript', 2020, 2);
// refBook.printItem();
// console.log(refBook);

// =====================================
// Task 05.03
// =====================================

// const refBook = new Encyclopedia('Hello, TypeScript', 2020, 2);
// refBook.printCitation();
// console.log(refBook);

// =====================================
// Task 05.04
// =====================================

// const favoriteLibrarian: Librarian = new UniversityLibrarian();
// favoriteLibrarian.name = 'Ann';
// favoriteLibrarian.assistCustomer('Boris');

// =====================================
// Task 05.05
// =====================================

const personBook: PersonBook = {
  name: 'Anna',
  email: 'anna@gmail.com',
  id: 1,
  title: 'Some book',
  author: 'Author',
  available: true,
  category: Category.Angular,
}
