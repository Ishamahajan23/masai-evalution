const { Equipment } = require("../Model/schema");
async function createList(req, res){
    console.log("Request Body:", req.body);
    try{
        const data = req.body;
        const newEquipment = await Equipment.create(data);
        return res.status(201).json({message: "Equipment created successfully", equipment: newEquipment});


    }catch(err){
        return res.status(500).json({message: "Server Error", error: err.message});
    }

}

async function editEquipment(req, res){
    try{
        const { id } = req.params;
        const data = req.body;
        const updatedEquipment = await Equipment.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json({message: "Equipment updated successfully", equipment: updatedEquipment});
    }catch(err){
        return res.status(500).json({message: "Server Error", error: err.message});
    }
}

async function getEquipments(req, res){
    try{
        const equipments = await Equipment.find();
        if (!equipments.length) {
        return res.status(200).json({ message: "No equipments found", equipments: [] });
        }

        return res.status(200).json({
            message: "Equipments fetched successfully",
            equipments: equipments
        });
    }catch(err){
        return res.status(500).json({message: "Server Error", error: err.message});
    }
}

async function deleteEquipment(req, res){
    try{
        const { id } = req.params;
        await Equipment.findByIdAndDelete(id);
        return res.status(200).json({message: "Equipment deleted successfully"});
    }catch(err){
        return res.status(500).json({message: "Server Error", error: err.message});
    }
}


module.exports = { createList, getEquipments , editEquipment, deleteEquipment};