let User = require('../model/accountInfo');
let paymentPlanObj = require('../model/paymentPlan')
const resolvers = {
    Query: {
        async allUser() {
            return await User.find();
        },
        async User(root,{firstName}) {
            return await User.findOne({firstName:firstName});
        },
        async getPaymentPlan(root,{email}) {
            let emailUser = await User.findOne({email:email})
            return await paymentPlanObj.findOne({_id: emailUser._id});
        }
    },
    Mutation: {
        async createPaymentPlan(root,{input}) {
            return await paymentPlanObj.create(input);
        },

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

            await User.updateOne({email:updateValue.email},updateQuery)
            return await User.findOne({email:updateValue.email});
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

    } // new
}

module.exports = resolvers