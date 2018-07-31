'use strict';

const express = require('express');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');
const expressGraphql = require('express-graphql');
const models = require('./models');
const { resolver } = require('graphql-sequelize');

const PORT = 8088;
const HOST = '0.0.0.0';

const app = express();

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return 'world';
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve: resolver(models.User, { handleConnection: true })
      }
    }
  })
});

// const schema = buildSchema(`
//   type Query {
//     hello: String
//     user(id: Int): User
//   },
//   type User {
//     id: Int
//     name: String
//   }
// `);

const getUser = args => {
  const id = args.id;
  models.User.findById(id).then(result => {
    const user = result.get();
    return {
      id: user.id,
      name: user.name
    };
  });
};

const root = {
  hello: () => {
    return 'Hello World';
  },
  user: args => {
    return {
      id: 1,
      name: 'hoa'
    };
  }
};

app.get('/', (req, res) => {
  res.send('Express Sample');
});

app.use(
  '/graphql',
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
