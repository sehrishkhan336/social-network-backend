const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // use regex to validate correct email format
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'],
    },
    thoughts: [
      {
        type: Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports = userSchema;
