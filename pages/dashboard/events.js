import Loading from "@/components/common/Loading";
import TableContainer from "@/components/common/TableContainer";
import StoreLayout from "@/components/layout/StoreLayout";
import { withAuth } from "@/hoc/withAuth";
import { deleteUserById, getAllUsers } from "@/services/user-services";
import InputField from "@/components/inputField";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
  deleteEventData,
  getAllEventsData,

} from "@/services/Path/Path";
import { useRouter } from "next/router";
import moment from "moment";

const events = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");
  const [musicGeneres, setMusicGeneres] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log("selectedRows: ", selectedRows);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getAllData();
  }, []);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const getAllData = async (pageNumber = 1, size = 10) => {
    setLoading(true);
    try {
      const auth_user = JSON.parse(localStorage.getItem("auth_user"));
      const getToken = auth_user.token;
      console.log(getToken, "getToken");
      const resp = await getAllEventsData(
        getToken,
        startDate,
        endDate,
        musicGeneres,
        latitude,
        longitude,
        radius,
        pageNumber,
        size
      );
      if (resp) {
        setCurrentItems(resp?.events);
        setData(resp);
        setShowFilters(false)
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

 
  const handleDropdownAction = async (item, status) => {
    console.log("Received item:", item); // Check the item structure
    console.log("Received status:", status);

    if (status === "Delete") {
      setLoading(true);

      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this event!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            // Ensure item._id exists
            console.log("userId inside delete condition: ", item._id);
            const auth_user = JSON.parse(localStorage.getItem("auth_user"));
            const resp = await deleteEventData(auth_user?.token, item?._id);

            if (resp?.success) {
              getAllData();
              toast.success("Event deleted successfully!", { autoClose: 2000 });
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
        pathname: "addEvent",
        query: { item: JSON.stringify(item) },
      });
    }
  };
const handleClear=()=>{
  setStartDate("")
  setEndDate("")
  setMusicGeneres("")
  setLatitude("")
    setLongitude("")
    setRadius("")
  setShowFilters(false)
}
useEffect(() => {
  if (
    startDate === "" &&
    endDate === "" &&
    musicGeneres === "" &&
    latitude === "" &&
    longitude === "" &&
    radius === ""
  ) {
    getAllData();  // Only call this when all states are cleared
  }
}, [startDate, endDate, musicGeneres, latitude, longitude, radius]);
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
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.name}{" "}
            </div>
          );
        },
        minSize: 20,
      },

      {
        Header: "Description",
        accessor: "Description",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
              {cellProps.row.original.description}{" "}
            </div>
          );
        },
        minSize: 20,
      },

      {
        Header: "Start Date",
        accessor: "start_date",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const formatted = moment(cellProps.row.original.start_date).format(
            "DD/MM/YYYY"
          );
          return (
            <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
              {formatted}{" "}
            </div>
          );
        },
        minSize: 15,
      },

      {
        Header: "End Date",
        accessor: "end_date",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          const formatted = moment(cellProps.row.original.end_date).format(
            "DD/MM/YYYY"
          );
          return (
            <div className="flex items-center whitespace-nowrap text-secondary text-sm gap-2">
              {formatted}{" "}
            </div>
          );
        },
        minSize: 15,
      },

      {
        Header: "Outfit",
        accessor: "outfit",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.outfit}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Ambiences",
        accessor: "ambiences",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {Array.isArray(cellProps.row.original.ambiences)
                ? cellProps.row.original.ambiences.join(", ")
                : cellProps.row.original.ambiences}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Music Genres",
        accessor: "music_genres",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {Array.isArray(cellProps.row.original.music_genres)
                ? cellProps.row.original.music_genres.join(", ")
                : cellProps.row.original.music_genres}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Country",
        accessor: "location.country",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.location.country}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "City",
        accessor: "location.city",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.location.city}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Full Address",
        accessor: "location.full_address",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.location.full_address}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Event Url",
        accessor: "eventUrl",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.eventUrl}{" "}
            </div>
          );
        },
        minSize: 20,
      },
      {
        Header: "Age",
        accessor: "age",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <div className="flex items-center text-secondary text-sm gap-2">
              {cellProps.row.original.age}{" "}
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
  const handleEventClick = () => {
    router.push("/dashboard/addEvent");
  };
  const handleDateChange = (e, setDate) => {
    const newDate = e.target.value;
    setDate(newDate); // No need to format here as it's already in YYYY-MM-DD format
  };
  const musicGenresOptions = ["all", "electronica", "comercial", "regueton"];
  return (
    <StoreLayout>
      <Loading loading={loading} />
      <div>
        <div className="flex text-[#4D515A] text-sm font-medium">
          Dashboard <Dashboard_Chevron /> Events <Dashboard_Chevron />
        </div>

        <div
          style={{
            display:'flex',
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h1 className="text-2xl text-secondary font-bold my-3">Events</h1>

          <div style={{ position: "relative" }}>
          <button
                  className="mt-4 mr-3 bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors"
                  onClick={() => handleEventClick()}
                >
                  Add Event
                </button>
            <button
              className="bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors mb-4"
              onClick={toggleFilters}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <div
              style={{
                display: showFilters ? "flex" : "none",
                width: "280px",
                paddingLeft: "2%",
                paddingRight: "2%",
                flexDirection: "column",
                backgroundColor: "#24B1D9",
                position: "absolute",
                right:"10px",
                zIndex:1,
                padding:"10px",
                borderRadius:"10px",
                height:"300px",
                 overflowY: "auto"
              }}
            >
              <div style={{ marginTop: "1%", width: "250px" }}>
                <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Music Genre
                </p>
                <div style={{ width: "100%", marginTop: "3%"}}>
                  <Autocomplete
                    options={musicGenresOptions}
                    value={musicGeneres}
                    onChange={(event, newValue) => setMusicGeneres(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select multiple values"
                        placeholder="Select from dropdown"
                        sx={{
                          height: "50px",
                          "& .MuiInputBase-root": {
                            height: "100%",
                            backgroundColor: "white",
                            border: "1px solid #0000001A",
                            borderRadius: "5px",
                            boxShadow: "0px 0px 5px 0px #0000001A",
                          },
                          "& .MuiInputLabel-root": {},
                        }}
                      />
                    )}
                    sx={{
                      width: "100%",
                      height: "50px",
                      "& .MuiAutocomplete-paper": {
                        border: "1px solid #0000001A",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 5px 0px #0000001A",
                      },
                    }}
                  />
                </div>
              </div>
              <div
                style={{ width: "250px" }}
              >
                 <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                 Latitude
                </p>
                <div style={{ width: "100%"}}>
                  <InputField
                    id="latitude"
                    name="Latitude"
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                    placeholder="Enter Latitude"
                  />
                </div>
              </div>
              <div
                style={{ width: "250px" }}
              >
                 <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                 Longitude
                </p>
                <div style={{ width: "100%"}}>
                  <InputField
                    id="longitude"
                    name="longitude"
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                    placeholder="Enter Longitude"
                  />
                </div>
              </div>
              <div
                style={{ width: "250px" }}
              >
                 <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                 Radius
                </p>
                <div style={{ width: "100%"}}>
                  <InputField
                    id="radius"
                    name="Radius"
                    type="text"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    required
                    placeholder="Enter Radius"
                  />
                </div>
              </div>
              <div
                style={{ width: "250px" }}
              >
                 <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  Start Date
                </p>
                <div style={{ width: "100%"}}>
                  <InputField
                    id="Start Date"
                    name="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => handleDateChange(e, setStartDate)}
                    required
                  />
                </div>
              </div>
              <div
                style={{ width: "250px"}}
              >
                  <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  End Date
                </p>
                <div style={{ width: "100%" }}>
                  <InputField
                    id="End Date"
                    name="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => handleDateChange(e, setEndDate)}
                    required
                  />
                </div>
              </div>
              <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
                <button
                  className="mt-4 bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors"
                  onClick={() => handleClear()}
                >
                  Clear filter
                </button>
                <button
                  className="mt-4 bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors"
                  onClick={() => getAllData()}
                >
                  Add filter
                </button>
              </div>
            </div>
          </div>
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
            dataName="Events"
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

export default withAuth(events);
