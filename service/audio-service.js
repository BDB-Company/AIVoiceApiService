const rabbitMQConnection= require("../rabbitmq-connection");

class AudioService {

    async getAudioFileRabbit(language,gender,volume, speed, text){

        const channel = await rabbitMQConnection.connection.createChannel();
        const queue = 'tts_requests'
        const data = {
            language:language,
            gender:gender,
            volume:volume,
            speed:speed,
            text:text,
        }

        await channel.assertQueue(queue, { durable: false });

        return new Promise((resolve, reject) => {
            channel.consume('amq.rabbitmq.reply-to', async (msg) => {
                resolve(msg.content);
                channel.close();
            }, {noAck: true});

            channel.sendToQueue(
                queue,
                Buffer.from(JSON.stringify(data)),
                {replyTo: 'amq.rabbitmq.reply-to'}
            );
        })
    }
}

module.exports = new AudioService();
