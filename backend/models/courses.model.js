import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    //// TODO: add more categories and maybe move access to purchase schema
    access: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CourseModel = mongoose.model("Course", courseSchema);
