import Loading from "@/components/common/Loading";
import TableContainer from "@/components/common/TableContainer";
import StoreLayout from "@/components/layout/StoreLayout";
import { withAuth } from "@/hoc/withAuth";
import {
  deleteUserById,
} from "@/services/user-services";
import { TEMP_IMAGE } from "@/utils/constants";
import {
  Dashboard_Chevron,
  Delete_USER_SVG,
  Option_SVG,
} from "@/utils/svgGrabber";
import { toast } from "react-toastify";
import React, { useEffect, useMemo, useState } from "react";
import swal from "sweetalert";
import { deleteImageFromFirebase } from "@/utils/helper";
import CustomDropdown from "@/components/CustomDropdown";
import {
  editPublicAffiliateData,
  getAllPublicAffiliateData,
} from "@/services/Path/Path";

const PublicRelationUser = () => {
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
      const resp = await getAllPublicAffiliateData(getToken, pageNumber, size);
      if (resp) {
        setCurrentItems(resp?.affiliateRequests);
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
      getAllData(data?.data?.totalPages ,pageLimit);
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (data.data?.hasPrevPage) {
      getAllData(data?.data?.totalPages-1, pageLimit);
      setCurrentPage(currentPage - 1);
    }
  };
  const handleDropdownAction = async (userId, status) => {
    console.log(userId, "userId", status, "status");
    const editBody = {
      status,
    };
    const auth_user = JSON.parse(localStorage.getItem("auth_user"));
    const getToken = auth_user.token;
    setLoading(true);
    await editPublicAffiliateData(getToken, editBody, userId)
      .then(async (res) => {
        toast.success(res?.message);
        getAllData(); // Refresh the data after updating the status
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  const handleDeleteUser = async (id, imageUrl) => {
    setLoading(true);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const auth_user = JSON.parse(localStorage.getItem("auth_user"));
          const resp = await deleteUserById({ token: auth_user.token, id });
          if (resp?.success) {
            // Delete image from Firebase Storage
            if (imageUrl) {
              await deleteImageFromFirebase(imageUrl);
            }

            getAllData();
            toast.success("User deleted successfully!", { autoClose: 2000 });
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
  };

  const columns = useMemo(
    () => [
      // {
      //     Header: " ",
      //     filterable: false,
      //     disableFilters: true,
      //     hideElement: true,
      //     Cell: cellProps => {
      //         const handleCheckChange = (checked, id) => {
      //             console.log('checked, id: ', checked, id);
      //             setSelectedRows(prevSelectedRow =>
      //                 checked ? [...prevSelectedRow, id] : prevSelectedRow.filter(item => item !== id)
      //             );
      //         }
      //         return (
      //             // <input
      //             //     // onChange={handleCheckChange(ids)}
      //             //     type="checkbox"
      //             //     className="form-check-input"
      //             // />
      //             <CustomCheckbox onchange={(val) => handleCheckChange(val, cellProps?.row?.original.id)} />
      //         )
      //     },
      //     minSize: 5,
      // },
      // {
      //     Header: "Id",
      //     accessor: "id",
      //     disableFilters: true,
      //     filterable: false,
      //     Cell: cellProps => {
      //         return <div className='flex text-primary items-center gap-2'>
      //             {`#${cellProps.row.original.id}`}
      //         </div>
      //     },
      //     minSize: 10,
      // },
      {
        Header: "Email",
        accessor: "requestedBy.email",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
              {cellProps.row.original.requestedBy.email}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Full Name",
        accessor: "requestedBy.fullName",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.requestedBy.fullName}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Type",
        accessor: "type",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.type}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      
      // {
      //   Header: "Date of Birth",
      //   accessor: "dob",
      //   disableFilters: true,
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     const formatted = moment(cellProps.row.original.dob).format(
      //       "DD/MM/YYYY"
      //     );
      //     return (
      //       <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
      //         {formatted}{" "}
      //       </div>
      //     );
      //   },
      //   minSize: 15,
      // },

      

      {
  Header: "Status",
  accessor: "status",
  disableFilters: true,
  hideElement: false,
  Cell: (cellProps) => {
    const status = cellProps.row.original.status;

    let bgColor = "";
    let textColor = "";
    let statusText = "";

    switch (status) {
      case "approved":
        bgColor = "bg-successBg"; // Green background
        textColor = "text-success"; // Green text
        statusText = "Approved";
        break;
      case "rejected":
        bgColor = "bg-dangerBG"; // Red background
        textColor = "text-danger"; // Red text
        statusText = "Rejected";
        break;
      case "pending":
      default:
        bgColor = "bg-yellow-200"; // Light yellow background
        textColor = "text-yellow-600"; // Yellow text
        statusText = "Pending";
        break;
    }

    return (
      <p
        className={`${bgColor} ${textColor} w-32 text-xs font-medium px-[14px] py-[6px] flex items-center justify-center rounded-full`}
      >
        {statusText}
      </p>
    );
  },
  minSize: 30,
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
              isEdit={true}
              onActionSelect={(status) =>
                handleDropdownAction(cellProps.row.original._id, status)
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
          Dashboard <Dashboard_Chevron /> Public Affiliate User{" "}
          <Dashboard_Chevron />
        </div>
        <h1 className="text-2xl text-secondary font-bold my-3">
          Public Affiliate User
        </h1>
        <div className="mb-5 mt-5 shadow-buttonShadow">
          <TableContainer
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
            columns={columns}
            data={currentItems}
            isAddOptions={false}
            customPageSize={6}
            selectedRows={selectedRows}
            dataName="Public Affiliate User"
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

export default withAuth(PublicRelationUser);
