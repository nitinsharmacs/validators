const { readdirSync } = require('fs');
const { runTests } = require('./utility/testLib.js');
const { displayReport, testReport } = require('./utility/testReport.js');

const isTestFile = (fileName) => {
  return fileName.startsWith('test') && fileName.endsWith('.js');
};

const getTestFiles = (path) => {
  return readdirSync(path).filter(isTestFile);
};

const requireTestFiles = (fileNames) => {
  fileNames.forEach(fileName => {
    require('./' + fileName);
  });
};

const filterFiles = (testFiles, suites) => {
  if (suites.length === 0) {
    return testFiles;
  }
  return testFiles.filter(fileName => suites.includes(fileName));
};

const main = () => {
  const [, , ...suites] = process.argv;
  const testFiles = getTestFiles('./test');
  const filteredFiles = filterFiles(testFiles, suites);
  requireTestFiles(filteredFiles);
  const testResults = runTests();
  displayReport(testReport(testResults));
};

main();
