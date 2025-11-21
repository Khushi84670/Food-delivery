import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://khushijaiswal2289:84670@cluster0.tshmw5s.mongodb.net/food-del')
    .then(()=>console.log("DB connected"));
}
