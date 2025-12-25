export const listFormSchema = (item, handleInputChange ) => ([
    {
        type: "text",
        label: "Name",
        name: "name",
        value: item ? item.name : "",
        inputEvent: handleInputChange,
        placeholder: "Enter equipment name"
    },
    {
        type: "select",
        label: "Type",
        name: "type",
        value: item ? item.type : "",
        inputEvent: handleInputChange,
        options:["Machine", "Vessel", "Tank", "Mixer"],
        placeholder: "Enter equipment type"
    },
    {
        type: "select",
        label: "Status",
        name: "status",
        value: item ? item.status : "",
        inputEvent: handleInputChange,
        options: ["Active", "Inactive", "Under Maintenance"]
    },
    {
        type: "date",
        label: "Last Cleaned Date",
        name: "lastCleanedDate",
        inputEvent: handleInputChange,
        value: item ? item.lastCleanedDate : ""
    }
]);