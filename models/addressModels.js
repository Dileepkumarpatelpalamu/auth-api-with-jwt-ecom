import mongoose from "mongoose";
import User from "./userModel.js";
const AddressSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: User,
    required: true,
    unique: true,
  },
  address:{
    type:Array,
    required:true,
  }
});
const Address = mongoose.model('Address',AddressSchema);
export default Address
