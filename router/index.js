const AudioController = require('../controller/audio-controller');

const Router = require('express').Router;

router = new Router();

router.post('/getAudio', AudioController.getAudioFile);

module.exports = router;
