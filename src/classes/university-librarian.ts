import * as Interfaces from '../interfaces';
import {
  sealed,
  logger,
  writable,
  logMethod,
  logParameter,
  format
} from '../decorators';

@sealed('UniversityLibrarian')
@logger
class UniversityLibrarian implements Interfaces.Librarian {
  @format() name: string;
  email: string;
  department: string;

  @logMethod
  assistCustomer(@logParameter customerName: string): void {
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
