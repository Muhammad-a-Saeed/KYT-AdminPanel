import { useState, useRef, useEffect } from "react";
import Loading from "@/components/common/Loading";
import { Dashboard_Chevron } from "@/utils/svgGrabber";
import StoreLayout from "@/components/layout/StoreLayout";
import InputField from "@/components/inputField";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AddDiscountData, addEvent, editDiscountData, editEventData } from "@/services/Path/Path";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import uploadFile from "@/services/imageHelper";


export default function AddDiscount() {
    const [formData, setFormData] = useState({});
    const [brandName, setBrandName] = useState("");
    const [discount, setDiscount] = useState("");
    const [description, setDescription] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [discountUrl, setDiscountUrl] = useState("");
    const [isQr, setIsQr] = useState(false);
    const [isUrl, setIsUrl] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
  
    const router = useRouter();
    const { item } = router.query; // Get the item from query parameters
    const imageRef = useRef();
  
    useEffect(() => {
      if (item) {
        // Parse the item and set form data
        const parsedItem = JSON.parse(item);
        setFormData(parsedItem);
        setBrandName(parsedItem?.brandName);
        setDiscount(parsedItem?.discount);
        setDescription(parsedItem?.description);
        setQrCode(parsedItem?.qrCode);
        setDiscountUrl(parsedItem?.discountUrl);
        setPreviewURL(parsedItem?.brandLogo);
        console.log(parsedItem, "parsedItem");
      }
    }, [item]);
  
    const handleImageChange = (image) => {
      setImage(image[0]);
      setPreviewURL(URL.createObjectURL(image[0]));
    };
  
    const handleQrCodeChange = (e) => {
      const value = e.target.value;
      setQrCode(value);
      if (value) {
        setIsQr(true);
        setIsUrl(false);
        setDiscountUrl(""); // Clear discount URL
      }
    };
  
    const handleDiscountUrlChange = (e) => {
      const value = e.target.value;
      setDiscountUrl(value);
      if (value) {
        setIsQr(false);
        setIsUrl(true);
        setQrCode(""); // Clear QR Code
      }
    };
  
    const addHandler = async () => {
      try {
        let fileURL;
        const isFormDataEmpty = Object.keys(formData).length === 0;
        if (isFormDataEmpty) {
          if (brandName === "") {
            toast.warn("Please enter Brand Name");
          } else if (discount === "") {
            toast.warn("Please enter discount");
          } else if (description === "") {
            toast.warn("Please enter description");
          } else if (qrCode === "" && discountUrl === "") {
            toast.warn("Please enter QR Code or Discount URL");
          } else if (discountUrl && !discountUrl.startsWith("https://")) {
            toast.warn("Please enter a valid discount URL starting with https://");
          } else {
            setLoading(true);
            if (image !== null) {
              fileURL = await uploadFile(image);
            }
            const body = {
              brandName: brandName,
              discount: discount,
              description: description,
              qrCode: qrCode,
              discountUrl: discountUrl,
              isQr: isQr,
              isUrl: isUrl,
              brandLogo: fileURL,
            };
            const auth_user = JSON.parse(localStorage.getItem("auth_user"));
            const getToken = auth_user.token;
            console.log(body, "body...");
            await AddDiscountData(getToken, body)
              .then(async (res) => {
                router.push("/dashboard/discount");
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
            brandName: brandName ? brandName : item?.brandName,
            discount: discount ? discount : item?.discount,
            description: description ? description : item?.description,
            qrCode: qrCode ? qrCode : item?.qrCode,
            discountUrl: discountUrl ? discountUrl : item?.discountUrl,
            brandLogo: fileURL !== null ? fileURL : item?.brandLogo,
            isQr: isQr ? isQr : item?.isQr,
            isUrl: isUrl ? isUrl : item?.isUrl
          };
  
          setLoading(true);
          const auth_user = JSON.parse(localStorage.getItem("auth_user"));
          await editDiscountData(auth_user?.token, editBody, formData?._id)
            .then(async (res) => {
              router.push("/dashboard/discount");
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

  return (
    <StoreLayout>
      <Loading loading={loading} />
      <div>
        <div className="flex text-gray-600 text-sm font-medium">
          Dashboard <Dashboard_Chevron /> Discount <Dashboard_Chevron />
        </div>
        <h1 className="text-2xl text-secondary font-bold my-3">Add Discount</h1>
        <div className="mb-5 mt-5 shadow-lg p-4 bg-white rounded-md">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-5">
            {/* Grid layout changes based on screen size using Tailwind classes */}
            <InputField
              id="brandName"
              name="brandName"
              type="text"
              label="Brand Name"
              placeholder="Enter Brand Name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="discount"
              name="discount"
              type="text"
              label="Discount"
              placeholder="Enter Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="Description"
              name="description"
              type="text"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full"
              placeholder="Enter Description"
            />
            <InputField
              id="qrCode"
              name="qrCode"
              type="text"
              label="QR Code"
              value={qrCode}
              onChange={handleQrCodeChange}
              disabled={!!discountUrl}
              className="w-full"
              placeholder="Enter Discount Url"
            />
            <InputField
              id="discountUrl"
              name="discountUrl"
              type="text"
              label="Discount Url"
              placeholder="Enter Url"
              value={discountUrl}
              onChange={handleDiscountUrlChange}
              disabled={!!qrCode}
              required
              className="w-full"
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
                  Select Brand Logo
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
