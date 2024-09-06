import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        email:{type :String, required :true},
        password:{type:String, required:false},
    },
    {timestamps:true}
);

const User= mongoose.models.User || mongoose.model("Buyer-vijay", userSchema);

export default BuyerModel;