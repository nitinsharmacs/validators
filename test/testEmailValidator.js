const { equal } = require('assert');
const { emailValidator } = require('../validators/emailValidator.js');

describe('emailValidator', () => {
  it('Valid recipient and domain', () => {
    equal(emailValidator('nitin@gmail.com'), true);
  });

  it('No recipient', () => {
    equal(emailValidator('@gmail.com'), false);
  });

  it('No domain', () => {
    equal(emailValidator('nitin@'), false);
  });

  it('Without @', () => {
    equal(emailValidator('nitin'), false);
  });

  it('With top level domain', () => {
    equal(emailValidator('nitin@gmail.com.uk'), true);
  });

  it('Invalid top level domain', () => {
    equal(emailValidator('nitin@gmail.com.uk1'), false);
  });

  it('Recipient with special character', () => {
    equal(emailValidator('nitin.sharma@gmail.com.uk'), true);
  });

  it('Recipient with ensuing special character', () => {
    equal(emailValidator('nitin..sharma@gmail.com.uk'), false);
  });

  it('Domain with dash', () => {
    equal(emailValidator('nitin.sharma@sub-gmail.gmail.com'), true);
  });
});
