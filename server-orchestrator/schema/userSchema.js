const { gql, ApolloError } = require("apollo-server");
const redis = require("../helpers/redis");
const { user } = require("../helpers/axios");

const typeDefs = gql`
type User {
  id: ID
  username: String
  email: String
  createdAt: String
  updatedAt: String
  
type Query {
    users: [User]
  }
}
`;

const resolvers = {
Query:{
  users: async () => {
    try {
      const userCache = await redis.get("users:users")
      if (userCache) {
        return JSON.parse(userCache);
      }
      const { data } = await user.get("/users");
      await redis.set("users:users", JSON.stringify(data));
      return data;
    } catch (error) {
      return new ApolloError(error.response.data.message);
    }
  }
},
Mutation:{
    
}
}

module.exports = { typeDefs, resolvers };
