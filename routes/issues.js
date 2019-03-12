const express = require('express');
const router = express.Router();

const IssueController = require('../controllers/issueController');

router.get('/', function(req, res) {
  IssueController.getAllIssues(function(err, issues) {
    // res.render('issue/index', {
    //   title: 'All Issues | Issuetracker',
    //   issues: items
    // });

    res.json(issues);

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
  let issue = {
    description: req.body.description,
    severity: req.body.severity,
    status: req.body.status,
    createdDate: req.body.createdDate,
    resolvedDate: req.body.resolvedDate
  };

  IssueController.saveIssue(issue, function(err, issue) {
    res.redirect('/issues');
  });
});

router.get('/edit/:id', function(req, res) {
  IssueController.getIssueById(req.params.id, function(err, issue) {
    res.render('issue/edit', {
      title: "Edit Issue | Issuetracker",
      issue: issue ,
      severities: ["Minor", "Major", "Critical"] ,
      statuses: ["Open", "In Progress", "Closed"]
    });
  });
});

router.post('/edit/:id', function(req, res) {
  let updatedIssue = {
    description: req.body.description,
    severity: req.body.severity,
    status: req.body.status,
    createdDate: req.body.createdDate,
    resolvedDate: req.body.resolvedDate
  };

  IssueController.updateIssueById(req.params.id, updatedIssue, function(err) {
    res.redirect('/issues');
  });
});

router.get('/delete/:id', function(req, res) {
  IssueController.deleteIssueById(req.params.id, function(err) {
    res.redirect('/issues');
  });
});

module.exports = router;
