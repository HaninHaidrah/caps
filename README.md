# caps /lab13
* its a socket Applications  that allows real-time communication between two clients(driver and vendor) with saving the unreceived msgs in the queues and get then once the clients reconnected.
## Deployment Test
- BACKEND: https://github.com/HaninHaidrah/caps 
- PULL request: https://github.com/HaninHaidrah/caps/pull/1  
- The Output: ![img](result1.png)
- The Test :![img](test1.png)

## SET UP:
- npm i faker
- npm socket.io
- npm socket.io-client

## Running the app:
- node cap.js
- node driver.js
- node vendor.js

## Tests:
npm run test

## UML 
![img](uml.jpg)