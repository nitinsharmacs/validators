const { equal } = require('assert');
const { makeTest, suite } = require('./utility/testLib.js');
const { emailValidator } = require('../emailValidator.js');

suite(
  'emailValidator',
  makeTest(
    'Valid recipient and domain',
    () => {
      equal(emailValidator('nitin@gmail.com'), false);
    }
  )
);
