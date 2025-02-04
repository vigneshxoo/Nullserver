import mongoose, { Schema, Document } from "mongoose";

// Subscription model interface
export interface SubscriptionModel extends Document {
    planname: String;
    startDate: Date;
    endDate: Date;
}

// Subscription schema
const subscriptionSchema = new Schema<SubscriptionModel>({
    planname: {
        type: String,
        enum: ["normal", "bronze", "gold"], 
        default: "normal",  
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    }
});

// Model definition
export const Subscription = mongoose.model<SubscriptionModel>("Subscription", subscriptionSchema);
