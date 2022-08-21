let test =require('graphql-tools');
let resolvers =require('../resolver/login_resolver');

const typeDefs = `
    type Query{
        dummy:String
    }

    type Mutation {
        verifyAdminUser(verifyTarget: IdAndPassword) : Boolean
        adminUserInsertion(addAdminUser: adminUserData) : Boolean
    }
    
    input IdAndPassword{
        Id:String!
        Password:String!
    }
    
    input adminUserData{
        Id: String!
        Password: String!
        Email: String!
    }
`;

const schema = test.makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports =  schema;