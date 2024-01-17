import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import { typeDefs } from "./gql/schema.ts";
import { Query } from "./gql/Query.ts";
import { Mutation } from "./gql/Mutation.ts";
import { ContactoGQL } from "./gql/ContactoGQL.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    ContactoGQL
  }
});

const { url } = await startStandaloneServer(server)
console.info(`🚀 Server ready at ${url}`);