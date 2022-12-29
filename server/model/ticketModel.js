const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  product: {
    type: String,
    required: [true, "Please select a product"],
    enum: ["iphone", "Mac", "imac", "ipad"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  status: {
    type: String,
    required: true,
    enum: ["new", "open", "closed"],
    default: "new",
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
