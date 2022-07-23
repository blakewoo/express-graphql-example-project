let user = require('../model/accountInfo');
const resolvers = {
    Query: {
        async allUser() {
            return await user.find();
        }
    }
}

module.exports = resolvers