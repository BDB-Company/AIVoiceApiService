const audioService = require("../service/audio-service");
const fs = require("fs");
const converter = require("../audio-processors/converter-format");

class AudioController {

    async getAudioFile(req,res,next){
        try {
            const {format, volume} = req.body
            // const data = await audioService.getAudioFileRabbit(language,gender,text)
            const data = fs.readFileSync('audio.bin');

            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
            converter(data, format, volume)
                .then(command =>{
                    command.pipe(res)
                })
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new AudioController();