const { Schema, Types } = require('mongoose');
const moment = require('moment');

const formatTimestamp = timestamp => {
  return moment(timestamp).format('MMMM Do, YYYY [at] h:mm A');
};

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatTimestamp(timestamp)
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false, _id: false
  }
);

module.exports = reactionSchema;
