const { gql, ApolloError } = require("apollo-server");
const redis = require("../helpers/redis");
const { app } = require("../helpers/axios");

const typeDefs = gql`
  type Category {
    id: ID
    name: String
    type: String
  }

  type SuccessResponse {
    message: String
  }

  type Query {
    Categories: [Category]
  }

  input addCategory {
    name: String
    type: String
  }

  input editCategory {
    name: String
    type: String
  }

  type Mutation {
    addCategory(newCategory: editCategory): SuccessResponse
    deleteCategory(categoryId: ID): SuccessResponse
    editCategory(categoryId: ID, categoryUpdate: editCategory): SuccessResponse
  }
`;

const resolvers = {
  Query: {
    Categories: async () => {
      try {
        const categoriesCache = await redis.get("Categories");
        if (categoriesCache) {
          return JSON.parse(categoriesCache);
        } else {
          const { data: categories } = await app.get(`/categories`);
          await redis.set("categories", JSON.stringify(categories));
          return categories;
        }
      } catch (error) {
        return new ApolloError(error.response.data.message);
      }
    },
  },
  Mutation: {
    addCategory: async (_, args) => {
      try {
        const { name, type } = args.editCategory;
        const { data: category } = await app.post(`/categories`, {
          name,
          type,
        });
        await redis.del("Categories");
        return category;
      } catch (error) {
        return new ApolloError(error.response.data.message);
      }
    },

    editCategory: async (_, args) => {
      try {
        const { categoryId } = args;
        const { name, type } = args.editCategory;
        const { data } = await app.put(`categories/:${categoryId}`, {
          name,
          type,
        });
        await redis.del("Categories");
        return data;
      } catch (error) {
        return new ApolloError(error.response.data.message);
      }
    },
    deleteCategory: async (_, args) => {
      try {
        const { categoryId } = args;
        const { data } = await app.delete("/categories/" + categoryId);
        await redis.del("categories");
        return data;
      } catch (error) {
        return new ApolloError(error.response.data.message);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
