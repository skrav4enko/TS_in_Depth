import { Book } from './interfaces';
import { Category } from './enums';
import { BookOrUndefined, BookProperties } from './types';

export function getAllBooks(): readonly Book[] {
  const books: readonly Book[] = <const>[
    { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true },
    { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
    { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
    { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
  ];

  return books;
}

export function logFirstAvailable(books: readonly object[] = getAllBooks()): void {
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

export function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
  const books = getAllBooks();
  const titles: string[] = [];

  for (const book of books) {
    if ((book as any).category === category) {
      titles.push(book['title']);
    }
  }

  return titles;
}

export function logBookTitles(titles: string[]): void {
  titles.forEach((title: string) => console.log(title));
}

export function getBookAuthorByIndex(index: number): [string, string] {
  const books = getAllBooks();
  const { title, author } = books[index] as any;

  return [title, author];
}

// export function calcTotalPages(): bigint {
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

export function getBookById(id: number): BookOrUndefined {
  const books = getAllBooks();
  return books.find(book => book['id'] === id);
}

export function createCustomerId(name: string, id: number): string {
  return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Creating customer ${name}`);

  if (age) {
    console.log(`Age: ${age}`);
  }

  if (city) {
    console.log(`City: ${city}`);
  }
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
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

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
  const books: ReadonlyArray<any> = getAllBooks();

  if (args.length === 0) {
    return [];
  }
  else if (args.length === 1) {
    const [arg] = args;

    if (typeof arg === 'string') {
      return books.filter(book => book['author'] === arg).map(book => book.title);
    }
    else if (typeof arg === 'boolean') {
      return books.filter(book => book['available'] === arg).map(book => book.title);
    }
  }
  else if (args.length === 2) {
    const [id, available] = args;

    if (typeof id === 'number' && typeof available === 'boolean') {
      return books.filter(book => book['id'] === id && book['available'] === available).map(book => book.title);
    }
  }
}

export function assertStringValue(val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw new Error('value should have been a string');
  }
}

export function booksTitleTransform(title: any): string {
  assertStringValue(title);

  return [...title].reverse().join('');
}

export function printBook(book: Book): void {
  console.log(`${book.title} by ${book.author}`);
}

export function getBookProp(book: Book, prop: BookProperties): any {
  if (typeof book[prop] === 'function') {
    return (book[prop] as Function).name;
  }

  return book[prop];
}
