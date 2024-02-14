import { buildSchema } from "graphql";
export const GraphqlSchema = buildSchema(`

    type User{
        id:ID!,
        name:String!,
        email:String!,
        password:String!
    }
    
    type UserResponse{
        data:User,
    message: String
    status: Int
    token: String
    }
    input getUserInput{
        id:String!
    }
    input createUserInput{
        name:String!,
        email:String!,
        password:String!
    }
    input updateUserInput{
        id:String!,
        name:String!,
        email:String!
    }
    input loginUserInput{
        email:String!,
        password:String!
    }
    type Query{
        getAllUser:[User]
        getUser(input:getUserInput):UserResponse 
    }
    type Mutation{
        createUser(input:createUserInput):UserResponse
        loginUser(input:loginUserInput):UserResponse
        updateUser(input:updateUserInput):UserResponse
        deleteUser(input:getUserInput):UserResponse
    }
    `);
