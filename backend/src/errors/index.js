class Errors extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
  static forbidden(message = "Access denied", stack = null) {
    return new Errors(403, message, stack);
  }
  static notFoundError(message = "Not found!", stack = null) {
    return new Errors(404, message, stack);
  }
  static conflictError(message = "conflict accrue", stack = null) {
    return new Errors(409, message, stack);
  }
  static validationError(message = "All fields are required!", stack = null) {
    return new Errors(422, message, stack);
  }
  static serverError(message = "Internal server error", stack = null) {
    return new Errors(500, message, stack);
  }

  //* --------------------- Authentication ------------------------
  static invalidRequestError(message = "Bad Request", stack = null) {
    return new Errors(400, message, stack);
  }
  static UnauthorizedError(message = "Invalid Credentials", stack = null) {
    return new Errors(401, message, stack);
  }
}

module.exports = Errors;
