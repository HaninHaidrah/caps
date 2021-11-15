const supertest = require("supertest");

// declare the payload:

let payload = {
  store: "Aden flowers",
  orderID: "12fgi789",
  customer: "hanin haidrah",
  address: "yemen aden almemmdarah 36 st",
};

// from the documentation to assest time :
jest.useFakeTimers();

// variabled for testing:
const port = 8000;
const cap= require('socket.io')(port);
const capsRoom=cap.of('/caps');

describe("handlers for main events", () => {
  it(" can listen to pickup", () => {
   
    expect(capsRoom.emit("pickup", payload)).toEqual(true);
  });

  it("can listen to in-transit", () => {
    expect(capsRoom.emit("in-transit", payload)).toEqual(true);
  });

  it("can listen to dileverd ", () => {
    capsRoom.emit("delivered", payload);
    expect(capsRoom.emit("delivered", payload)).toEqual(true);
});

const capconnection=require('socket.io-client');
let host='http://localhost:8000';
const socket=capconnection.connect(`${host}/caps`)

describe("driver test", () => {
  it("can dilever the messages for picking", () => {
    capsRoom.emit("pickedMessage", payload);
    expect(capsRoom.emit("packMessage", payload)).toEqual(true);
  });

  it("can dilever the messages for transiting", () => {
    capsRoom.emit("transitMessage", payload);
    expect(capsRoom.emit("transitMessage", payload)).toEqual(true);
  });
});

describe("driver test", () => {
  it("can dilever the messages for delivering", () => {
    capsRoom.emit("dilveredMeesage", payload);
    expect(capsRoom.emit("dilveredMeesage", payload)).toEqual(true);
  });
});
})