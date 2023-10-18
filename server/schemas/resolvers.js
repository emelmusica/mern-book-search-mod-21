const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      // Increment the votes for a specific technology in a matchup
      const updatedMatchup = await Matchup.findByIdAndUpdate(
        _id,
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );

      return updatedMatchup;
    },
  },
};

module.exports = resolvers;
