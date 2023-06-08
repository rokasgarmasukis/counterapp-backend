const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    goal: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Counter', counterSchema);
