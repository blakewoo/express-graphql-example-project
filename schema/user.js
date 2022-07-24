let test =require('graphql-tools');
let resolvers =require('../resolver/user_resolver');

const typeDefs = `
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        phoneNumber: String!
        joinPath: String!
        paymentPlan: ID!
        paymentSetting: ID!
    }

    type Query {
        allUser: [User]
    }
    
    input UserInput {
        firstName: String!
        lastName: String!
        phoneNumber: String!
        joinPath: String!
    }

    type Mutation {
        createUser(input: UserInput): User
    }
`;

const schema = test.makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports =  schema;