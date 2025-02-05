import mongoose from "mongoose";

const connectdb = async () => {
    const cluster = process.env.MONGO_URI || 'mongodb+srv://vigneshvicky07971:CfThkrBeZtLdQEf8@vickynull.jqd9i.mongodb.net/Addpoints?retryWrites=true&w=majority&appName=vickynull'
    const connectingStirng: string = process.env.DB || 'mongodb://localhost:27017/nullclas'
    //console.log(cluster)
    try {
        await mongoose.connect(cluster)
        console.log("db connecting succesfully")

    } catch (error) {
        console.log("db error")
        console.log(error)
        process.exit(1)

    }

}

export default connectdb