const { User, Book } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args) => {
      return await User.findById(args.id);
    }
  },
  Mutation: {
    login: async (parent, { username, email, password }) => {
        const user = await User.findOne({
            $or: [{ username: username }, { email: email }],
          });
          if (!user) {
            return { message: "Can't find this user" };
          }
      
          const correctPw = await user.isCorrectPassword(password);
      
          if (!correctPw) {
            return { message: "Wrong password!" };
          }
          const token = signToken(user);
          return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({username, email, password});

        if (!user) {
          return { message: "Something is wrong!" };
        }
        const token = signToken(user);
        return {token, user};
    },
    saveBook: async(parent, {userId, authors, description, title, bookId, image, link }) => {
        return await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { savedBooks: {
                authors,
                description, 
                title,
                bookId,
                image,
                link
            } } },
            { new: true, runValidators: true }
          );
    },
    removeBook: async(parent, {userId, bookId}) => {
        return await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
    }
  }
};

module.exports = resolvers;