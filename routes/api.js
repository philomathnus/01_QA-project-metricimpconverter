'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const { init } = require('../server.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = input.replace(/[^(\d)^(\/)^(\.)]/gi, '');
    const initUnit = input.replace(/[^a-z]/gi, '');
    console.log('initNum: ' + initNum);
    console.log('initUnit: ' + initUnit);
    const returnedJSON = convertHandler.convert(initNum, initUnit);

    res.json(returnedJSON);
  });

};
