import React, { useState } from "react";
import exportToExcel from "../helpers/exportToExcel";
import axios from "axios";
// import { Button } from "react-bootstrap";
import { ReactComponent as Download } from "../asset/icons/Download.svg";
import Loader from "./Loader";
import toast from "react-hot-toast";
import SearchButton from "./SearchButton";
import { Button } from "react-bootstrap";

const DownloadExcel = ({
    apiEndpoint,
    filename = "data",
    buttonTitle,
    isSearch = false,
}) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const handleDownload = async () => {
        try {
            // Make an API call to fetch the data
            setIsDownloading(true);
            const response = await axios.get(apiEndpoint);
            const jsonData = response.data.responseData;
            if (jsonData.length > 0) {
                const today = new Date();
                const options = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                };
                const formattedDate = today.toLocaleString("en-IN", options);

                // Export the fetched data to Excel
                exportToExcel(
                    jsonData,
                    filename + "_" + formattedDate + ".xlsx"
                );
                setTimeout(() => {
                    setIsDownloading(false);
                }, 1000);
            } else {
                toast.error("No users left to generate the Excel file.");
                setIsDownloading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsDownloading(false);
        }
    };

    return (
        <>
            {isDownloading && <Loader />}
            {!isSearch ? (
                <Button
                    className="secondary btnAnime ms-4 px-3 py-1"
                    onClick={handleDownload}
                    title={
                        buttonTitle ||
                        "Download " + filename.replace(/-/g, " ") + " in excel"
                    }
                >
                    <Download />
                </Button>
            ) : (
                <SearchButton
                    className="secondary btnAnime ms-4 px-3 py-1"
                    onClick={handleDownload}
                    title={
                        buttonTitle ||
                        "Download " + filename.replace(/-/g, " ") + " in excel"
                    }
                >
                    <Download style={{ paddingRight: 3 }} />
                    {isSearch && " Download Search Result"}
                </SearchButton>
            )}
        </>
    );
};

export default DownloadExcel;
