const { gql, ApolloError } = require("apollo-server");
const redis = require("../helpers/redis");
const { app } = require("../helpers/axios");

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    createdAt: String
    updatedAt: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type AccessToken {
    access_token: String
  }

  type ResponseMessage {
    message: String
  }

  type Query {
    user(userId: ID): User
  }

  type Mutation {
    register(newUser: UserInput): ResponseMessage
    login(userLogin: UserLoginInput): AccessToken
  }
`;

const resolvers = {
  Query: {
    user: async (_, args) => {
      try {
        const { userId } = args;
        const userCache = await redis.get("user:user" + userId);
        if (userCache) {
          return JSON.parse(userCache);
        }
        const { data } = await app.get("/users/" + userId);
        await redis.set("user:user" + userId, JSON.stringify(data));
        return data;
      } catch (error) {
        return new ApolloError(error.response.data.message);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      try {
        const { username, email, password } = args.newUser;
        const payload = {
          username,
          email,
          password,
        };
        const { data } = await app.post("/users/register", payload);
        return data;
      } catch (error) {
        return new ApolloError(error.response.data.message);
      }
    },
    login: async (_, args) => {
      try {
        const { email, password } = args.userLogin;
        const payload = {
          email,
          password,
        };
        const { data } = await app.post("/users/login", payload);
        return data;
      } catch (error) {
        return new ApolloError(error.response.data.message);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
