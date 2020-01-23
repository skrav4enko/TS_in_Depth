showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

// =====================================
// Task 02.01
// =====================================

enum Category { JavaScript, CSS, HTML, TypeScript, Angular };

function getAllBooks(): readonly object[] {
  const books = <const>[
    { title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true},
    { title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
    { title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
    { title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
  ];

  return books;
}

function logFirstAvailable(books: readonly object[]): void {
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

function getBookTitlesByCategory(category: Category): Array<string> {
  const books = getAllBooks();
  const titles: string[] = [];

  for (const book of books) {
    if ((book as any).category === category) {
      titles.push(book['title']);
      break;
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

logFirstAvailable(getAllBooks());

const titles = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(titles);

const book = getBookAuthorByIndex(3);
console.log(book);

console.log(calcTotalPages());
