import React, {useState} from 'react'

const Table = ({
    headerName,
    tableSchema,
    rowData,
    addFormOnClick
}) => {

    const [data, setData] =useState(rowData);

    const handleSearch= (value)=>{
        const filteredData = rowData.filter((row) => row.type.toLowerCase().includes(value.toLowerCase()));
        setData(filteredData);
    }
  return (
    <div className=' p-4 bg-white rounded-xl overflow-x-auto shadow-md m-4'>
           <div className='border  border-b-0 border-gray-300 p-2 bg-sky-50 flex items-center justify-between rounded-t-xl'>
             
            <div className='text-xl font-semibold bg-sky-50 text-sky-900'>
                {headerName}
            </div>
            <div className='flex items-center gap-2'>
             <input type="search" placeholder="Search by type..." className="ml-4 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={rowData.length===0}
             
             onChange={(e) => handleSearch(e.target.value)}/>
            <button className='ml-auto px-4 py-1 bg-blue-50 border border-blue-500 text-blue-500 rounded hover:bg-blue-100 cursor-pointer'
             onClick={addFormOnClick}
            >
                Add
            </button>

            </div>

           </div>
       
             <table className='w-full border-collapse border border-gray-300 overflow-x-auto'>
                    <thead>
                        <tr className='bg-gray-100'>
                            {
                                tableSchema.map((col) => (
                                    <th key={col.id} className='border border-gray-300 font-semibold text-md text-left p-2'>{col.label}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                         {
                            data.map((row) => (
                                <tr key={row._id} className='hover:bg-gray-50 '>
                                    {
                                        tableSchema.map((col) => (
                                            <td key={col.id} className='border border-gray-300 text-md p-2'>
                                                {
                                                    col.id === "actions" ? (
                                                        row.actions.map((action, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={action.event}
                                                                className={`mr-2 px-3 py-1 rounded cursor-pointer  ${action.type === "edit" ? "bg-blue-50 border border-blue-500 text-blue-500" : "bg-red-50 text-red-500 border border-red-500"}`}
                                                            >
                                                                {action.label}
                                                            </button>
                                                        ))
                                                    ) : (
                                                        row[col.id]
                                                    )
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                         }

                         {
                            data.length === 0 && (
                                <tr>
                                    <td colSpan={tableSchema.length} className='text-center p-4 text-gray-500'>
                                        No data available.
                                    </td>
                                </tr>
                            )
                         }
                    </tbody>
                </table>

    </div>
  )
}

export default Table