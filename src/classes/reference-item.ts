import { timeout } from '../decorators';

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

  @timeout()
  printItem(): void {
    console.log(`${this.title} was published in ${this.year}`);
    console.log(`Department: ${ReferenceItem.department}`);
  }

  abstract printCitation(): void;
}

export { ReferenceItem };
