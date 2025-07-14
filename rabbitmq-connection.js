const amqp = require('amqplib');
const amql = require("amqplib/lib/connection");

const url = 'amqp://admin:A123!@100.103.159.90';

class RabbitMQConnection {

    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        try {
            this.connection = await amqp.connect(url, {})
            this.channel = await this.connection.createChannel();
        }
        catch(e) {
            console.error(e);
        }
    }
}

const rabbitMQConnection = new RabbitMQConnection();

module.exports = rabbitMQConnection;