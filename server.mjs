import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import fakeDdata from './fakeData/index.js'

// The GraphQL schema
const typeDefs = `#graphql
    type Folder {
        id: String,
        name: String,
        createdAt: String,
        author: Author
    }

    type Author {
        id: String,
        name: String,
    }

    type Query {
        folders: [Folder],
        authors:[Author],
        
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        folders: () => fakeDdata.folders,
        authors: () => fakeDdata.authors
    },
    Folder: {
        author: (parent, agrs) => {
            const authorId = parent.authorId
            return fakeDdata.authors.find(author => author.id == authorId)
        }
    }
};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);