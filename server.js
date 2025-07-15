require('dotenv').config();
const router = require('./router/index');
const cors = require('cors');
const express = require('express');
const {json} = require("express");
const rabbitMQConnection = require('./rabbitmq-connection');

const PORT = process.env.PORT || 5000;
const corsOptions = {
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus:200,
}
const app = express()

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', router);
app.use((req, res, next) => {
    res.removeHeader('Content-Encoding');
    next();
});

const startServer = async () => {
    try {
        app.listen(PORT,'0.0.0.0', () =>  console.log(`Server started on PORT = ${PORT}`))
        await rabbitMQConnection.connect();
    }
    catch (e) {
        console.log(e)
    }
}

startServer();