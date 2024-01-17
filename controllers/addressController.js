import Address from "../models/addressModels.js";
import addressValidation from "../validatiors/addressValidator.js";
import CustomErrorHandler from "../services/customErrorHandler.js";
class UserAddress {
  static async add_address(req, res, next) {
    const {user,address,role} = req.body;
    const { error } = addressValidation.validate({user,address});
    if (error) return next(error);
    const addressObject = new Address({user,address});
    try {
      let userExist = await Address.findOne({ user: req.body.user });
      if (userExist) {
        const addressArray = [];
        for (let i = 0; i < userExist.address.length; i++) {
          addressArray.push(userExist.address[i]);
        }
        addressArray.push(address);
        let addressResponse = "";
        if(role === "agent"){
            addressResponse = await Address.findOneAndUpdate({user:req.body._id},{$set:{address:addressArray}},{new:true}).select("-__v");
        }
        else if(role === "admin"){
            addressResponse = await Address.findOneAndUpdate({user:req.body.user},{$set:{address:addressArray}},{new:true}).select("-__v");
        }
        else{
            return res.status(401).send({message: "Agent can't be allowed.."}).json();
        }
        return res
          .status(201)
          .send({
            message: "Address updated successfully.",
            data: addressResponse,
          })
          .json();
      } else {
        const addressResponse = await addressObject.save();
        return res
          .status(201)
          .send({
            message: "Address added successfully.",
            data: addressResponse,
          })
          .json();
      }
    } catch (err) {
        console.log(err);
      return next(err);
    }
  }
  static async update_address(req, res, next) {
    const {user,address,role} = req.body;
    const { error } = addressValidation.validate({user,address});
    if (error) return next(error);
    try {
      let userExist = await Address.findOne({ user: req.body.user });
      if (userExist) {
        let addressResponse = "";
        if(role === "agent"){
            addressResponse = await Address.findOneAndUpdate({user:req.body._id},{$set:{address:address}},{new:true}).select("-__v");
        }
        else if(role === "admin"){
            addressResponse = await Address.findOneAndUpdate({user:req.body.user},{$set:{address:address}},{new:true}).select("-__v");
        }
        else{
            return res.status(401).send({message: "Agent can't be allowed.."}).json();
        }
        return res
          .status(201)
          .send({
            message: "Address updated successfully.",
            data: addressResponse,
          })
          .json();
      } else {
        return next(CustomErrorHandler.invalidToken("Invalid address user id"))
      }
    } catch (err) {
        console.log(err);
      return next(err);
    }
  }
  static async delete_address(req, res, next) {
      try {
        const {user,role} = req.body;
        let addressResponse = "";
        if(role === "agent"){
            addressResponse = await Address.findOneAndDelete({ user: req.body._id })
            .select('_id user');
        }
        else if(role === "admin"){
            addressResponse = await Address.findOneAndDelete({user:user}).select("_id user");
        }
        else{
            return res.status(401).send({message: "Agent can't be allowed.."}).json();
        }
        return res
          .status(200)
          .send({
            message:  addressResponse ? "Address deleted successfully..":"User id not valid",
            data : addressResponse ? addressResponse : []
          })
          .json();
    } catch (err) {
        console.log(err);
      return next(err);
    }
  }
  static async get_address(req, res, next) {
    try {
        if (req.params.user === "" || req.params.user === undefined){
            return next(CustomErrorHandler.requiredParameterMissing());
        }
      const {role} = req.body;
      let addressResponse = "";
      if(role === "agent"){
          addressResponse = await Address.findOne({ user: req.body._id }).select("_id user address");
      }
      else if(role === "admin"){
        addressResponse = await Address.findOne({ user: req.params.user }).select("_id user address");
      }
      else{
          return res.status(401).send({message: "Agent can't be allowed.."}).json();
      }
      return res
        .status(200)
        .send({
          message:  addressResponse ? "Address details..":"User id not valid",
          data : addressResponse ? addressResponse : []
        })
        .json();
  } catch (err) {
      console.log(err);
    return next(err);
  }
  }
}
export default UserAddress;
