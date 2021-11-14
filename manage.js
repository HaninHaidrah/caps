'use strict';
const events=require("./hub");
require('./vendor/endor');
require('./driver')
var faker = require("faker");



// timestamp:
let timestamp= new Date;


// listen to all events in the hub:

// according to lab requirement we have three main events (pickup,in transit, delivered):
// first event:
events.on('pickup',payload=>{
    console.log('Event:',{
        event:'pickup',
        time:timestamp,
        payload:payload
    });
    events.emit('pickedMessage',payload)
})
//second event:

events.on('in-transit',payload=>{
    console.log('Event:',{
        event:'in-transit',
        time:timestamp,
        payload:payload
    });
    events.emit('transitMessage',payload)
})
// third event:
events.on('delivered',payload=>{
    console.log('Event:',{
        event:'delivered',
        time:timestamp,
        payload:payload
    });
})

class payload{
    constructor(){
        this.store= faker.company.companyName();
        this.orderID=faker.datatype.uuid() ;
        this.customer= faker.name.findName();
        this.address= faker.address.streetAddress()
    }
}

setInterval(()=>{
    let newPaload=new payload
    events.emit('pickup',newPaload)
},5000)


module.exports=events // for testing