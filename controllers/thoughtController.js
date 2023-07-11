
const { User, Thought, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user by thought
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions')

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {username: req.body.username},
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'thought created but no user was found with ID' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }
      const user = await User.findOneAndUpdate(
        {username: thought.username},
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'thought deleted but no user was found with ID' });
      }
      // await Thought.deleteMany({ username: user.username });
      // await User.updateMany(
      //   { _id: { $in: user.friends } },
      //   { $pull: { friends: req.params.userId } }
      // );

      res.json({ message: 'thoughts and associated deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err).message;
    }
  },
  // Remove reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId} } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

