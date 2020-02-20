import * as Interfaces from '../interfaces';
import { sealed, logger, writable } from '../decorators';

@sealed('UniversityLibrarian')
@logger
class UniversityLibrarian implements Interfaces.Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(customerName): void {
    console.log(`${this.name} is assisting ${customerName}`);
  }

  @writable(true)
  assistFaculty() {
    console.log(`Assisting Faculty`);
  }

  @writable(false)
  teachCommunity() {
    console.log(`Teaching community`);
  }
}

export { UniversityLibrarian };
