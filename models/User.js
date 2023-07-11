const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
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
      //regex to validate correct email format
      match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
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
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
const User = model('User', UserSchema);
module.exports = User;
