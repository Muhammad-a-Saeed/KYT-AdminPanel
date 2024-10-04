import Loading from "@/components/common/Loading";
import StoreLayout from "@/components/layout/StoreLayout";
import { withAuth } from "@/hoc/withAuth";
import {
  Dashboard_Chevron,
  Delete_USER_SVG,
  Option_SVG,
} from "@/utils/svgGrabber";
import { toast } from "react-toastify";
import React, { useEffect, useState, useRef } from "react";
import {
  addAboutUs,
  editAboutUs,
  getAboutUsData,
} from "@/services/Path/Path";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [id, setId] = useState("");
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
      const resp = await getAboutUsData(getToken);
      if (resp) {
        setCurrentItems(resp?.aboutUs?.content);
        setContent(resp?.aboutUs?.content);
        setId(resp?.aboutUs?._id);
        console.log(resp?.aboutUs?._id, "api id");
        console.log(resp?.aboutUs?.content, "content");
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
        if (content === "") {
          toast.warn("Please enter  about us content");
        } else {
          const editBody = {
            content: content ? content : currentItems?.content,
          };

          setLoading(true);
          const auth_user = JSON.parse(localStorage.getItem("auth_user"));
          const getToken = auth_user.token;
          await editAboutUs(getToken, editBody, id)
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
        if (content === "") {
          toast.warn("Please enter  about us content");
        } else {
          setLoading(true);

          const body = {
            content: content,
          };
          const auth_user = JSON.parse(localStorage.getItem("auth_user"));
          const getToken = auth_user.token;
          await addAboutUs(getToken, body)
            .then(async (res) => {
              setContent("");
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
    <StoreLayout
      onChange={(e) => setInputSearch(e.target.value)}
      searchValue={inputSearch}
    >
      <Loading loading={loading} />
      <div>
        <div className="flex text-[#4D515A] text-sm font-medium">
          Dashboard <Dashboard_Chevron /> About Us <Dashboard_Chevron />
        </div>
        <h1 className="text-2xl text-secondary font-bold my-3">About Us</h1>
        <div className="mb-5 mt-5 shadow-lg p-4 bg-white rounded-md">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
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
};

export default withAuth(AboutUs);
