import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course", 
        required: true 
    },

    amount: {
         type: Number, 
         required: true 
        },

    date: { type: Date, 
        default: Date.now 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);
