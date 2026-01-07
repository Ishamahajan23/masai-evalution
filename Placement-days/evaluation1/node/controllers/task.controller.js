const { count } = require("console");
const Apikey = require("../model/apiKey.model")
const Task = require("../model/task.model")
const crypto = require("crypto")
async function GenerateApiKey(req, res){

    const {email} = req.body;
    try{
    if(!email){
        return res.status(400).json({
            message : "Email is required",
            success: false
        })
    }
    const existing = await Apikey.findOne({email});
    if(existing){
        return res.status(200).json({
            message: "Email already registered. Use existing API key",
            apiKey: existing.apiKey,
            success: true
        })
    }
    const apiKey = `ak_${crypto.randomBytes(16).toString('hex')}`
    const key = await Apikey.create({email, apiKey});
    return res.status(201).json({
        message: "API key generated successfully",
        data:{
            "email": key.email,
            "apiKey": key.apiKey
        },
        success: true
    })
    }catch(err){
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}

async function getTasks(req, res){
    //   const apikey = req.params.apikey;
    try{
        const tasks = await Task.find();
        return res.status(200).json({
            message: "Tasks fetched successfully",
            count: tasks.length,
            data: tasks,
            success: true
        })
    }catch(err){
         return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}

async function createTask(req, res){
    try{

        const { title, description, status, priority, dueDate, tags } = req.body;
        if(!title){
            return res.status(400).json({
                message: "Title is required",
                success: false
            })
        }
        const newTask = new Task({
            title,
            description,
            status,
            priority,
            dueDate,
            tags
        });
        await newTask.save();
        return res.status(201).json({
            message: "Task created successfully",
            data: newTask,
            success: true
        })

    }catch(err){
        return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}

async function getById(req, res){
     const {_id} = req.params;
     console.log(_id);
     try{
        const tasks = await Task.findById(_id);
        return res.status(200).json({
            message: "Tasks fetched successfully",
            count: tasks.length,
            data: tasks,
            success: true
        })
    }catch(err){
         return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}

async function updateTask(req, res){
        const {_id} = req.params;
        console.log(_id);
        const {status, priority} = req.body;
        try{
            const updatedTask = await Task.findByIdAndUpdate(_id, {status, priority},);
            return res.status(200).json({
                message: "Task updated successfully",
                data: updatedTask,
                success: true
            })

        }catch(err){
         return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}

async function deleteTask(req, res){
        const {_id} = req.params;
        try{
            await Task.findByIdAndDelete(_id);
            return res.status(200).json({
                message: "Task deleted successfully",
                success: true
            })

        }catch(err){
         return res.status(500).json({
            message: "Server error",
            success: false
        })
    }
}



module.exports = {GenerateApiKey, getTasks, createTask, getById, updateTask, deleteTask};