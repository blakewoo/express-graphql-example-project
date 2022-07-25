let test =require('graphql-tools');
let resolvers =require('../resolver/user_resolver');

const typeDefs = `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email:String!
        phoneNumber: String
        joinPath: String
        paymentPlan: ID
        paymentSetting: ID
    }

    type Query {
        allUser: [User]
        User(firstName:String!):User
        getPaymentPlan(input: UserInput):User
    }
   
    input UserInput {
        firstName: String!
        lastName: String!
        email:String!
        phoneNumber: String
        joinPath: String
    }
    
    type PaymentPlan{
        name: String!
        monthlyCostPerPerson : Int!
        isFirstFunctionOpen : Boolean!
        isSecondFunctionOpen : Boolean!
        isThirdFunctionOpen : Boolean!
        isForthFunctionOpen : Boolean!
    }
    
    input PaymentPlanInput {
        name: String
        monthlyCostPerPerson : Int
        isFirstFunctionOpen : Boolean
        isSecondFunctionOpen : Boolean
        isThirdFunctionOpen : Boolean
        isForthFunctionOpen : Boolean
    }
    
    input name{
        firstName: String
        lastName: String
    }
    
    input deleteUser {
        email: String
    }
    
    input modifyUser{
        firstName: String
        lastName: String
        email:String
        phoneNumber: String
        joinPath: String
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(updateValue: modifyUser): User
        deleteUser(deleteValue: deleteUser): Boolean
        createPaymentPlan(input:PaymentPlanInput) : PaymentPlan
        
    }
`;

const schema = test.makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports =  schema;