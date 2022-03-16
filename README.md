# cypress-basico-v2

Sample project for the basic course of the Talking about Testing online school.

## Pre-requirements

It is required to have Node.js and npm installed to run this project.

> I used versions `v16.14.0` and `8.3.1` of Node.js and npm, respectively. I suggest you use the same or later versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.
 > Since some dependencies are already added on package.json is not necessary to request install cypress version the npm it will install all the dependencies after this code is already available 

## Tests

### Desktop

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.
> In this case it will run the "test": "cypress run"

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

### Mobile

Run `npm run test:mobile` to run the test in headless mode on a mobile viewport.

Or, run `npm run cy:open:mobile` to open Cypress in interactive mode on a mobile viewport.