const rabbitMQConnection= require("../rabbitmq-connection");

class AudioService {

    async getAudioFileRabbit(language,gender,text){

        const queue = 'tts_requests'
        const data = {
            language:language,
            gender:gender,
            text:text
        }

        await rabbitMQConnection.channel.assertQueue(queue, { durable: false });

        rabbitMQConnection.channel.consume('amq.rabbitmq.reply-to', (msg) => {
            // if (msg.properties.correlationId === corrId) {
                return msg.content;
        }, {noAck: true });

        rabbitMQConnection.channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(data)),
            { replyTo: 'amq.rabbitmq.reply-to'}
        );
    }
}

module.exports = new AudioService();