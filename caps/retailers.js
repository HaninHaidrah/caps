'use strict';


const capConnection = require("socket.io-client");
var faker = require("faker");
let host = "http://localhost:8000";
const socket = capConnection.connect(`${host}/caps`); // to connect to /namespace

let order = {
    messageID: faker.datatype.uuid(),
    event_name:'pickup',
    orginal: {
        store: 'acme-widgets',
        customer: faker.name.firstName(),
        address: faker.address.cityName(),
      },
  };
  let order2 = {
    messageID: faker.datatype.uuid(),
    event_name:'pickup',
    orginal: {
        store: '1-800-flowers',
        customer: faker.name.firstName(),
        address: faker.address.cityName(),
      }
    }

    socket.emit('newOrders-dedect',{order1:order,order2:order2})
    socket.emit('delivering-detect',{order1:order,order2:order2})
