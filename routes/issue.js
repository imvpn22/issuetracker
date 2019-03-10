const express = require('express');
const router = express.Router();

const IssueApi = require('../data/issueApi');
// const IssueController = require('../controllers/issueController');


router.get('/', function(req, res) {
  IssueApi.getAllIssues(function(err, items) {
    res.render('issue/index', {
      title: 'All Issues | Issuetracker',
      issues: items
    });
  });
});

router.get('/create', function(req, res) {
	res.render('issue/create', {
    title: "Add Issue | Issuetracker",
    severities: ["Minor", "Major", "Critical"] ,
    statuses: ["Open", "In Progress", "Closed"]
  });
});

router.post('/create', function(req, res) {
  var issue = {
    description: req.body.description,
    severity: req.body.severity,
    status: req.body.status,
    createdDate: req.body.createdDate,
    resolvedDate: req.body.resolvedDate
  };

  IssueApi.saveIssue(issue, function(err, issue) {
    res.redirect('/issue');
  });
});

router.get('/edit/:id', function(req, res) {
  IssueApi.getIssueById(req.params.id, function(err, issue) {
    res.render('issue/edit', {
      title: "Edit Issue | Issuetracker",
      issue: issue ,
      severities: ["Minor", "Major", "Critical"] ,
      statuses: ["Open", "In Progress", "Closed"]
    });
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
