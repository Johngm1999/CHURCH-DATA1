import * as XLSX from "xlsx";

const capitalizeKeys = (data) => {
    return data.map((item) => {
        const capitalizedItem = {};
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                // Add spaces before capital letters and convert to uppercase
                const formattedKey = key
                    .replace(/([A-Z])/g, " $1") // Add space before each uppercase letter
                    .toUpperCase(); // Convert the entire key to uppercase
                capitalizedItem[formattedKey] = item[key];
            }
        }
        return capitalizedItem;
    });
};

const exportToExcel = (data, fileName = "data.xlsx") => {
    // Create a new workbook and worksheet
    const capitalizedData = capitalizeKeys(data);
    const worksheet = XLSX.utils.json_to_sheet(capitalizedData);
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate a download and save it
    XLSX.writeFile(workbook, fileName);
};

export default exportToExcel;
