// const _ = require('lodash');
const Issue = require('../models/issue');

getAllIssues = (cb) => {
  Issue.find({}, cb);
};

getFilteredIssues = (query, cb) => {
  Issue.find({name: query}, cb)
};

getIssueById = (id, cb) => {
  Issue.findById(id, cb);
};

updateIssueById = (id, issue, cb) => {
  Issue.findByIdAndUpdate(id, issue, cb);
};

saveIssue = (issue, cb) => {
  Issue.create(issue, cb);
};

deleteIssueById = (id, cb) => {
  Issue.findByIdAndRemove(id, cb);
};

module.exports = IssueController = {
   getAllIssues: getAllIssues,
   getIssueById: getIssueById,
   updateIssueById: updateIssueById,
   saveIssue: saveIssue,
   deleteIssueById: deleteIssueById,
   getFilteredIssues: getFilteredIssues
};
