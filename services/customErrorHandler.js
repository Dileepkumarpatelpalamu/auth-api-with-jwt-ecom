class CustomErrorHandler extends Error {
    constructor(status, message) {
      super();
      this.statusCode = status;
      this.message = message;
    }
    static alreadyExits(message){
      return new CustomErrorHandler(409,message);
    }
    static userNotExits(message="Wrong email or password..!"){
        return new CustomErrorHandler(401,message);
    }
    static incorrectPassword(message="Invalid email or password..!"){
        return new CustomErrorHandler(401,message);
    }
    static invalidToken(message="Invalid Token..!"){
        return new CustomErrorHandler(401,message);
    }
    static missingRefreshToken(message="Refresh token missing or invalid refresh token"){
        return new CustomErrorHandler(401,message);
    }
    static onlyAdminAllowed(message="Only admin allows to access..!"){
        return new CustomErrorHandler(401,message);
    }
    static requiredParameterMissing(message="Required parameter missing..!"){
        return new CustomErrorHandler(401,message);
    }
  }
  export default CustomErrorHandler