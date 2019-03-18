const Issue = require('../models/issue');

getAllIssues = (cb) => {
  Issue.find({}, cb);
};

// Hacky update of id from _id
localUpdate = (err, issues) => {
  issues = issues.map(issue => {
    issue.id = issue._id;
    updateIssueById(issue._id, issue, (err, updatedIssue) => {
      if (err) return {};
      else return updatedIssue;
    });
  });
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
  Issue.create(issue, (err, newIssue) => {
    if (err) {
      cb(err, null);
    } else {
      newIssue.id = newIssue._id;
      updateIssueById(newIssue._id, newIssue, cb);
    }
  });
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
