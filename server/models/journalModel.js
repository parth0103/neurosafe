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
    // createdAt: {
    //   type: Date,
    // },
    sentiment: {
      type: String,
      default: 'sad',
    },
    type: {
      type: String,
      default: 'journal_entry',
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Journal', journalSchema);
