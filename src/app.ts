import { PersonBook, BookRequiredFields, UpdatedBook, CreateCustomerFunctionType } from './types';
import { Category } from './enums';
import { getAllBooks, purge, createCustomer } from './functions';
import { Logger, Book, Magazine } from './interfaces';
import { RefBook, ReferenceItem, Shelf } from './classes';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
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

// const logDamage: Logger = (reason: string) => console.log(`Damage: ${reason}`);
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
// const refBook = new RefBook('Hello, TypeScript', 2020, 2);
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

// const personBook: PersonBook = {
//   name: 'Anna',
//   email: 'anna@gmail.com',
//   id: 1,
//   title: 'Some book',
//   author: 'Author',
//   available: true,
//   category: Category.Angular,
// };
// console.log(personBook);

// =====================================
// Task 06.05
// =====================================

// import('./classes').then(module => {
//     const reader = new module.Reader();

//     reader.name = 'Anna';
//     reader.take(getAllBooks()[0]);

//     console.log(reader);
// });

// =====================================
// Task 07.01
// =====================================

const inventory: Array<Book> = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

// let result = purge<any>(inventory);
// console.log(result);

// const result2 = purge([1, 2, 3, 4]);
// console.log(result2);

// =====================================
// Task 07.02
// =====================================

// const bookShelf = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));
// const firstBook = bookShelf.getFirst();
// console.log(firstBook.title);

// const magazines: Array<Magazine> = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' }
// ];

// const magazinesShelf = new Shelf<Magazine>();
// magazines.forEach(magazine => magazinesShelf.add(magazine));
// const firstMagazines = magazinesShelf.getFirst();
// console.log(firstMagazines.title);

// =====================================
// Task 07.03
// =====================================

// magazinesShelf.printTitle();
// console.log(magazinesShelf.find('Five Points'));

// =====================================
// Task 07.04
// =====================================

// const book: BookRequiredFields = {
//   id: 1,
//   author: 'Vitaliy',
//   available: false,
//   category: Category.HTML,
//   title: 'Some Title',
//   pages: 200,
//   markDamaged: null
// }

// const updatedBook: UpdatedBook = {
//   id: 2,
//   title: 'New Some Title'
// };

const params: Parameters<CreateCustomerFunctionType> = ['Anna', 30];
createCustomer(...params);

