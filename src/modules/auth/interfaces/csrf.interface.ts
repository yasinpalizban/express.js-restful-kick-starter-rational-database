export declare interface CSRfInterface {


  initCsrf(): string;

  generateCsrf(): string;

  validationCsrf(token: String): boolean;

}
