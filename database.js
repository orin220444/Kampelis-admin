import mongoose from 'mongoose';
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
  language: {
    type: String,
    default: 'ru',
  },
});
export const Group = mongoose.model('Group', groupSchema);
export const User = mongoose.model('User', userSchema);
