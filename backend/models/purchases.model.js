import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const PurchaseModel = mongoose.model("Purchase", purchaseSchema);
