import { useState } from "react";
import PaginatedTable from "../../../../components/table/PaginatedTable";
import endpoints from "../../../../services/endpoints";
import DeletedYouthData from "./DeletedYouthDataDisplayForm";
import { useAxiosGet } from "../../../../hooks/axiosHooks";
import viewProps from "../../../viewprops";
import DeleteWithWarning from "../../../../components/DeleteWithWarning";
import toast from "react-hot-toast";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";

function DeletedYouth() {
    const [page, setPage] = useState(1);
    const [triggerApiCall, setTriggerApiCall] = useState(true);
    const url = `${endpoints.youth.deletedYouth}?page=${page}&limit=10`;
    const fetchUtils = useAxiosGet(url, { preventCall: !triggerApiCall });

    const handleNext = (page) => {
        setPage(page);
        setTriggerApiCall(true);
    };

    const handlePrevious = (page) => {
        setPage(page);
        setTriggerApiCall(true);
    };

    const cellModifier = {
        pendingSacraments: ({ value }) => (value ? value : "Nothing Pending"),
        restore: ({ row }) => (
            <div style={{ textAlign: "center" }}>
                <DeleteWithWarning
                    title={
                        <span>
                            Restore Details of <br />
                            {row.original.fullName}
                        </span>
                    }
                    type="restore"
                    configBody={{
                        id: row.original.id,
                    }}
                    className="mx-auto"
                    onAfterDelete={() => {
                        fetchUtils.reFetch();
                        toast.success(
                            `Details of ${row.original.fullName} Successfully Restored.`
                        );
                    }}
                    endpoint={endpoints.youth.restoreYouth}
                />
            </div>
        ),
        delete: ({ row }) => (
            <div style={{ textAlign: "center" }}>
                <DeleteWithWarning
                    // title={`Permanently Delete Details of ${row.original.fullName}`}
                    title={
                        <>
                            <div>
                                <span
                                    style={{
                                        color: "red",
                                    }}
                                >
                                    Permanently
                                </span>{" "}
                                Delete Details{" "}
                                {row.original.fullName && (
                                    <>
                                        of{" "}
                                        <span
                                            style={{
                                                color: "grey",
                                            }}
                                        >
                                            {row.original.fullName}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div>
                                <WarningOutlinedIcon
                                    sx={{ color: "red", fontSize: "80px" }}
                                />
                                <div style={{ color: "red", fontSize: "10px" }}>
                                    Note : This data cannot be recovered.
                                </div>
                            </div>
                        </>
                    }
                    DeleteIcon={DeleteForeverOutlinedIcon}
                    configBody={{
                        id: row.original.id,
                    }}
                    className="mx-auto"
                    onAfterDelete={() => {
                        fetchUtils.reFetch();
                        toast.success(
                            `Details of ${row.original.fullName} Were Deleted.`
                        );
                    }}
                    endpoint={endpoints.youth.permanentDelete}
                />
            </div>
        ),
    };

    const handleFirst = () => {
        setPage(1);
        setTriggerApiCall(true);
    };
    const handleLast = (totalPages) => {
        setPage(totalPages);
        setTriggerApiCall(true);
    };
    const handlePageJump = (page, totalPages) => {
        const pageNumber = Math.max(1, Math.min(totalPages, Number(page)));
        setPage(pageNumber);
        setTriggerApiCall(true);
    };

    return (
        <>
            <PaginatedTable
                handleNext={handleNext}
                {...viewProps.YouthDeletedDetails}
                handlePrevious={handlePrevious}
                endpoints={endpoints.youth}
                formSize="lg"
                pagination={fetchUtils.pagination}
                {...fetchUtils}
                insertable={false}
                immutable
                cellModifier={cellModifier}
                irremovable
                handleFirst={handleFirst}
                handleLast={handleLast}
                handlePageJump={handlePageJump}
                DisplayForm={DeletedYouthData}
                showFullDetails
            />
        </>
    );
}

export default DeletedYouth;
