"use strict";

const capConnection = require("socket.io-client");
var faker = require("faker");

// connection:
// declare the host and then connect to nameplace on the server :

let host = "http://localhost:8000";

const socket = capConnection.connect(`${host}/caps`); // to connect to /namespace


socket.emit('get_all',{type:'vendor'})

  //=============================== MessageQues =====================================================


socket.on('newOrder',payload=>{

  let Vendormessage={
    messageBody1:`${payload.order1.messageID} has an order for ${payload.order1.orginal.store}`,
    messageBody2:`${payload.order2.messageID} has an order for ${payload.order2.orginal.store}`,

  }
  socket.emit('pickup',payload)
  socket.emit('vendorMsg',{message:Vendormessage,payload:payload})
})

//=============================== DashBoard =====================================================

socket.on('vendor',payload=>{
  console.log(payload.message1);
  console.log(payload.message2);

  socket.emit('received',{id:payload.id,type:'vendor'})
})

