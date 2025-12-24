const express = require("express");
const app = express();

app.use(express.json());
 const tasks = [
            {id: 1, task: "Do laundry", status: "pending"},
            {id: 2, task: "Buy groceries", status: "completed"},
            {id: 3, task: "Clean room", status: "pending"}
 ];

app.get("/task", (req, res)=>{

    try{
        res.status(200).send({message: "Tasks fetched successfully", tasks: tasks});
    }catch(err){
        res.status(500).send({message: err.message});
    }
})

app.post("/task", (req, res)=>{
    try{
        const {data} = req.body;
        tasks.push(data);
        res.status(200).send({message: "Data received successfully", data: data});
    }catch(err){
        res.status(500).send({message: err.message});
    }
})

app.delete("/task/:id", (req, res)=>{
    try{
        const {id} = req.params;
        const index = tasks.findIndex(t=> t.id == Number(id));
        if(index === -1){
            return res.status(404).send({message: "Task not found"});
        }
        tasks.splice(index, 1);
        res.status(200).send({message: "Task deleted successfully"});
    }catch(err){
        res.status(500).send({message: err.message});
    }
})

app.put("/task/:id", (req, res)=>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const task = tasks.find(t=> t.id == Number(id));
        if(!task){
            return res.status(404).send({message: "Task not found"});
        }
        task.status = status;
        res.status(200).send({message: "Task updated successfully", task: task});
    }catch(err){
        res.status(500).send({message: err.message});
    }
})

const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);

});