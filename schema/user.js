let test =require('graphql-tools');
let resolvers =require('../resolver/user_resolver');

const typeDefs = `
    type Query {
        allUser: [User]
    }
    
    type Mutation {
        createUser(input: UserInput): User
        updateUser(updateValue: modifyUser): User
        deleteUser(deleteValue: deleteUser): Boolean
    }
    
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

   
    input UserInput {
        firstName: String!
        lastName: String!
        email:String!
        phoneNumber: String
        joinPath: String
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
`;

const schema = test.makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports =  schema;