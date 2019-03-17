const mongoose = require('mongoose');
const IssueSchema = new mongoose.Schema ({
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
