import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import axios from "axios";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { GraphqlSchema } from "./GraphqlSchema/graphqlSchema.js";
import { resolvers } from "./Resolver/resolver.js";
import { UserRoot } from "./Controller/userController.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Entrypoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphqlSchema,
    rootValue: UserRoot,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`);
});
