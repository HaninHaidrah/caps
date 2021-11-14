const events = require("../hub");
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

// describe('handlers for main events',()=>{
//     it (('can handle the pickup event'),()=>{
//         const manage=require('../manage');
//         manage.emit('pickup',payload)
//         expect( manage.emit('pickup',payload)).toEqual(true);

//     })
// })

describe("handlers for main events", () => {
  it(" can listen to pickup", () => {
    const manage = require("../manage");
    manage.emit("pickup", payload);
    expect(manage.emit("pickup", payload)).toEqual(true);
  });

  it("can listen to in-transit", () => {
    const manage = require("../manage");
    manage.emit("in-transit", payload);
    expect(manage.emit("in-transit", payload)).toEqual(true);
  });

  it("can listen to dileverd ", () => {
    const manage = require("../vendor/endor");
    manage.emit("delivered", payload);
    expect(manage.emit("delivered", payload)).toEqual(true);
});

describe("driver test", () => {
  it("can dilever the messages for picking", () => {
    const driver = require("../driver");
    driver.emit("pickedMessage", payload);
    expect(driver.emit("pickedMessage", payload)).toEqual(true);
  });

  it("can dilever the messages for transiting", () => {
    const driver = require("../driver");
    driver.emit("transitMessage", payload);
    expect(driver.emit("transitMessage", payload)).toEqual(true);
  });
});

describe("driver test", () => {
  it("can dilever the messages for delivering", () => {
    const endor = require("../vendor/endor");
    endor.emit("productDelivered", payload);
    expect(endor.emit("productDelivered", payload)).toEqual(true);
  });
});
})