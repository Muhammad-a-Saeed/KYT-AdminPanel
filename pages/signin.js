import InputWithLabel from "@/components/InputWithLabel";
import PasswordInput from "@/components/PasswordInput";
import Spinner from "@/components/common/Spinner";
import { withAuth } from "@/hoc/withAuth";
import { userLogin } from "@/services/Path/Path";
import { loginUser } from "@/services/auth-services";
import { ROUTES } from "@/utils/Routes";
import { Logo, Mail_SVG } from "@/utils/svgGrabber";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const divStyle = {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };

  const sendData = async (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
      device: {
        id: "8d8c1fc3197f3054",
        deviceToken:
          "fWp_51ntQUirNOKJWT4iS-:APA91bHV4lkMs8HIZc3F0pBe41L0C_26E1xLtJfC2PiRN3N7hVZMllYrao5WZPbscAKdjhMlbxf7zNcagMHouoR0JwbmGmh8IQPSp3T6TNHO8MQ9sZ1GDy2C_VNUrF2eoU0dIkRWA1VS",
      },
    };

    if (email === "") {
      toast.warn("Please enter your email.");
    } else if (password === "") {
      toast.warn("Please enter your password.");
    } else {
      setLoading(true);
      try {
        const res = await userLogin(body);
        // Check if token exists in the response
        const token = res?.data?.token;
        if (res?.success && token) {
          let payload;
          try {
            payload = jwtDecode(token);
          } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            setLoading(false);
            return;
          }
          // Ensure payload is defined before setting token
          if (payload) {
            payload.token = token;
            localStorage.setItem("auth_user", JSON.stringify(payload));
            toast.success("Login Successfully");
            router.push(ROUTES.DASHBOARD);
          } else {
            toast.error("Invalid token payload.");
          }
        } else {
          toast.warn(res?.message || "Login failed.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error?.response?.data?.message || "An error occurred.", {
          autoClose: 2000,
        });
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={sendData}>
      <section className="bg-[#b49359] flex justify-center items-center  bg-center bg-contain md:bg-no-repeat h-screen">
      <div className="w-[80%] md:w-[400px] rounded-xl mx-auto" style={{ background: "black" }}>
     
          <div className="flex pl-[10%] flex-col justify-center items-center pt-10">
            <Logo width={120} height={150} />
          </div>
          <div className="flex justify-center flex-col items-center my-5">
            <p className="text-4xl font-normal text-[#b49359]">Welcome!</p>
            <p className="text-2xl text-secondary font-thin  text-white">
              Sign in to continue.
            </p>
          </div>
          <div className="px-5">
            <InputWithLabel
              id={"email"}
              name={"email"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label={"Email or Username"}
              placeholder={"e.g. abc@gmail.com"}
              svgShow={<Mail_SVG />}
            />
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="submit"
              className="bg-[#b49359] text-white mt-5 mb-7 mx-auto justify-center gap-2 items-center flex font-medium py-2.5  rounded-md text-sm opacity-80 w-full"
            >
              Sign In {loading && <Spinner />}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default withAuth(SignIn);
