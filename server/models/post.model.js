const mongoose = require("mongoose");

//if type 'sell' then require price

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  zipcode: { type: Number, required: true },
  price: {
    type: Number,
    required: function () {
      return this.type === "sell";
    },
  },
  description: { type: String, required: true },
  category: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
