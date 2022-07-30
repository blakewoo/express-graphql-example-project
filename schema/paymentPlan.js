let test =require('graphql-tools');
let resolvers =require('../resolver/paymentPlan_resolver');

const typeDefs = `
    type paymentPlan {
        _id: ID!
        name: String!
        monthlyCostPerPerson : Int!
        isFirstFunctionOpen : Boolean!
        isSecondFunctionOpen : Boolean!
        isThirdFunctionOpen : Boolean!
        isForthFunctionOpen : Boolean! 
    }

    type Query {
        allPlan: [paymentPlan]
    }
   
    input createPlan {
        name: String!
        monthlyCostPerPerson : Int!
        isFirstFunctionOpen : Boolean!
        isSecondFunctionOpen : Boolean!
        isThirdFunctionOpen : Boolean!
        isForthFunctionOpen : Boolean! 
    }
    
    
    input modifyPlan{
        name: String!
        monthlyCostPerPerson : Int!
        isFirstFunctionOpen : Boolean!
        isSecondFunctionOpen : Boolean!
        isThirdFunctionOpen : Boolean!
        isForthFunctionOpen : Boolean! 
    }
    
    input deletePlan {
        name: String!
    }

    type Mutation {
        createPlan(input: createPlan): paymentPlan
        updatePlan(updateValue: modifyPlan): paymentPlan
        deletePlan(deleteValue: deletePlan): Boolean
    }
`;

const schema = test.makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports =  schema;