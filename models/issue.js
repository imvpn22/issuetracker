const mongoose = require('mongoose');
const IssueSchema = new mongoose.Schema ({
  id: String,
  description: String,
  severity: String,
  status: String,
  createdDate: {
    type : Date,
    default :Date.now()
  },
  resolvedDate: Date
})

module.exports = mongoose.model('Issue', IssueSchema)
