let User = require('../model/accountInfo');
const resolvers = {
    Query: {
        async allUser() {
            return await User.find();
        }
    },
    Mutation: {
        async createUser(root,{input}) {
            return await User.create(input);
        },

        async updateUser(root,{updateValue}) {
            let updateQuery = {}
            if(updateValue.firstName) {
                updateQuery.firstName = updateValue.firstName
            }

            if(updateValue.lastName) {
                updateQuery.lastName = updateValue.lastName
            }

            if (updateValue.phoneNumber) {
                updateQuery.phoneNumber = updateValue.phoneNumber
            }

            if(updateValue.joinPath) {
                updateQuery.joinPath = updateValue.joinPath
            }

            try{
                await User.updateOne({email:updateValue.email},updateQuery)
                return await User.findOne({email:updateValue.email});
            }
            catch(e) {
                return await User.findOne({email:updateValue.email});
            }
        },

        async deleteUser(root,{deleteValue}) {
            try{
                await User.deleteOne({email:deleteValue.email})
                return true
            }
            catch(e) {
                console.log(e)
                return false
            }
        }

    }
}

module.exports = resolvers