const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: String,
   status:{type: String, enum: ["in-progress", "todo", "high", "completed"], default:"todo"},
   priority: {type: String, enum: ["low", "medium", "high", "critical"], default:"low"},
   dueDate: Date,
   tags: [String],
   createdAt : {type:Date, default: Date.now},
})
module.exports = mongoose.model("Task", taskSchema);