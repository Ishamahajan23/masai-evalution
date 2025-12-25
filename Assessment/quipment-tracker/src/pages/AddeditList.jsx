import React, {useState} from 'react'
import Table from '../components/Table.jsx'
import { listTableSchema } from '../schemas/listTableSchema.js'
import Form from '../components/Form.jsx'
import { listFormSchema } from '../schemas/listFormSchema.js'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLists } from '../features/listSlice.js'
import { useEffect } from 'react'
 import { ToastContainer, toast } from 'react-toastify';
 import { SquarePen, Trash } from 'lucide-react';

const AddeditList = () => {
    const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [addLoading, setaddLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "",
    lastCleanedDate: ""
  });
  const [editLoading, setEditLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const {list, loading: listLoading, error} = useSelector((state) => state.equipment);
//   console.log("List from Redux:", list);

  useEffect(() => {
     if(list.length === 0){
      dispatch(fetchLists())
     } 
  },[]);

    const handleSubmit = async () => {
        try{
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log("Form submission response:", data);
            toast.success("Equipment added successfully!");
            setLoading(false);
            setaddLoading(false);
            setFormData({
                name: "",
                type: "",
                status: "",
                lastCleanedDate: ""
            })
            dispatch(fetchLists());

        }catch(err){
            console.log("Error submitting form:", err);
        }
    }


    const handleEdit = async () => {
        try{
            if(!formData._id){
                toast.error("Invalid equipment ID for editing.");
                return;
            }
            console.log(formData._id)
            if(!formData.name || !formData.type || !formData.status || !formData.lastCleanedDate){
                toast.error("All fields are required.");
                return;
            }
        
            const res = await fetch(`http://localhost:8000/api/lists/${formData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            toast.success("Equipment edited successfully!");
            setEditLoading(false);
            setFormData({
                name: "",
                type: "",
                status: "",
                lastCleanedDate: ""
            })
            // Refresh the list after editing equipment
            dispatch(fetchLists());

        }catch(err){
            console.log("Error editing equipment:", err);
        }
    }

//   const data =[
//     {id:1, name:"Equipment 1", type:"Tank", status:"Active", lastCleanedDate:"2023-10-01"},
//     {id:2, name:"Equipment 2", type:"Vessel", status:"Inactive", lastCleanedDate:"2023-09-28"},
//     {id:3, name:"Equipment 3", type:"Mixer", status:"Under Maintenance", lastCleanedDate:"2023-09-30"},
//   ]


  const rowData = list.map((item) => ({
    ...item,
    actions: [
        {
            type: "edit",
            label: <SquarePen className='w-3 h-3' />,
            event: ()=>{
                setaddLoading(false);
                setFormLoading(true);
                setTimeout(() => {
                    setFormData(item);
                    setFormLoading(false);
                    setEditLoading(true);
                }, 1000);
            }
        },
        {
            type: "delete",
            label: <Trash className='w-3 h-3'/>,
            event: async()=>{

                setEditLoading(false);
                setaddLoading(false);
                try{
                    await fetch(`http://localhost:8000/api/lists/${item._id}`, {
                        method: "DELETE",
                    });
                    toast.success("Equipment deleted successfully!");
                    dispatch(fetchLists());
                }catch(err){
                    console.log("Error deleting equipment:", err);
                    toast.error("Error deleting equipment.");
                }
            }
        }
    ]
}));
        

  return (
    <div>
        <div className='text-xl font-semibold bg-sky-50 text-sky-900 flex justify-center items-center mb-4 p-4'>Manage Equipment List</div>

        {
            listLoading ? (
                <div className="animate-pulse">
                    <div className="bg-gray-200 h-10 rounded mb-4"></div>
                    <div className="space-y-3">
                        <div className="bg-gray-200 h-8 rounded"></div>
                        <div className="bg-gray-200 h-8 rounded"></div>
                        <div className="bg-gray-200 h-8 rounded"></div>
                        <div className="bg-gray-200 h-8 rounded"></div>
                        <div className="bg-gray-200 h-8 rounded"></div>
                    </div>
                </div>
            ) :
            <Table 
            headerName="Equipment List"  
            tableSchema={listTableSchema}
            rowData={rowData}
            addFormOnClick={() => { setaddLoading(true); }}

            />
        }
        {addLoading && (
        <Form 
          
          formData={formData}
          schema ={listFormSchema(formData, (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
          })}
          onSubmit ={() => handleSubmit()}
          setFormData={setFormData}
          headerName="Add Equipment"
          loading={loading}
          onClose={() => {setaddLoading(false); setFormData({
            name: "",
            type: "",
            status: "",
            lastCleanedDate: ""
          })    
        }}
        />
        )}

        {formLoading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            </div>
        )}

        {editLoading && (
            <Form 
              schema ={listFormSchema(formData, (e) => {
                const { name, value } = e.target;
                setFormData({
                    ...formData,
                    [name]: value
                });
              })}
              onSubmit ={() => handleEdit()}
              formData={formData}
              setFormData={setFormData}
              headerName="Edit Equipment"
              loading={editLoading}
              onClose={() => {setEditLoading(false);
                setFormData({
                    name: "",
                    type: "",
                    status: "",
                    lastCleanedDate: ""
                  })

              }}
            />
        )}

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />


       
    </div>
  )
}

export default AddeditList