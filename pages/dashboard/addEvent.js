import { useState, useRef, useEffect } from "react";
import Loading from "@/components/common/Loading";
import { Dashboard_Chevron } from "@/utils/svgGrabber";
import StoreLayout from "@/components/layout/StoreLayout";
import InputField from "@/components/inputField";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { addEvent, editEventData } from "@/services/Path/Path";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import uploadFile from "@/services/imageHelper";
import moment from "moment";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";

export default function AddEvent() {
  const libraries = ["places"];
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [outfit, setOutfit] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [age, setAge] = useState("");
  const [ambience, setAmbience] = useState([]);
  const [musicGeneres, setMusicGeneres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [location, setLocation] = useState({
    locationName: "",
    city: "",
    country: "",
    full_address: "",
    latitude: "",
    longitude: "",
  });
  const router = useRouter();
  const { item } = router.query; // Get the item from query parameters
  const imageRef = useRef();

  useEffect(() => {
    if (item) {
      // Parse the item and set form data
      const parsedItem = JSON.parse(item);
      setFormData(parsedItem);
      setName(parsedItem?.name);
      setDescription(parsedItem?.description);
      // Convert dates to YYYY-MM-DD format
      const formattedStartDate = moment(parsedItem?.start_date).format("YYYY-MM-DD");
      const formattedEndDate = moment(parsedItem?.end_date).format( "YYYY-MM-DD");
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      setOutfit(parsedItem?.outfit);
      setAmbience(parsedItem?.ambiences);
      setLocation({
        locationName: parsedItem?.location?.name,
        city: parsedItem?.location?.city,
        country: parsedItem?.location?.country,
        full_address: parsedItem?.location?.full_address,
        latitude: parsedItem?.location?.latitude,
        longitude: parsedItem?.location?.longitude,
      });
      setFullAddress(parsedItem?.location?.full_address);
      setMusicGeneres(parsedItem?.music_genres);
      setEventUrl(parsedItem?.eventUrl);
      setAge(parsedItem?.age);
      setPreviewURL(parsedItem?.image_url);
      console.log(parsedItem, "parsedItem");
    }
  }, [item]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevState) => ({
      ...prevState,
      [name]: value,  // Use name as the key directly
    }));
  };
  const handleImageChange = (image) => {
    setImage(image[0]);
    setPreviewURL(URL.createObjectURL(image[0]));
  };

  const addHandler = async () => {
    console.log(location, "location state before submission");
    try {
      let fileURL;
      const isFormDataEmpty = Object.keys(formData).length === 0;
      if (isFormDataEmpty) {
        if (name === "") {
          toast.warn("Please enter  name");
        } else if (description === "") {
          toast.warn("Please enter description");
        } else if (startDate === "") {
          toast.warn("Please select start date");
        } else if (endDate === "") {
          toast.warn("Please select end date");
        } else if (outfit === "") {
          toast.warn("Please enter outfit");
        } else if (!ambience.length) {
          toast.warn("Please enter ambience");
        } else if (!musicGeneres.length) {
          toast.warn("Please enter music genres");
        } else if (location?.locationName === "") {
          toast.warn("Please enter avenue name");
        } else if (location.city === "") {
          toast.warn("Please enter city");
        } else if (location.country === "") {
          toast.warn("Please enter country");
        } else if (location.full_address === "") {
          toast.warn("Please enter full address");
        } else if (location.latitude === "") {
          toast.warn("Please enter latitude");
        } else if (location.longitude === "") {
          toast.warn("Please enter longitude");
        } else if (eventUrl === "" || !eventUrl.startsWith("https://")) {
          toast.warn("Please enter a valid event URL starting with https://");
        } else if (age === "") {
          toast.warn("Please enter age");
        } else {
          setLoading(true);
          if (image !== null) {
            fileURL = await uploadFile(image);
          }
          console.log(location?.locationName,"location name")
          const body = {
            name: name,
            outfit: outfit,
            description: description,
            start_date: startDate,
            end_date: endDate,
            image_url: fileURL,
            ambiences: ambience,
            music_genres: musicGeneres,
            location: {
              name: location?.locationName,
              city: location?.city,
              country: location?.country,
              full_address: location?.full_address,
              latitude: location?.latitude,
              longitude: location?.longitude,
            },
            eventUrl: eventUrl,
            age: age,
          };
          const auth_user = JSON.parse(localStorage.getItem("auth_user"));
          const getToken = auth_user.token;
          console.log(body, "body...");
          await addEvent(getToken, body)
            .then(async (res) => {
              router.push("/dashboard/events");
              toast.success(res.message);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err, "err...");
              toast.error(err.message);
            });
        }
      } else {
        setLoading(true);
        const item = formData;
        if (image !== null) {
          fileURL = await uploadFile(image);
        }
        const editBody = {
          name: name ? name : item?.name,
          outfit: outfit ? outfit : item?.outfit,
          description: description ? description : item?.description,
          start_date: startDate ? startDate : item?.start_date,
          end_date: endDate ? endDate : item?.end_date,
          image_url: fileURL !== null ? fileURL : item?.image_url,
          ambiences: ambience ? ambience : item?.ambiences,
          music_genres: musicGeneres ? musicGeneres : item?.music_genres,
          location: {
            name: location?.locationName ? location?.locationName : item?.location?.name,
            address: location?.address? location?.address: item?.location?.address,
            city: location?.city ? location?.city : item?.location?.city,
            country: location?.country ? location?.country: item?.location?.country,
            full_address: location?.full_address? location?.full_address: item?.location?.full_address,
            latitude: location?.latitude? location?.latitude: item?.location?.latitude,
            longitude: location?.longitude? location?.longitude : item?.location?.longitude,
            timezone: location?.timezone? location?.timezone: item?.location?.timezone,
          },
          eventUrl: eventUrl ? eventUrl : item?.eventUrl,
          age: age ? age : item?.age,
        };

        setLoading(true);
        const auth_user = JSON.parse(localStorage.getItem("auth_user"));
        await editEventData(auth_user?.token, editBody, formData?._id)
          .then(async (res) => {
            router.push("/dashboard/events");
            toast.success(res?.message);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const musicGenresOptions = [
    "urban",
    "hardcore",
    "pop",
    "rock",
    "remember",
    "techno",
    "house",
    "edm",
    "trap",
    "reggaeton",
    "latin",
    "salsa",
    "bachata",
    "kizomba",
    "r&b",
    "dance",
    "indie",
    "afrobeat",
    "minimal",
    "underground",
    "tech-house",
    "drum-and-bass",
    "acid-house",
    "chill",
    "hard-techno",
    "melodic-techno",
    "hip-hop",
    "reggae",
    "disco",
    "sing-along",
    "acoustic",
    "trance",
    "classical",
    "soul",
    "blues",
    "jazz",
    "metal",
    "old-school",
    "garage",
  ];
  const handleDateChange = (e, setDate) => {
    const newDate = e.target.value;
    setDate(newDate);
  };

  const handleSelect = async (address) => {
    console.log(address, "Address");
    setFullAddress(address);

    try {
      const results = await geocodeByAddress(address);
      console.log(results, "results");

      if (results.length === 0) {
        throw new Error("No results found for the address.");
      }

      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, "lat");
      console.log(lng, "lng");

      // Fetch place details using the place ID from the results
      const placeId = results[0].place_id;
      const placesService = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      placesService.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const cityComponent = place.address_components.find((component) =>
            component.types.includes("locality")
          );
          const countryComponent = place.address_components.find((component) =>
            component.types.includes("country")
          );

          const city = cityComponent
            ? cityComponent.long_name
            : "City not found";
          const country = countryComponent
            ? countryComponent.long_name
            : "Country not found";

          console.log(city, "City");
          console.log(country, "Country");
          setLocation({
            full_address: address,
            latitude: lat,
            longitude: lng,
            city: city,
            country: country,
            locationName:location?.locationName
          });
        } else {
          console.error("Error fetching place details:", status);
        }
      });
    } catch (error) {
      console.error("Error processing address:", error);
    }
  };

  // Load the Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "1234567890abcdef1234567890abcdef", // Replace with your actual API key
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <StoreLayout>
      <Loading loading={loading} />
      <div>
        <div className="flex text-gray-600 text-sm font-medium">
          Dashboard <Dashboard_Chevron /> Events <Dashboard_Chevron />
        </div>
        <h1 className="text-2xl text-secondary font-bold my-3">Add Event</h1>
        <div className="mb-5 mt-5 shadow-lg p-4 bg-white rounded-md">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-5">
            {/* Grid layout changes based on screen size using Tailwind classes */}
            <InputField
              id="name"
              name="name"
              type="text"
              label="Name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="Description"
              name="Description"
              type="text"
              label="Description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="Start Date"
              name="Start Date"
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => handleDateChange(e, setStartDate)}
              required
              className="w-full"
            />
            <InputField
              id="End Date"
              name="End Date"
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => handleDateChange(e, setEndDate)}
              required
              className="w-full"
            />
            <InputField
              id="OutFit"
              name="OutFit"
              type="text"
              label="OutFit"
              placeholder="Enter OutFit"
              value={outfit}
              onChange={(e) => setOutfit(e.target.value)}
              required
              className="w-full"
            />
            <div className="w-full">
              <p
                style={{
                  color: "#5A5A5A",
                  fontSize: "20px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                Ambience
              </p>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={ambience}
                onChange={(event, newValue) => setAmbience(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter multiple values"
                    placeholder="Type and press Enter"
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
            <div className="w-full">
              <p
                style={{
                  color: "#5A5A5A",
                  fontSize: "20px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                Music Generes
              </p>
              <Autocomplete
                multiple
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
            <InputField
              id="avenue name"
              name="locationName"
              type="text"
              label="Avenue Name"
              value={location.locationName}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter avenue name"
            />
            
            <div className="w-full">
              <p
                style={{
                  color: "#5A5A5A",
                  fontSize: "20px",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}
              >
                Full Address
              </p>
              <PlacesAutocomplete
                value={fullAddress}
                onChange={handleSelect}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "5px",
                        background: "white",
                        paddingLeft: "20px",
                        boxShadow: "0px 0px 5px 0px #0000001A",
                        border: "1px solid #0000001A",
                      }}
                      {...getInputProps({
                        placeholder: "Enter Address",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
           
            <InputField
              id="City"
              name="city"
              type="text"
              label="City"
              value={location.city}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter city"
            />
            <InputField
              id="Country"
              name="country"
              type="text"
              label="Country"
              value={location.country}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter country"
            />
            {/* <InputField
              id="Full Address"
              name="full_address"
              type="text"
              label="Full Address"
              value={location.full_address}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter full address"
            /> */}

            <InputField
              id="Latitude"
              name="latitude"
              type="text"
              label="Latitude"
              value={location.latitude}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter latitude"
            />
            <InputField
              id="Longitude"
              name="longitude"
              type="text"
              label="Longitude"
              value={location.longitude}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter Longitude"
            />
            {/* <InputField
              id="Time Zone"
              name="timezone"
              type="text"
              label="Time Zone"
              value={location.timezone}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="Enter time zone"
            /> */}
            <InputField
              id="Event Url"
              name="Event Url"
              type="text"
              label="Event Url"
              value={eventUrl}
              onChange={(e) => setEventUrl(e.target.value)}
              required
              className="w-full"
              placeholder="Enter event url"
            />
            <InputField
              id="Age"
              name="Age"
              type="number"
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full"
              placeholder="Enter age"
            />
            <div
              style={{
                marginTop: "15px",
                position: "relative",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                onChange={(event) => handleImageChange(event.target.files)}
                hidden
                accept=".doc, .docx, .pdf, .png, .jpg, .jpeg,"
                ref={imageRef}
              />
              <img
                style={{
                  width: "6rem",
                  height: "6rem",
                  cursor: "pointer",
                  borderRadius: "10rem",
                }}
                src={previewURL ? previewURL : "/icons/profile.jpg"}
                onClick={() => imageRef.current.click()}
              />
              <div style={{ marginLeft: "20px" }}>
                <button
                  onClick={() => imageRef.current.click()}
                  style={{
                    width: "130px",
                    height: "40px",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    color: "white",
                  }}
                >
                  Select Image
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="btn-primary px-4 py-2 bg-secondary text-white rounded-md"
              onClick={addHandler}
            >
              {item ? " Update" : " Submit"}
            </button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
