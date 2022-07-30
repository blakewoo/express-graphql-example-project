let paymentPlan = require('../model/paymentPlan');
const resolvers = {
    Query: {
        async allPlan() {
            return await paymentPlan.find();
        }
    },
    Mutation: {
        async createPlan(root,{input}) {
            return await paymentPlan.create(input);
        },

        async updatePlan(root,{updateValue}) {
            try{
                let updateQuery = {}
                updateQuery.monthlyCostPerPerson = updateValue.monthlyCostPerPerson
                updateQuery.isFirstFunctionOpen = updateValue.isFirstFunctionOpen
                updateQuery.isSecondFunctionOpen = updateValue.isSecondFunctionOpen
                updateQuery.isThirdFunctionOpen = updateValue.isThirdFunctionOpen
                updateQuery.isForthFunctionOpen = updateValue.isForthFunctionOpen

                await paymentPlan.updateOne({name:updateValue.name},updateQuery)
                return await paymentPlan.findOne({name:updateValue.name});
            }
            catch(e) {
                return await paymentPlan.findOne({name:updateValue.name});
            }
        },

        async deletePlan(root,{deleteValue}) {
            try{
                await paymentPlan.deleteOne({name:deleteValue.name})
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