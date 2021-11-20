"use strict";

// require for socketio

const port = 8000;
const io = require("socket.io")(port);
const faker = require("faker");
const uuid = require("uuid").v4;

const cap = io.of("/caps"); // to create a caps namespace:
const timestamp = new Date(); // for time:

// Create a Message Queue that can store payloads for specific Clients.

const msgQueue = {
  flowerStore: {
    drivers: {},
    vendor: {},
  },
  widgetsStore: {
    drivers: {},
    vendor: {},
  },
};
//=============================== DashBoard =====================================================
cap.on("connection", (socket) => {
  console.log("connected to cap name-space");

  socket.on("newOrders-dedect", (payload) => {
    cap.emit("newOrder", payload);
  });

  socket.on("pickup", (payload) => {
    console.log("orders", payload.order1, payload.order2);
  });

  socket.on("delivering-detect", (payload) => {
    cap.emit("newDelevery", payload);
    cap.emit("deliverdOrder", payload);
  });
  socket.on("in-transit", (payload) => {
    console.log("orders", payload.newDelevery1, payload.newDelevery2);
  });
  socket.on("deliverd", (payload) => {
    console.log("orders", payload.deliverdOrder1, payload.deliverdOrder2);
  });
  //=============================== MessageQues =====================================================

  socket.on("vendorMsg", (payload) => {
    const id = uuid();

    msgQueue.flowerStore.drivers[id] = payload.message.messageBody1;
    msgQueue.widgetsStore.drivers[id] = payload.message.messageBody2;
    console.log("msqques for driver", msgQueue);

    cap.emit("driver", {
      id: id,
      message1: msgQueue.flowerStore.drivers[id],
      message2: msgQueue.widgetsStore.drivers[id],
    });
  });

  socket.on("driverMsg", (payload) => {
    const id = uuid();

    msgQueue.flowerStore.vendor[id] = payload.driverMsg.messageBody1;
    msgQueue.widgetsStore.vendor[id] = payload.driverMsg.messageBody2;
    console.log("msqques for vendor", msgQueue);

    cap.emit("vendor", {
      id: id,
      message1: msgQueue.flowerStore.vendor[id],
      message2: msgQueue.widgetsStore.vendor[id],
    });
  });
  socket.on("deliveredMsg", (payload) => {
    const id = uuid();

    msgQueue.flowerStore.vendor[id] = payload.driverMsg.messageBody1;
    msgQueue.widgetsStore.vendor[id] = payload.driverMsg.messageBody2;
    console.log("msqques for vendor", msgQueue);

    cap.emit("vendor", {
      id: id,
      message1: msgQueue.flowerStore.vendor[id],
      message2: msgQueue.widgetsStore.vendor[id],
    });
  });
  socket.on("received", (payload) => {
    delete msgQueue.flowerStore.drivers[payload.id];
    delete msgQueue.widgetsStore.drivers[payload.id];
    delete msgQueue.flowerStore.vendor[payload.id];
    delete msgQueue.widgetsStore.vendor[payload.id];
    console.log("after deleting", msgQueue);
  });

  socket.on("get_all", (payload) => {
    console.log("get all msgs");

    Object.keys(msgQueue.flowerStore.drivers).forEach(id=>{
      socket.emit("driver", {
        id: id,
        message1: msgQueue.flowerStore.drivers[id],
        message2: msgQueue.widgetsStore.drivers[id],
      });
    })
  });
});
