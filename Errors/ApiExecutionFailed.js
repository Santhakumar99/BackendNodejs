class ApiExecutionFailed extends Error {
  constructor(status, payload) {
    super(payload);

    this.name = this.constructor.name;
    this.status = status;
    this.payload = payload;
  }

  statusCode() {
    return this.status;
  }
}
module.exports = ApiExecutionFailed;
