const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const {Readable} = require("stream");
const changeVolume = require("./change-volume");

const converter = async (data, format, volume) => {
    try {
        const dataEdited = changeVolume(data, -15)
        ffmpeg.setFfmpegPath(ffmpegPath);

        const audioStream = new Readable();
        if(volume === "0")
        {
            audioStream.push(dataEdited);
        }
        else{
            audioStream.push(changeVolume(dataEdited,Number(volume)));
        }

        audioStream.push(null);

        const command = ffmpeg(audioStream)
            .inputFormat('s16le')
            .audioChannels(1)
            .audioFrequency(48000);

        switch(format) {
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

        return command
    }
    catch(e) {
        console.error(e);
    }
};

module.exports = converter;