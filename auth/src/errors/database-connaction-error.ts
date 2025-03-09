export class DatabaseConnactionError extends Error {
  reason = "Error connacting to database";

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnactionError.prototype);
  }
}
