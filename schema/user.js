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
        planToUser(mappingValue: planWithUser): Boolean
        verifyAdminUser(verifyTarget: IdAndPassword) : Boolean
        adminUserInsertion(addAdminUser: adminUserData) : Boolean
    }
    
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        phoneNumber: String
        joinPath: String
        paymentPlan: paymentPlan
        paymentSetting: ID
    }
    
    type paymentPlan {
        _id: ID
        name: String
        monthlyCostPerPerson : Int
        isFirstFunctionOpen : Boolean
        isSecondFunctionOpen : Boolean
        isThirdFunctionOpen : Boolean
        isForthFunctionOpen : Boolean
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
        email: String
        phoneNumber: String
        joinPath: String
    }
    
    input planWithUser{
        email:String!
        name: String!
    }
    
    input IdAndPassword{
        id:String!
        password:String!
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