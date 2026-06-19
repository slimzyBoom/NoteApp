import mongoose, { Schema, Document } from "mongoose";
import z from "zod"

export interface ICategory extends Document {
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true
  }
});



export default mongoose.model<ICategory>("Category", CategorySchema)