const _ = require('lodash');
const issues = require('../data/issues.json');

const _clone = function(item) {
  return JSON.parse(JSON.stringify(item));
};

let currentID = issues.length;

getAllIssues = (callback) => {
  callback(null, _clone(issues));
};

getIssueById = (id, callback) => {
  let issue = _.find(issues, {id: parseInt(id)});
  callback (null, _clone(issue));
};

updateIssueById = (id, issue, callback) => {
  let existingIssueIndex = _.indexOf(issues, _.find(issues, {id: parseInt(id)}));
  issue.id = parseInt(id);
  issues.splice(existingIssueIndex, 1, issue);
  callback (null);
};

saveIssue = (issue, callback) => {
  currentID = currentID + 1;
      issue.id = currentID;
      issues.push(issue);
  callback(null, _clone(issue));
};

deleteIssueById = (id, callback) => {
  _.remove(issues, { id: parseInt(id)});
  callback(null);
};


module.exports = IssueController = {
   getAllIssues: getAllIssues,
   getIssueById: getIssueById,
   updateIssueById: updateIssueById,
   saveIssue: saveIssue,
   deleteIssueById: deleteIssueById
};
