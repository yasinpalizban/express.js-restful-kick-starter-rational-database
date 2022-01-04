import { CSRfInterface } from '../interfaces/csrf.interface';

export class CSRF implements CSRfInterface {
  constructor() {
  }

  generateCsrf(): string {

    return "";
  }

  initCsrf(): string {
    return "";
  }

  validationCsrf(token: String): boolean {
    return false;
  }
}
