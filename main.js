const express = require('express');
const {connectMongoDb} = require('./db/mongodb.connect');
const Routes= require('./routes/routes.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');

// const admin = require('firebase-admin');
// const serviceAccount = require('./jiffy-bfbea-firebase-adminsdk-anenx-38f7d48ec4.json');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();
const url = process.env.MongoUrl; 

connectMongoDb(url)

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

 app.use('/',Routes); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});