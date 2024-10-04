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
import {
  deleteDiscountData,
  getAllDiscountData,
  getAllUserData,
} from "@/services/Path/Path";
import CustomDropdown from "@/components/CustomDropdown";
import { useRouter } from "next/router";

const AllUsers = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  console.log("selectedRows: ", selectedRows);
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async (pageNumber = 1, size = 10) => {
    setLoading(true);
    try {
      const auth_user = JSON.parse(localStorage.getItem("auth_user"));
      const getToken = auth_user.token;
      console.log(getToken, "getToken");
      const resp = await getAllDiscountData(getToken, pageNumber, size);
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
  const handleDropdownAction = async (item, status) => {
    console.log("Received item:", item); // Check the item structure
    console.log("Received status:", status);

    if (status === "Delete") {
      setLoading(true);

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this discount!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            // Ensure item._id exists
            console.log("userId inside delete condition: ", item._id);
            const auth_user = JSON.parse(localStorage.getItem("auth_user"));
            const resp = await deleteDiscountData(auth_user?.token, item?._id);

            if (resp?.success) {
              getAllData();
              toast.success("Discount deleted successfully!", {
                autoClose: 2000,
              });
            }
          } catch (error) {
            console.log("error: ", error);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
    } else {
      router.push({
        pathname: "addDiscount",
        query: { item: JSON.stringify(item) },
      });
    }
  };
  const handleDiscountClick = () => {
    router.push("/dashboard/addDiscount");
  };
  const columns = useMemo(
    () => [
      {
        Header: "Brand Name",
        accessor: "brandName",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
              {cellProps.row.original.brandName}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Discount",
        accessor: "discount",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
              {cellProps.row.original.discount}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Description",
        accessor: "description",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.description}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "QR Code",
        accessor: "qrCode",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.qrCode}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Discount Url",
        accessor: "discountUrl",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.discountUrl}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Brand Logo",
        accessor: "brandLogo",
        disableFilters: true,
        filterable: false,
        Cell: ({ row }) => {
          const imageUrl = row.original.brandLogo || TEMP_IMAGE; // Check if image exists, fallback to TEMP_IMAGE
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              <img
                src={imageUrl} // Use the correct image URL or TEMP_IMAGE
                alt={
                  row.original.brandName
                    ? `${row.original.brandName}'s Profile`
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
      {
        Header: "",
        accessor: "action",
        disableFilters: true,
        hideElement: true,
        canFilter: false,
        Cell: (cellProps) => {
          return (
            <CustomDropdown
              isEdit={false}
              onActionSelect={(status) =>
                handleDropdownAction(cellProps.row.original, status)
              }
            />
          );
        },
        minSize: 5,
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
          Dashboard <Dashboard_Chevron /> Discount <Dashboard_Chevron />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="text-2xl text-secondary font-bold my-3">Discount</h1>
          <button
            className="mt-4 mr-3 bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors"
            onClick={() => handleDiscountClick()}
          >
            Add Discount
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
            dataName="Discount"
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

export default withAuth(AllUsers);
