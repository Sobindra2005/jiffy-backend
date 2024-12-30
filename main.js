import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import swaggerDocs from "./swaggerConfig";
import { connectMongoDb } from "./db/mongodb.connect.js";

import userRouter from "./routes/user.routes.js";
import foodRouter from "./routes/food.routes.js";
import resturantRouter from "./routes/resturant.routes.js";
import testRouter from "./routes/test.routes.js";

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*', // Temporarily allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
connectMongoDb()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/v1/test", testRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/resturant", resturantRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
