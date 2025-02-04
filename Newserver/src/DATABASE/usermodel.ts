
import mongoose,{Schema,model} from "mongoose";

import { SubscriptionModel } from "./subscriptionModel";

 interface UserDocument extends Document {
    username: string;
    fullname: string;
    email: string;
    password: string;
    watchvidoes: mongoose.Types.ObjectId[];
   // following: mongoose.Types.ObjectId[];
    profileImg?: string;
    coverImg?: string;
    bio?: string;
    points:Number;
    subcription: mongoose.Types.ObjectId|SubscriptionModel
    //link?: string;
}



const userschema = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minLenth: 6,

    },
 watchvidoes: [
        {
            // type: mongoose.Schema.Types.ObjectId,
            type:String,
            //ref: "User",
            default:[]
        }
    ],
    points:{
        type:Number,
        default:0

    },
    // following: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //         default:[]
    //     }
    // ],
    profileImg:{
        type:String,
        default:""
    },
    coverImg:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    subcription:{
        type: mongoose.Schema.Types.ObjectId, // Reference to the Subscription model
        ref: "Subscription", // Ensure this is correctly referencing the Subscription model
        required: true
    }
   
},{timestamps:true}) //ethu vathu mongodb ea yappa lasta ha update pannaga eppa modify pannga nu ehuve oru infromation store pannikum



const User = mongoose.model<UserDocument>('User', userschema);  // Corrected line
export default User
export  type{ UserDocument}