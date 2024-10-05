//import express from 'express';
const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3012)

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
const server = app.listen(app.get('port'), ()=>{
    console.log('Server on port: ', app.get('port'));
})

const SocketIO = require('socket.io');
const io = SocketIO(server);

// websocket
io.on('connection', (socket)=>{
    console.log('New connection', socket.id);

    socket.on('chat:message', (data)=>{
        console.log('datos: ', data);
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    })
})




