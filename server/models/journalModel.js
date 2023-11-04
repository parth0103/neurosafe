import mongoose from 'mongoose';
const journalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    emotions: {
      type: Array,
    },
    createdAt: {
      type: Date,
    },
    type: 'journal_entry',
  },
  {
    timestamps: true,
  }
);
export default Journal = mongoose.model('Journal', journalSchema);
