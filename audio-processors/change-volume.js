const changeVolume = (inputData, dB) => {
    const outputData = Buffer.alloc(inputData.length);
    const sampleSize = 2; // 16-bit
    const factor = Math.pow(10, dB / 20); // Convert dB to linear scale

    for (let i = 0; i < inputData.length; i += sampleSize) {
        let sample = inputData.readInt16LE(i);
        sample = Math.max(-32768, Math.min(32767, Math.floor(sample * factor)));
        outputData.writeInt16LE(sample, i);
    }
    return outputData;
}

module.exports = changeVolume;