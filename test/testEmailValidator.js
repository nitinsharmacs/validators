const { equal } = require('assert');
const { makeTest, suite } = require('./utility/testLib.js');
const { emailValidator } = require('../validators/emailValidator.js');

suite(
  'emailValidator',
  makeTest(
    'Valid recipient and domain',
    () => {
      equal(emailValidator('nitin@gmail.com'), true);
    }
  ),
  makeTest(
    'No recipient',
    () => {
      equal(emailValidator('@gmail.com'), false);
    }
  ),
  makeTest(
    'No domain',
    () => {
      equal(emailValidator('nitin@'), false);
    }
  ),
  makeTest(
    'Without @',
    () => {
      equal(emailValidator('nitin'), false);
    }
  ),
  makeTest(
    'With top level domain',
    () => {
      equal(emailValidator('nitin@gmail.com.uk'), true);
    }
  ),
  makeTest(
    'Invalid top level domain',
    () => {
      equal(emailValidator('nitin@gmail.com.uk1'), false);
    }
  ),
  makeTest(
    'Recipient with special character',
    () => {
      equal(emailValidator('nitin.sharma@gmail.com.uk'), true);
    }
  ),
  makeTest(
    'Recipient with ensuing special character',
    () => {
      equal(emailValidator('nitin..sharma@gmail.com.uk'), false);
    }
  ),
  makeTest(
    'Domain with dash',
    () => {
      equal(emailValidator('nitin.sharma@sub-gmail.gmail.com'), true);
    }
  ),
);
