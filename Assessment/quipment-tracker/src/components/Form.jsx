import React from 'react'

const Form = ({
    formData,
    setFormData,
    schema,
    headerName,
    onSubmit,
    loading,
    onClose
}) => {
  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center'>
        
        <div className='bg-white rounded-xl shadow-lg w-1/3'>
            <div className='border-b border-gray-300 p-4 flex items-center rounded-t-xl bg-sky-50'>
                <div className='text-lg font-semibold text-sky-900'>
                    {headerName}
                </div>
                <button 
                  className='ml-auto text-gray-500 hover:text-gray-700'
                  onClick={onClose}
                >
                    X
                </button>
            </div>
            <form 
              className='p-4'
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
                {
                    schema.map((field) => 
                        field.type === "select" ? (
                                <div key={field.id} className='mb-4'>
                                    <label className='block text-gray-700 font-semibold mb-2'>{field.label}</label>
                                    <select
                                      name={field.name}
                                      value={formData[field.name] || ""}
                                      onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFormData({
                                            ...formData,
                                            [name]: value
                                        });
                                      }}
                                      className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-500'
                                    >
                                        <option value="">Select {field.label}</option>
                                        {
                                            field.options.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            ):(
                                <div key={field.id} className='mb-4'>
                                    <label className='block text-gray-700 font-semibold mb-2'>{field.label}</label>
                                    <input
                                      type={field.type}
                                      name={field.name}
                                      value={formData[field.name] || ""}
                                      onChange={(e) => {
                                        const { name, value } = e.target;
                                        setFormData({
                                            ...formData,
                                            [name]: value
                                        });
                                      }}
                                      placeholder={field.placeholder || ""}
                                      className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-500'
                                    />
                                </div>
                        
                            )

                    )
                }
                <button 
                  type="submit" 
                  className='bg-sky-400 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded'
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
  )
}

export default Form