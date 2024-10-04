import Loading from "@/components/common/Loading";
import TableContainer from "@/components/common/TableContainer";
import StoreLayout from "@/components/layout/StoreLayout";
import { withAuth } from "@/hoc/withAuth";
import { TEMP_IMAGE } from "@/utils/constants";
import {
  Dashboard_Chevron,
  Delete_USER_SVG,
  Option_SVG,
} from "@/utils/svgGrabber";
import React, { useEffect, useMemo, useState } from "react";
import { getAllUserData } from "@/services/Path/Path";

const Ranking = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  console.log("selectedRows: ", selectedRows);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async (pageNumber = 1, size = 10) => {
    setLoading(true);
    try {
      const auth_user = JSON.parse(localStorage.getItem("auth_user"));
      const getToken = auth_user.token;
      console.log(getToken, "getToken");
      const resp = await getAllUserData(getToken, pageNumber, size);
      if (resp) {
        setCurrentItems(resp?.data?.data);
        setData(resp);
      }
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleNextPage = () => {
    if (data?.data?.hasNextPage) {
      console.log("123");
      getAllData(data?.data?.totalPages, pageLimit);
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (data.data?.hasPrevPage) {
      getAllData(data?.data?.totalPages - 1, pageLimit);
      setCurrentPage(currentPage - 1);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
              {cellProps.row.original.email}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Ful Name",
        accessor: "fullName",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
              {cellProps.row.original.fullName}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Wallet Balance",
        accessor: "walletBalance",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.walletBalance}{" "}
            </div>
          );
        },
        minSize: 20,
      },

      {
        Header: "Image",
        accessor: "image",
        disableFilters: true,
        filterable: false,
        Cell: ({ row }) => {
          const imageUrl = row.original.image || TEMP_IMAGE; // Check if image exists, fallback to TEMP_IMAGE
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              <img
                src={imageUrl} // Use the correct image URL or TEMP_IMAGE
                alt={
                  row.original.email
                    ? `${row.original.email}'s Profile`
                    : "Profile"
                } // Alt text with user email fallback
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                onError={(e) => (e.target.src = TEMP_IMAGE)} // Fallback if image loading fails
              />
            </div>
          );
        },
        minSize: 20,
      },
    ],
    [currentItems]
  );
  return (
    <StoreLayout
      onChange={(e) => setInputSearch(e.target.value)}
      searchValue={inputSearch}
    >
      <Loading loading={loading} />
      <div>
        <div className="flex text-[#4D515A] text-sm font-medium">
          Dashboard <Dashboard_Chevron /> Ranking <Dashboard_Chevron />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h1 className="text-2xl text-secondary font-bold my-3">Ranking</h1>
          <button
            className="mt-4 mr-3 bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors"
            onClick={""}
          >
            Add Rankings
          </button>
        </div>
        <div className="mb-5 mt-5 shadow-buttonShadow">
          <TableContainer
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
            columns={columns}
            data={currentItems}
            isAddOptions={false}
            customPageSize={6}
            selectedRows={selectedRows}
            dataName="Ranking"
            nextPage={() => handleNextPage()}
            previousPage={() => handlePreviousPage()}
            setPageLimit={(num) => {
              getAllData(1, num, () => setPageLimit(num));
            }}
            canNextPage={data?.data?.hasNextPage ? true : false}
            canPreviousPage={data.data?.hasPrevPage ? true : false}
          />
        </div>
      </div>
    </StoreLayout>
  );
};

export default withAuth(Ranking);
