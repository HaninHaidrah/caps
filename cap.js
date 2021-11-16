'use strict';

// require for socketio

const port = 8000;
const cap= require('socket.io')(port);

const capsRoom=cap.of('/caps'); // to create a caps room:
const timestamp= new Date(); // for time:

capsRoom.on('connection',(socket)=>{
 console.log('connected to main room')
    socket.on("pickup", (payload) => {
        console.log("Event:", {
          event: "pickup",
          time: timestamp,
          payload: payload,
        });
        capsRoom.emit('packMessage',payload)
    });
    socket.on("in-transit", (payload) => {
        console.log("Event:", {
          event: "in-transit",
          time: timestamp,
          payload: payload,
        });
        capsRoom.emit('transitMessage',payload)
    });
    socket.on("delivered", (payload) => {
        console.log("Event:", {
          event: "delivered",
          time: timestamp,
          payload: payload,
        });
        capsRoom.emit('dilveredMeesage',payload)
    });

})
