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
});
const User = mongoose.model('User', userSchema);
module.exports = {
  User,
};
