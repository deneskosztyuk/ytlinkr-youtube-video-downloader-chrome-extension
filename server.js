const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');
let serverProcess;

app.get('/start', (req, res) => {
    serverProcess = spawn('node', ['server.js']);
    res.send('Server started');
});
  
app.get('/stop', (req, res) => {
    serverProcess.kill();
    res.send('Server stopped');
});

app.get('/download', async (req, res) => {
    let url = decodeURIComponent(req.query.url);

    if (!url.startsWith('https://www.')) {
        url = 'https://www.' + url;
    }

    let info = await ytdl.getInfo(url);

    let videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
    let audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.header('Content-Disposition', `attachment; filename="video.mp4"`);

    ffmpeg()
        .input(ytdl(url, { format: videoFormat }))
        .input(ytdl(url, { format: audioFormat }))
        .outputOptions('-c:v copy')
        .outputOptions('-c:a aac')
        .outputOptions('-strict experimental')
        .outputOptions('-b:a 192k')
        .outputOptions('-shortest')
        .pipe(res, { end: true });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
