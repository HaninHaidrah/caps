'use strict';
const events=require('./hub');

//Log a message to the console: DRIVER: picked up <ORDER_ID>.
events.on('pickedMessage',payload=>{
    console.log(`DRIVER: picked up ${payload.orderID}.`)
    events.emit('in-transit',payload) // Emit an ‘in-transit’ event to the Global Event Pool with the order payload.

})


//Log a confirmation message to the console: DRIVER: delievered <ORDER_ID>.

events.on('transitMessage',payload=>{
    console.log(`DRIVER: delievered ${payload.orderID}`)
    events.emit('productDelivered',payload) //Emit a ‘delivered` event to the Global Event Pool with the order payload. we will do it with endors because thereis no payload here

})

module.exports=events // for testing to import it


