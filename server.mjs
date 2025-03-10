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
        note: [Note]
    }

    type Author {
        id: String,
        name: String,
    }

    type Note{
        id: String,
        content: String,
    }

    type Query {
        authors:[Author],
        folders: [Folder],
        folder(folderId: String): Folder,
        note(noteId: String): Note
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        authors: () => fakeDdata.authors,
        folders: () => fakeDdata.folders,
        folder: (parent, agrs) => {
            const folderId = agrs.folderId
            return fakeDdata.folders.find(folder => folder.id == folderId)
        },
        note: (parent, agrs) => {
            const noteId = agrs.noteId
            return fakeDdata.notes.find(note => note.id == noteId)
        }
    },
    Folder: {
        author: (parent, agrs) => {
            const authorId = parent.authorId
            return fakeDdata.authors.find(author => author.id == authorId)
        },
        note: (parent, agrs) => {
            return fakeDdata.notes.filter(note => note.folderId === parent.id)
        }
    },

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