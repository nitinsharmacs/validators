const { deepStrictEqual } = require('assert');
const { makeTest, suite } = require('./utility/testLib.js');
const { validatePassword } = require('../passwordValidator.js');

suite(
  'passwordValidator',
  makeTest(
    'Password length less than min',
    () => {
      const rules = {
        length: {
          min: 6,
          max: 8
        }
      };
      const expected = {
        length: {
          passed: false,
          message: 'Length is less than minimum allowed',
          code: 'SMALLLENGTH'
        }
      };
      deepStrictEqual(validatePassword(rules, 'nitin'), expected);
    }
  ),
  makeTest(
    'Password length greater than max',
    () => {
      const rules = {
        length: {
          min: 6,
          max: 8
        }
      };
      const expected = {
        length: {
          message: 'Length is more than maximum allowed',
          code: 'BIGLENGTH',
          passed: false
        }
      };
      deepStrictEqual(validatePassword(rules, 'nitinsharma'), expected);
    }
  ),
  makeTest(
    'Password length in between the range',
    () => {
      const rules = {
        length: {
          min: 6,
          max: 8
        }
      };
      const expected = {
        length: {
          passed: true
        }
      };
      deepStrictEqual(validatePassword(rules, 'nitins'), expected);
    }
  ),
  makeTest(
    'Password with special characters with disabled special character rule',
    () => {
      const rules = {
        specialChars: false
      };
      const expected = {
        specialChars: {
          message: 'Special characters found',
          code: 'SPECIALCHARPRESENT',
          passed: false
        }
      };
      deepStrictEqual(validatePassword(rules, 'nitin@#'), expected);
    }
  ),
  makeTest(
    'Password without special characters with enabled special character rule',
    () => {
      const rules = {
        specialChars: true
      };
      const expected = {
        specialChars: {
          message: 'No special character found',
          code: 'SPECIALCHARMISSING',
          passed: false
        }
      };
      deepStrictEqual(validatePassword(rules, 'nitin'), expected);
    }
  ),
  makeTest(
    'Password with special characters with enabled special character rule',
    () => {
      const rules = {
        specialChars: true
      };
      const expected = {
        specialChars: {
          passed: true
        }
      };
      deepStrictEqual(validatePassword(rules, 'nitin@#'), expected);
    }
  ),
  makeTest(
    'Password without special characters with disabled special character rule',
    () => {
      const rules = {
        specialChars: false
      };
      const expected = {
        specialChars: {
          passed: true
        }
      };
      deepStrictEqual(validatePassword(rules, 'nitin'), expected);
    }
  ),
  makeTest(
    'Password with length and enabled special character rule',
    () => {
      const rules = {
        length: {
          min: 6,
          max: 12
        },
        specialChars: true
      };
      const expected = {
        length: {
          passed: true
        },
        specialChars: {
          passed: true
        }
      };
      deepStrictEqual(validatePassword(rules, 'nitin@#'), expected);
    }
  ),

);