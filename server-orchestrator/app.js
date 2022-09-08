const { ApolloServer } = require("apollo-server");
const userSchema = require("./schema/userSchema");
const transactionSchema = require("./schema/transactionSchema");
const categorySchema = require("./schema/categorySchema");

const server = new ApolloServer({
  typeDefs: [
    userSchema.typeDefs,
    transactionSchema.typeDefs,
    categorySchema.typeDefs,
  ],
  resolvers: [
    userSchema.resolvers,
    transactionSchema.resolvers,
    categorySchema.resolvers,
  ],
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
