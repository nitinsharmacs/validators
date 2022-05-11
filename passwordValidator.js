const validateLength = function ({ min, max }) {
  if (this.length > max) {
    throw {
      message: 'Length is more than maximum allowed',
      code: 'BIGLENGTH',
      passed: false
    };
  }
  if (this.length < min) {
    throw {
      message: 'Length is less than minimum allowed',
      code: 'SMALLLENGTH',
      passed: false
    };
  }
  return { passed: true };
};

const hasSpecialChars = (text) => {
  const specialChars = /[~!@#$%^&*()_+{}[\];:'".,`?-]/;
  return specialChars.test(text);
};

const hasNoSpecialChars = (text) => {
  return !hasSpecialChars(text);
};

const assertSpecialChars = (text) => {
  if (hasNoSpecialChars(text)) {
    throw {
      message: 'No special character found',
      code: 'SPECIALCHARMISSING',
      passed: false
    };
  }
};

const assertNoSpecialChars = (text) => {
  if (hasSpecialChars(text)) {
    throw {
      message: 'Special characters found',
      code: 'SPECIALCHARPRESENT',
      passed: false
    };
  }
};

const handleSpecialChars = function (specialCharsAllowed) {
  if (specialCharsAllowed) {
    assertSpecialChars(this);
  }
  if (!specialCharsAllowed) {
    assertNoSpecialChars(this);
  }
  return { passed: true };
};

const runners = {
  length: validateLength,
  specialChars: handleSpecialChars
};

const getRunner = (ruleName, password) => {
  return runners[ruleName].bind(password);
};

const run = (runner, rule) => {
  return runner(rule);
};

const validatePassword = (rules, password) => {
  const results = {};
  for (const ruleName in rules) {
    const runner = getRunner(ruleName, password);
    try {
      results[ruleName] = run(runner, rules[ruleName]);
    } catch (error) {
      results[ruleName] = error;
    }
  }
  return results;
};

// const rules = {
//   length: {
//     min: 4,
//     max: 8
//   },
//   specialChars: true
// };

// console.log(validatePassword(rules, 'nitin!@#'));

exports.validatePassword = validatePassword;
