"use strict";

const events = require("../hub");
var faker = require("faker");
  // lab requirements: 

//emit payload of (pickup) event to global events

setTimeout(()=>{
  events.emit('pickup', { 
    store:faker.company.companyName(),
    orderID:faker.finance.creditCardCVV(),
    customer:faker.name.firstName(),
    address:faker.address.cityName()

   });
},5000)
 

// Listens for a delivered event and responds by logging a message to the console:

events.on('productDelivered',payload=>{
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`)
  events.emit('delivered',payload);

})

module.exports=events//for testing units