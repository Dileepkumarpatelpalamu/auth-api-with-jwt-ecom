class CustomErrorHandler extends Error {
    constructor(status, message) {
      super();
      this.statusCode = status;
      this.message = message;
    }
    static alreadyExits(message){
      return new CustomErrorHandler(409,message);
    }
  }
  export default CustomErrorHandler