let User = require('../model/accountInfo');
const resolvers = {
    Query: {
        async allUser() {
            return await User.find();
        }
    },
    Mutation: {
        async createUser(root, { input }) {
            return await User.create(input);
        }
    } // new
}

module.exports = resolvers