const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    counter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Item', counterSchema);
