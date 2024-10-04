import { useState, useRef,useEffect } from "react";
import Loading from "@/components/common/Loading";
import { Dashboard_Chevron } from "@/utils/svgGrabber";
import StoreLayout from "@/components/layout/StoreLayout";
import InputField from "@/components/inputField";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { addContactUs, addEvent, editContactUs, getContactUs } from "@/services/Path/Path";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import uploadFile from "@/services/imageHelper";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddEvent() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("")
  const [website, setWebsite] = useState("");
  const [id, setId] = useState("");
  const [currentItems, setCurrentItems] = useState({});
  const [loading, setLoading] = useState(false);


  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 400,
    toolbarAdaptive: false,
    toolbarSticky: false,
  };
  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async () => {
    setLoading(true);
    try {
      const auth_user = JSON.parse(localStorage.getItem("auth_user"));
      const getToken = auth_user.token;
      console.log(getToken, "getToken");
      const resp = await getContactUs(getToken);
      if (resp) {
        setCurrentItems(resp?.contactUs);
        setEmail(resp?.contactUs?.email)
        setPhone(resp?.contactUs?.phone)
        setFacebook(resp?.contactUs?.facebook)
        setTwitter(resp?.contactUs?.twitter)
        setLinkedIn(resp?.contactUs?.linkedIn)
        setWebsite(resp?.contactUs?.website)
        setContent(resp?.contactUs?.content)
        setId(resp?.contactUs?._id);
      }
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };
  const addHandler = async () => {
    try {
      if (id) {
        if(email===""){
            toast.warn("Please enter email")
        }
       else if(phone===""){
            toast.warn("Please enter phone number")
        }
        else if(facebook===""){
            toast.warn("Please enter facebook link")
        }
        else if(twitter===""){
            toast.warn("Please enter twitter link")
        }
        else if(linkedIn===""){
            toast.warn("Please enter linkedIn link")
        }
        else if(website===""){
            toast.warn("Please enter website link")
        }
      else  if (content === "") {
          toast.warn("Please enter  Contact us content");
        } else {
          const editBody = {
            email:email?email:currentItems?.email,
            phone:phone?phone:currentItems?.phone,
            facebook:facebook?facebook:currentItems?.facebook,
            twitter:twitter?twitter:currentItems?.twitter,
            linkedIn:linkedIn?linkedIn:currentItems?.linkedIn,
            website:website?website:currentItems?.website,
            content: content ? content : currentItems?.content,
          };

          setLoading(true);
          const auth_user = JSON.parse(localStorage.getItem("auth_user"));
          const getToken = auth_user.token;
          await editContactUs(getToken, editBody, id)
            .then(async (res) => {
              getAllData();
              toast.success(res.message);

              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              toast.error(err.message);
            });
        }
      } else {
        if(email===""){
            toast.warn("Please enter email")
        }
       else if(phone===""){
            toast.warn("Please enter phone number")
        }
        else if(facebook===""){
            toast.warn("Please enter facebook link")
        }
        else if(twitter===""){
            toast.warn("Please enter twitter link")
        }
        else if(linkedIn===""){
            toast.warn("Please enter linkedIn link")
        }
        else if(website===""){
            toast.warn("Please enter website link")
        }
      else  if (content === "") {
          toast.warn("Please enter  contact us content");
        } else {
          setLoading(true);

          const body = {
            email:email,
            phone:phone,
            facebook:facebook,
            twitter:twitter,
            linkedIn:linkedIn,
            website:website,
            content: content,
          };
          const auth_user = JSON.parse(localStorage.getItem("auth_user"));
          const getToken = auth_user.token;
          await addContactUs(getToken, body)
            .then(async (res) => {
                getAllData();
              toast.success(res.message);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              toast.error(err.message);
            });
        }
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
          Dashboard <Dashboard_Chevron /> Contact Us <Dashboard_Chevron />
        </div>
        <h1 className="text-2xl text-secondary font-bold my-3">Contact Us</h1>
        <div className="mb-5 mt-5 shadow-lg p-4 bg-white rounded-md">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-5">
            {/* Grid layout changes based on screen size using Tailwind classes */}
            <InputField
              id="Email"
              name="Email"
              type="text"
              label="Email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="Phone"
              name="Phone"
              type="text"
              label="Phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="Facebook"
              name="Facebook"
              type="text"
              label="Facebook"
              placeholder="Enter facebook link"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="Twitter"
              name="Twitter"
              type="text"
              label="Twitter"
              placeholder="Enter twitter link"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="LinkedIn"
              name="LinkedIn"
              type="text"
              label="LinkedIn"
              placeholder="Enter linkedIn link"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              required
              className="w-full"
            />
            <InputField
              id="Website"
              name="Website"
              type="text"
              label="Website"
              placeholder="Enter website link"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              className="w-full"
            />
            
       
          </div>
          <div className="mb-5 mt-5  p-4 bg-white rounded-md">
             <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
         
         </div>
         {id ? (
            <button
              onClick={() => addHandler()}
              type="submit"
              className="mt-4 bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => addHandler()}
              type="submit"
              className="mt-4 bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </StoreLayout>
  );
}
