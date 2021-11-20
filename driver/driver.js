'use strict';
const capconnection=require('socket.io-client');

let host='http://localhost:8000';
const socket=capconnection.connect(`${host}/caps`)

socket.emit('get_all', {type:"driver"})

  //=============================== MessageQues =====================================================

socket.on('driver',payload=>{
    if(payload.message2 && payload.message1){
        console.log(payload.message2,payload.message1);
        socket.emit('received',{id:payload.id,type:'driver'}) ;

    }
    else if (payload.message2){
        console.log(payload.message2);
        socket.emit('received',{id:payload.id,type:'driver'}) ;

    }
    else{ console.log(payload.message1);
        socket.emit('received',{id:payload.id,type:'driver'}) ;

    }
})

socket.on('newDelevery',payload=>{

let newDelevery1={
    messageID: payload.order1.messageID,
    event_name:'in-transit',
    orginal: {
        store: 'acme-widgets',
        customer: payload.order1.orginal.customer,
        address: payload.order1.orginal.address
      },
}
let newDelevery2={
    messageID: payload.order2.messageID,
    event_name:'in-transit',
    orginal: {
        store: '1-800-flowers',
        customer: payload.order2.orginal.customer,
        address: payload.order2.orginal.address
      },
}

let driverMsg={
    messageBody1:`The order is on the road to your store ${newDelevery1.orginal.store}`,
    messageBody2:`The order is on the road to your store ${newDelevery2.orginal.store}`
}
socket.emit('in-transit',{newDelevery1:newDelevery1,newDelevery2:newDelevery2})
socket.emit('driverMsg',{driverMsg})

})

socket.on('deliverdOrder',payload=>{

    let deliverdOrder1={
        messageID: payload.order1.messageID,
        event_name:'deliverd',
        orginal: {
            store: 'acme-widgets',
            customer: payload.order1.orginal.customer,
            address: payload.order1.orginal.address
          },
    }
    let deliverdOrder2={
        messageID: payload.order2.messageID,
        event_name:'deliverd',
        orginal: {
            store: '1-800-flowers',
            customer: payload.order2.orginal.customer,
            address: payload.order2.orginal.address
          },
    }
    
    let driverMsg={
        messageBody1:`The order has been delivered to your store ${deliverdOrder1.orginal.store}`,
        messageBody2:`The order has been delivered to your store ${deliverdOrder2.orginal.store}`
    }
    socket.emit('deliverd',{deliverdOrder1:deliverdOrder1,deliverdOrder2:deliverdOrder2})
    socket.emit('deliveredMsg',{driverMsg})
    
    })
    
//=============================== DashBoard =====================================================



socket.on('pickedMsg',payload=>{
    console.log(` odrers:  ${payload.messageBody1} ,${payload.messageBody2} `);
    socket.emit('in-transit',payload);
    socket.on('delivered',payload=>{
        console.log(`The server recieved the`,payload)
    })
})

socket.on('transitMessage',payload=>{
    console.log(`delivered ${payload.messageID}`);
    socket.emit('delivered',payload);
})

socket.emit("get_all");
