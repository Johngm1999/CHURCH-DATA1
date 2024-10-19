import React, { useMemo, useRef } from "react";
import { Button } from "react-bootstrap";
import ModalWrapper from "../ModalWrapper";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import Loader from "../Loader";
import TableTemplate from "./TableTemplate";
import { ReactComponent as Download } from "../../asset/icons/Download.svg";
import { ReactComponent as ChevronRight } from "../../asset/icons/ChevronRight.svg";
import { ReactComponent as ChevronLeft } from "../../asset/icons/ChevronLeft.svg";
import ReactExport from "react-export-excel-xlsx-fix";
import withAlert from "../withAlert";
import AdvancedPagination from "./AdvancedPagination";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const PaginatedTable = (props) => {
    const {
        endpoints = {},
        loading = false,
        columnHeads = [],
        name = "Table",
        relevants = [],
        Form = () => <div></div>,
        irremovable = false,
        immutable = false,
        insertable = true,
        cellModifier = {},
        addFormProps = {},
        updateFormProps = {},
        formSize = "sm",
        response = [],
        reFetch = () => {},
        addBtnLabel = "",
        headerExtras = <></>,
        downloadable = false,
        initialFilterValue = "",
        showAlert,
        downloadExcelName,
        handleNext,
        handlePrevious,
        pagination = {},
        isCch,
        getIncompleteDataCount,
        handleFirst,
        handleLast,
        handlePageJump,
    } = props;
    const downloadFileName = downloadExcelName || name;
    const ensureString = (value) => {
        if (value === null || value === undefined) {
            return "";
        }
        return String(value);
    };

    const { currentPage, totalPages, totalRecords, limit } = pagination;
    console.log("pagination", pagination);

    const columnData = useRef(
        relevants.map((element, i) => {
            const temp = {
                Header: columnHeads[i] ?? "Missing Column Head",
                accessor: element,
            };

            Object.keys(cellModifier).forEach((key) => {
                if (element === key) {
                    temp.Cell = (value) => {
                        return cellModifier[key](value) ?? "";
                    };
                }
            });

            return temp;
        })
    );

    const columns = useMemo(() => columnData.current, []);

    const data = useMemo(() => response, [response]);

    const tableInstance = useTable(
        {
            columns,
            data,
            autoResetGlobalFilter: false,
            autoResetSortBy: false,
            autoResetPage: false,
            initialState: {
                globalFilter: initialFilterValue,
            },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        pageCount,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance;

    const { globalFilter, pageIndex } = state;

    let modalSize = {};

    if (typeof formSize === typeof "") {
        modalSize.add = formSize;
        modalSize.update = formSize;
    } else {
        modalSize = { ...formSize };
    }

    let formType = {};

    if (typeof Form === typeof function () {}) {
        formType.add = Form;
        formType.update = Form;
    } else if (Object.keys(Form).length === 1) {
        formType.add = Form.add || Form.update;
        formType.update = Form.add || Form.update;
    } else {
        formType = { ...Form };
    }

    let errorMessage = "";

    if (!loading) {
        if (response.length === 0) {
            errorMessage = "Table is Empty";
        }
    }

    return (
        <div className="crudCard">
            <div className="pe-2 py-4 pe-md-4 d-flex align-items-center cardHead">
                <span
                    // className='mt--3 '
                    style={{ fontSize: "20px", color: "#000" }}
                >
                    {name}
                </span>
                <span className="ms-auto">
                    <GlobalFilter
                        filter={globalFilter}
                        setFilter={setGlobalFilter}
                    />
                </span>
                {insertable && (
                    <ModalWrapper
                        modalTitle={addBtnLabel || "Add " + name}
                        modalAttrs={{ size: modalSize.add }}
                        renderModalBody={(closeModal) => (
                            <formType.add
                                onAfterSubmit={() => {
                                    closeModal();
                                    // showAlert(
                                    //     "success",
                                    //     `The record has been added successfully`
                                    // );
                                    reFetch();
                                }}
                                onCancel={closeModal}
                                endpoint={endpoints.add}
                                {...addFormProps}
                            />
                        )}
                    >
                        <Button
                            className="primaryBtn btnAnime ms-4"
                            style={{ fontSize: "13px" }}
                        >
                            {addBtnLabel || "Add " + name}
                        </Button>
                    </ModalWrapper>
                )}
                {headerExtras}

                {downloadable && (
                    <ExcelFile
                        element={
                            <Button className="primaryBtn btnAnime ms-4 px-3 py-1">
                                <Download />
                            </Button>
                        }
                        filename={downloadFileName}
                    >
                        <ExcelSheet
                            data={response}
                            name={
                                downloadFileName.length > 30
                                    ? "Data"
                                    : downloadFileName
                            } //name length must be less than 30 chars
                        >
                            {relevants.map((relevant, index) => {
                                return (
                                    <ExcelColumn
                                        key={index}
                                        label={
                                            columnHeads[index]
                                                ? columnHeads[index]
                                                : "Missing column head"
                                        }
                                        value={relevant}
                                    />
                                );
                            })}
                        </ExcelSheet>
                    </ExcelFile>
                )}
            </div>

            <div className="p-0">
                {!!errorMessage ? (
                    <div className="text-center h1 py-4 text-muted">
                        {errorMessage}
                    </div>
                ) : (
                    <>
                        <TableTemplate
                            name={downloadExcelName || name}
                            irremovable={irremovable}
                            immutable={immutable}
                            updateFormProps={updateFormProps}
                            getTableProps={getTableProps}
                            getTableBodyProps={getTableBodyProps}
                            headerGroups={headerGroups}
                            page={page}
                            prepareRow={prepareRow}
                            endpoints={endpoints}
                            reFetch={reFetch}
                            formType={formType}
                            modalSize={modalSize}
                            showAlert={showAlert}
                            getIncompleteDataCount={getIncompleteDataCount}
                        />
                        {pageOptions.length > 0 && (
                            // <div className="paginate">
                            //     <button
                            //         disabled={currentPage === 1}
                            //         onClick={() =>
                            //             handlePrevious(currentPage - 1)
                            //         }
                            //     >
                            //         <ChevronLeft />
                            //     </button>
                            //     <div className="page">
                            //         <span className="current">
                            //             {currentPage}
                            //         </span>
                            //         <span className="divider">/</span>
                            //         <span className="total">{totalPages}</span>
                            //     </div>
                            //     <button
                            //         disabled={currentPage === totalPages}
                            //         onClick={() => handleNext(currentPage + 1)}
                            //     >
                            //         <ChevronRight />
                            //     </button>
                            // </div>
                            <AdvancedPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalRecords={totalRecords}
                                recordsPerPage={limit}
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                handleFirst={handleFirst}
                                handleLast={handleLast}
                                handlePageJump={handlePageJump}
                            />
                        )}
                    </>
                )}
            </div>

            {loading && <Loader />}
        </div>
    );
};

export default withAlert(PaginatedTable);
