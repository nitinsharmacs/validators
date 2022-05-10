const recipient = email => {
  const [firstEle] = email.split('@');
  return firstEle;
};

const domain = email => {
  const [, secondEle] = email.split('@');
  return secondEle;
};

const hasNoEnsuingSpecialChars = text => {
  const rule = /[!#$%&'*+-/=?^_`.{|]{2,}/;
  return !rule.test(text);
};

const validateRecipient = recipient => {
  const rule = /^[a-zA-Z0-9!#$%&'*+-/=?^_`.{|]+$/;
  return hasNoEnsuingSpecialChars(recipient) && rule.test(recipient);
};

const validateDomain = domain => {
  const rule = /^[a-zA-Z0-9]+(\.[a-zA-Z]+){1,}$/;
  return rule.test(domain);
};

const emailValidator = email => {
  return validateRecipient(recipient(email)) && validateDomain(domain(email));
};

exports.emailValidator = emailValidator;
