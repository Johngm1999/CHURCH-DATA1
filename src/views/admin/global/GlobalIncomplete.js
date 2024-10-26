import { useState } from "react";
import PaginatedTable from "../../../components/table/PaginatedTable";
import endpoints from "../../../services/endpoints";
import GlobalForm from "./GlobalForm";
import { useAxiosGet } from "../../../hooks/axiosHooks";
import viewProps from "../../viewprops";

function GlobalIncomplete({ getIncompleteDataCount }) {
    const [page, setPage] = useState(1);
    const [triggerApiCall, setTriggerApiCall] = useState(true);
    const url = `${endpoints.global.incompleteList}?page=${page}&limit=10`;
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
        // "sacraments.baptism": ({ value }) => (value == 1 ? "yes" : "no"),
        // "sacraments.holyCommunion": ({ value }) => (value == 1 ? "yes" : "no"),
        // "sacraments.confirmation": ({ value }) => (value == 1 ? "yes" : "no"),
        pendingSacraments: ({ value }) => (value ? value : "Nothing Pending"),
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
                {...viewProps.GlobalDetails}
                handlePrevious={handlePrevious}
                Form={GlobalForm}
                endpoints={endpoints.global}
                formSize="lg"
                pagination={fetchUtils.pagination}
                {...fetchUtils}
                insertable={false}
                getIncompleteDataCount={getIncompleteDataCount}
                cellModifier={cellModifier}
                irremovable
                handleFirst={handleFirst}
                handleLast={handleLast}
                handlePageJump={handlePageJump}
            />
        </>
    );
}

export default GlobalIncomplete;
