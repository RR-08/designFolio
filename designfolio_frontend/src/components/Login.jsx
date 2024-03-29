import React from 'react';
import { GoogleLogin,GoogleOAuthProvider } from "@react-oauth/google";
import {useNavigate} from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import logo from '../assets/light-name.png';
import jwt_decode from "jwt-decode";
import { client } from "../client";
import share from '../assets/share.gif'

const Login = () => {
 const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log(response);

    createOrGetUser(response).then((decode) => {
      console.log("Decoded User:", decode);
      const { name, picture, sub } = decode;
      localStorage.setItem("user", JSON.stringify(decode));
      const doc = {
        _id: sub,
        _type: "user",
        userName: name,
        image: picture,
      };
      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    });
    
  };

  const createOrGetUser = async (response) => {
    const decode = jwt_decode(response.credential);
    return decode;
  };


  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <div className="absolute flex flex-col items-center justify-center top-0 right-0 left-0 bottom-0 bg-white">
          <div className="p-5 flex flex-col items-center">
            <img src={logo} width="170px" alt="logo" className="mb-3.5" />
            <img src={share} alt="gif" width="330px" className="mb-3.5" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            >
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
