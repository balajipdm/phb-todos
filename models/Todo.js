import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String,
    required: true
  },
  responsible: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    default: 'Low'
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('todo', TodoSchema);
