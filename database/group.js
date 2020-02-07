mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const groupSchema = new Schema({
  group_id: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },
  rules: {
    type: String,
    default: '',
  },
  gifs: {
    type: Array,
    default: [],
  },
  title: String,
});
const Group = mongoose.model('Group', groupSchema);
module.exports = {
  Group,
};
