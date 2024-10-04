import React, { Fragment, useState } from "react";
import {
    useTable,
    useGlobalFilter,
    useSortBy,
    useFilters,
    useExpanded,
    usePagination,
} from "react-table";
import { Filter } from "./filter";
import { PAGE_SIZE } from "@/utils/constants";
import { Arrow_Back_SVG, Arrow_Next_SVG, Ascending_Svg, Default_Svg, Descending_Svg } from "@/utils/svgGrabber";

const TableContainer = ({
    columns,
    data,
    customPageSizeOptions = [10, 20, 30, 40, 50],
    onRowClick,
    rowClick,
    isSelectDropdown = true,
    isFilter = true,
    isSortBy = true,
    isShowPagination = true,
    selectedRows,
    dataName = "",
    nextPage,
    previousPage,
    setPageLimit,
    canPreviousPage,
    canNextPage,
    ...props
}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        // canPreviousPage,
        // canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        // nextPage,
        // previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            data,
            columns,
            initialState: { pageIndex: 0, pageSize: PAGE_SIZE, sortBy: isSortBy ? [{ desc: true }] : [] },
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
    );

    const [filterText, setFilterText] = useState('');

    const handleFilter = (val) => {
        setFilterText(val);
        gotoPage(0);
    };

    const generateSortingIndicator = column => {
        return column.hideElement ? "" : column.isSorted ? (column.isSortedDesc ? <Descending_Svg /> : <Ascending_Svg />) : <Default_Svg />
    }


    // const generateSortingIndicator = (column) => {
    //     return column.isSorted
    //         ? (column.isSortedDesc ? <Descending_Svg /> : <Ascending_Svg />)
    //         : <Default_Svg />;
    // };

    const onChangeInSelect = (event) => {
        const newPageSize = Number(event?.target?.value || event);
        setPageSize(newPageSize);
    };

    const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
    };

    const pageInfo = `1-${Math.min((pageIndex + 1) * pageSize, data.length)} of ${data.length}`;

    return (
        <div className="bg-[#F8FAFC] rounded-2xl">
            <div className='flex rounded-t-xl justify-between bg-white items-center pt-4 md:pt-7 pb-4 px-4'>
                <div className='text-sm text-heading md:min-h-[40px] font-medium'>All {` ${dataName}`} ( <span className='text-primary'>{data.length}</span> )</div>
                {!!selectedRows.length && <div className='flex items-center gap-x-3 text-heading text-sm font-medium'>
                    <p>{selectedRows?.length} {` ${dataName}`} selected</p>
                    <button className='border py-1.5 px-[18px] rounded-lg text-danger border-border_color shadow-buttonShadow'>Delete</button>
                </div>}
            </div>
            <Fragment>
                <div className="table-responsive react-table bg-white  overflow-x-auto">
                    <table className="table-auto w-full" {...getTableProps()}>
                        <thead className="bg-table_bg text-table_text">
                            {headerGroups.map(headerGroup => (
                                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            style={{ width: `${column.minSize}%` }}
                                            key={column.id}
                                            className="px-4 md:min-w-[7rem] xl:min-w-full py-3.5 text-start text-sm font-semibold"
                                        >
                                            <div className="flex gap-2 text-xs uppercase whitespace-nowrap items-center" {...column.getSortByToggleProps()}>
                                                {column.render("Header")}
                                                {generateSortingIndicator(column)}
                                            </div>
                                            {isFilter && <Filter column={column} />}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr
                                        className={`${!!selectedRows?.find((it) => it === row.original.id) && "!bg-table_bg"} cursor-pointer hover:bg-table_bg border border-t-table_row_hover`}
                                        key={row.getRowProps().key}
                                        onClick={() => {
                                            if (rowClick) onRowClick(row);
                                        }}
                                    >
                                        {row.cells.map(cell => (
                                            <td
                                                className="px-4 py-3.5 text-xs whitespace-pre-wrap"
                                                key={cell.getCellProps().key}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {page.length === 0 && (
                        <p className="min-h-[50vh] flex items-center justify-center">
                            No records found.
                        </p>
                    )}
                </div>


                <div className="md:flex justify-end items-center gap-2 md:px-4 py-5">

                    <div className="md:flex justify-between gap-3 items-center px-4">
                        <div className="md:block flex justify-end md:mb-0 mb-2">
                            <span className="text-sm text-[#64748B]">{pageInfo}</span>
                        </div>
                        <div className="flex mb-2 md:mb-0 justify-end md:justify-normal items-center gap-2">
                            <span className="text-[#64748B] text-sm">Rows per page:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setPageLimit(Number(e.target.value));
                                }}
                                className="border px-2 outline-none py-1 rounded"
                            >
                                {customPageSizeOptions.map((pageSizeOption) => (
                                    <option key={pageSizeOption} value={pageSizeOption}>
                                        {pageSizeOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex px-4 md:px-0 justify-end md:justify-normal gap-3">
                        <button
                            className={`${!canPreviousPage ? "bg-disable text-disableText" : "text-primary bg-white"} border font-medium flex items-center text-sm px-3 py-2 rounded-lg`}
                            onClick={previousPage}
                        // disabled={!canPreviousPage}
                        >
                            <Arrow_Back_SVG customClass="mr-1" />  Previous
                        </button>
                        <button
                            onClick={nextPage}
                            // disabled={!canNextPage}
                            className={`${!canNextPage ? "bg-disable text-disableText" : "text-primary bg-white"} border font-medium flex items-center text-sm px-3 py-2 rounded-lg`}
                        >
                            Next <Arrow_Next_SVG customClass="ml-1" />
                        </button>
                    </div>
                </div>
            </Fragment>
        </div>
    );
};

export default TableContainer;
