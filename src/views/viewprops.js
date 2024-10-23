const viewProps = Object.freeze({
    YouthDetails: {
        name: "Youth Details", // Update the name as needed
        columnHeads: ["ID", "FORM NUMBER", "FULL NAME", "AGE", "MOBILE NUMBER"],
        relevants: [
            "prefixedId",
            "formNumber",
            "fullName",
            "age",
            "mobileNumber",
        ],
    },
    YouthDeletedDetails: {
        name: "Deleted Data of Youth", // Update the name as needed
        columnHeads: [
            "ID",
            "FORM NUMBER",
            "FULL NAME",
            "AGE",
            "MOBILE NUMBER",
            "RESTORE",
            "DELETE",
        ],
        relevants: [
            "prefixedId",
            "formNumber",
            "fullName",
            "age",
            "mobileNumber",
            "restore",
            "delete",
        ],
    },
    GlobalDetails: {
        name: "Global Members Details", // Update the name as needed
        columnHeads: ["ID", "FORM NUMBER", "FULL NAME", "AGE", "MOBILE NUMBER"],
        relevants: [
            "prefixedId",
            "formNumber",
            "fullName",
            "age",
            "contactNumber",
        ],
    },
    GlobalDeletedDetails: {
        name: "Deleted Global Members", // Update the name as needed
        columnHeads: [
            "ID",
            "FORM NUMBER",
            "FULL NAME",
            "AGE",
            "MOBILE NUMBER",
            "RESTORE",
            "DELETE",
        ],
        relevants: [
            "prefixedId",
            "formNumber",
            "fullName",
            "age",
            "contactNumber",
            "restore",
            "delete",
        ],
    },
});

export default viewProps;
