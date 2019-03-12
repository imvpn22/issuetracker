const express = require('express');
const router = express.Router();

const IssueController = require('../controllers/issueController');

router.get('/', function(req, res) {
  IssueController.getAllIssues(function(err, issues) {
    if (err) {
      res.send(err);
    } else {
      res.json(issues);
    }
  });
});

router.post('/', function(req, res) {
  let issue = {
    description: req.body.description,
    severity: req.body.severity,
    status: req.body.status,
    createdDate: req.body.createdDate,
    resolvedDate: req.body.resolvedDate
  };

  IssueController.saveIssue(issue, function(err, issue) {
    if (err) {
      res.send(err);
    } else {
      res.json(issue);
    }
  });
});

router.get('/:id', function(req, res) {
  IssueController.getIssueById(req.params.id, function(err, issue) {
    if (err) {
      res.send(err);
    } else {
      res.json(issue);
    }
  });
});

router.put('/:id', function(req, res) {
  let updatedIssue = {
    description: req.body.description,
    severity: req.body.severity,
    status: req.body.status,
    createdDate: req.body.createdDate,
    resolvedDate: req.body.resolvedDate
  };

  IssueController.updateIssueById(req.params.id, updatedIssue, function(err, issue) {
    if (err) {
      res.send(err);
    } else {
      res.json(issue);
    }
  });
});

router.delete('/:id', function(req, res) {
  IssueController.deleteIssueById(req.params.id, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({status: 'Delete success'});
    }
  });
});

module.exports = router;
