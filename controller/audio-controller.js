const audioService = require("../service/audio-service");
const fs = require("fs");
const converter = require("../audio-processors/converter-format");
const {channel} = require("../rabbitmq-connection");

class AudioController {

    async getAudioFile(req,res,next){
        try {
            const {language,gender,volume, speed, format,text} = req.body

            const data = await audioService.getAudioFileRabbit(language,gender,volume, speed, text);
            //const data = fs.readFileSync('audio.bin');
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Disposition', `attachment; filename="audio${format}"`);
            converter(data, format)
                .then(command =>{
                    command.pipe(res)
                })
            console.log('Ответ отправлен', Date.now())
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new AudioController();