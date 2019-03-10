var express = require('express');
var router = express.Router();

var IssueApi = require('../data/issueApi');

router.get('/', function(req, res) {
  IssueApi.getAllIssues(function(err, items) {
    res.render('issue/index', {
      title: 'Issues', issues: items
    });
  });
});

router.get('/create', function(req, res) {
	res.render('issue/create', {
    severities: ["Minor", "Major", "Critical"] ,
    statuses: ["Open", "In Progress", "Closed"]
  });
});

router.post('/create', function(req, res) {
  var issue = {};
  issue.description = req.body.description;
  issue.severity = req.body.severity;
  issue.status = req.body.status;
  issue.createdDate = req.body.createdDate;
  issue.resolvedDate = req.body.resolvedDate;

  IssueApi.saveIssue(issue, function(err, issue) {
    res.redirect('/issue');
  });
});

router.get('/edit/:id', function(req, res) {
  IssueApi.getIssueById(req.params.id, function(err, issue) {
    res.render('issue/edit', {issue: issue , severities: ["Minor", "Major", "Critical"] , statuses: ["Open", "In Progress", "Closed"]});
  });

});

router.post('/edit/:id', function(req, res) {
  var updatedIssue = {};
  updatedIssue.description = req.body.description;
  updatedIssue.severity = req.body.severity;
  updatedIssue.status = req.body.status;
  updatedIssue.createdDate = req.body.createdDate;
  updatedIssue.resolvedDate = req.body.resolvedDate;
  IssueApi.updateIssueById(req.params.id, updatedIssue, function(err) {
    res.redirect('/issue');
  });
});

router.get('/delete/:id', function(req, res) {
  IssueApi.deleteIssueById(req.params.id, function(err) {
    res.redirect('/issue');
  });
});

module.exports = router;
