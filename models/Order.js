import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    table_number: { type: String, required: true },
    items: [
      {
        menu_item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
        name: String,
        price_per_unit: Number,
        quantity: { type: Number, required: true },
        subtotal: Number,
        special_instructions: String,
      },
    ],
    total_amount: { type: Number, required: true },
    payment_slip_url: { type: String }, // Base64 string for simplicity as per blueprint
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Served", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
