import * as Interfaces from '../interfaces';

class UniversityLibrarian implements Interfaces.Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(customerName): void {
    console.log(`${this.name} is assisting ${customerName}`);
  }
}

export { UniversityLibrarian };
