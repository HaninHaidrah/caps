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
afterAll(done => {
  cap.close();
  done();
});

describe("handlers for main events", () => {
  it(" can listen to pickup", async() => {
    await capsRoom.emit("pickup", payload);

    expect(capsRoom.emit("pickup", payload)).toEqual(true);
  });

  it("can listen to in-transit", async() => {
    await capsRoom.emit("in-transit", payload);

    expect(capsRoom.emit("in-transit", payload)).toEqual(true);
  });

  it("can listen to dileverd ", async() => {
    await capsRoom.emit("delivered", payload);
    expect(capsRoom.emit("delivered", payload)).toEqual(true);
});

const capconnection=require('socket.io-client');
let host='http://localhost:8000';
const socket=capconnection.connect(`${host}/caps`)

describe("driver test", () => {
  it("can dilever the messages for picking", async() => {
   await capsRoom.emit("pickedMessage", payload);
    expect(capsRoom.emit("packMessage", payload)).toEqual(true);
  });

  it("can dilever the messages for transiting", async() => {
    await capsRoom.emit("transitMessage", payload);
    expect(capsRoom.emit("transitMessage", payload)).toEqual(true);
  });
});

describe("driver test", () => {
  it("can dilever the messages for delivering", async() => {
    await  capsRoom.emit("dilveredMeesage", payload);
    expect(capsRoom.emit("dilveredMeesage", payload)).toEqual(true);
  });
});
})