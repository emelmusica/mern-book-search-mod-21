const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    techs: async () => {
      return Tech.find({}); 
    },
    matchups: async (parent, { _id }) => {
      if (_id) {
        return Matchup.findById(_id); // Retrieve a single matchup by ID
      } else {
        return Matchup.find({}); // Retrieve all matchups
      }
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
