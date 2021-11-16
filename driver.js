'use strict';
const capconnection=require('socket.io-client');

let host='http://localhost:8000';
const socket=capconnection.connect(`${host}/caps`)


socket.on('packMessage',payload=>{
    console.log(`picked ${payload.orderID}`);
    socket.emit('in-transit',payload);
})

socket.on('transitMessage',payload=>{
    console.log(`delivered ${payload.orderID}`);
    socket.emit('delivered',payload);
})