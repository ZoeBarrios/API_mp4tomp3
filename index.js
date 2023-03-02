require('dotenv').config()
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();

app.use(cors())

app.get('/mp4tomp3',async (req,res)=>{
    let title=req.query.title || "video"
    const url=req.query.url;

    await ytdl.getBasicInfo(url, {
        format: 'mp4'
    }, (err, info) => {
        if (err) throw err;
        title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });

    res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
    ytdl(url, {
        format: 'mp3',
        filter: 'audioonly',
    }).pipe(res);


})


app.listen(process.env.PORT | 3001,()=>{
    console.log("Server conectado en el puerto "+process.env.PORT)
})