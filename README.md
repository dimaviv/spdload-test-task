# The registrar of settlement operations 
 (укр. Реєстратор розрахункових операцій)

## Description
 The web application is expected to do inventory management and be a portable cash register. The cashier can scan the QR code of the product to add it to the shopping cart. After the scanning of all goods needed, the cashier can generate a receipt and print it. This app could simplify the job of small retailers who can't afford pricey cash register equipment and bring the order in the accounting of goods.


## Implemented
 * CRUD APIs
 * JWT auth
 * some e2e and unit tests (Jest)
 * validation (class-validator)
 * roles guard system
 * bcrypt password-hashing
 * Swagger documentation
   
## Prehistory 
I have finished the prototype of this project using PHP.
The idea was to implement as much functionality as possible in the shortest time.
After, the project was decided to rework using NestJs.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e



