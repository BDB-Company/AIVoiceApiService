const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const {Readable} = require("stream");

const converter = async (data, format) => {
    return new Promise((resolve, reject) => {
        try {
            ffmpeg.setFfmpegPath(ffmpegPath);

            const audioStream = new Readable();

            audioStream.push(data);
            audioStream.push(null);

            const command = ffmpeg(audioStream)
                .inputFormat('s16le')
                .audioChannels(1)
                .audioFrequency(48000);

            switch (format) {
                case 'mp3':
                    command
                        .audioCodec('libmp3lame')
                        .audioBitrate('128k')
                        .format('mp3');
                    break;

                case 'wav':
                    command
                        .audioCodec('pcm_s16le')
                        .format('wav');
                    break;

                default:
                    audioStream.destroy(); // Закрываем поток
            }

            resolve(command);
        } catch (e) {
            console.error(e);
        }
    })
};

module.exports = converter;