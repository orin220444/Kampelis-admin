const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  firstname: String,
});
const User = mongoose.model('User', userSchema);
Module.exports = {
  User,
};
