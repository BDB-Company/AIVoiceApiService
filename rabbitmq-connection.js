const amqp = require('amqplib');

const url = 'amqp://admin:A123!@localhost';

class RabbitMQConnection {

    constructor() {
        // this.connection = null;
        this.channel = null;
    }

    async connect() {
        try {
            this.connection = await amqp.connect(url, {})
        }
        catch(e) {
            console.error(e);
        }
    }
}

const rabbitMQConnection = new RabbitMQConnection();

module.exports = rabbitMQConnection;