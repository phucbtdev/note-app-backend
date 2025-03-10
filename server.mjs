import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'
import { typeDefs } from './schemas/typDefs.js'
import { resolvers } from './resolvers/resolvers.js';

const app = express();
const httpServer = http.createServer(app);

//MongoDB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster-note-app.25zm0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-note-app`
const PORT = process.env.PORT || 4000
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

mongoose.connect(URI)
    .then(async () => {
        await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000`);
    })

