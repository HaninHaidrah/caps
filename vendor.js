'use strict';

const capConnection=require('socket.io-client');
var faker = require("faker");

// connection:
// declare the host and then connect to nameplace on the server :

let host='http://localhost:8000'

const socket=capConnection.connect(`${host}/caps`)// to connect to /caps room

// now lets emit the pick-up event
setInterval(()=>{
    socket.emit('pickup', { 
      store:faker.company.companyName(),
      orderID:faker.datatype.uuid(),
      customer:faker.name.firstName(),
      address:faker.address.cityName()
  
     });
  },5000);

  socket.on('dilveredMeesage',payload=>{
      console.log(`Thank you for delivering ${payload.orderID}`)
  })