const mongoose = require("mongoose");

//if type 'sell' then require price

const PostSchema = new mongoose.Schema({
  title: {
    type: String, required: [true, 'Title is required'],
    minlength: [2, 'Title must be 2 or more characters']
  },
  type: { type: String, required: true },
  zipcode: { type: Number, required: [true, 'Zipcode is required'], },
  price: {
    type: Number,
    required: [function () {
      return this.type === "sell";
    },
      "Price is required"]
  },
  description: {
    type: String, required: [true, 'Description is required'],
    minlength: [10, 'Description must be 10 or more characters']
  },
  category: { type: String, required: true },
  email: { type: String, required: [true, 'Email is required'] },
});

module.exports = mongoose.model("Post", PostSchema);
