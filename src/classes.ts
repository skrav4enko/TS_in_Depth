import * as Interfaces from './interfaces';

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

class UniversityLibrarian implements Interfaces.Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(customerName): void {
    console.log(`${this.name} is assisting ${customerName}`);
  }
}

export { ReferenceItem, UniversityLibrarian };
