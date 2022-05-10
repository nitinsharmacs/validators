const recipient = email => {
  const [firstEle] = email.split('@');
  return firstEle;
};

const domain = email => {
  const [, secondEle] = email.split('@');
  return secondEle;
};

const topLevelDomains = domain => {
  return domain.split('.').slice(1);
};

const validateRecipient = recipient => {
  const rule = /^[a-zA-Z0-9]+$/;
  return rule.test(recipient);
};

const validateTopLevelDomain = domains => {
  const rule = /^[a-zA-Z]+$/;
  return domains.every(domain => rule.test(domain));
};

const validateDomain = domain => {
  const rule = /^[a-zA-Z0-9]+\..*$/;
  return rule.test(domain) && validateTopLevelDomain(topLevelDomains(domain));
};

const emailValidator = email => {
  return (validateRecipient(recipient(email))
    &&
    validateDomain(domain(email)));
};

exports.emailValidator = emailValidator;
