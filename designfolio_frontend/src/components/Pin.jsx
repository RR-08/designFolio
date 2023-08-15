import React,{useState} from 'react'
import { urlFor , client} from '../client'
import {link, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import { AiTwotoneDelete } from "react-icons/md";
import { BsFillArrrowUpRightCircleFill} from "react-icons/md";
import { fetchUser } from '../utils/fetchUser'





const Pin = ({pin:{postedBy,image,_id,destination,save}}) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();

  const user = fetchUser();
  const alreadySaved = !!(save?.filter(
    (item) => item.postedBy._id === user.googleId
  ))?.length;

  //1,[2,3,1]->[1].length->1 ->!1->false->!false->true
  //4,[2,3,1]->[].length->0 ->!0->true->!true->false
  

  return (
    <div className="m-2 ">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full "
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  // stop it from going to pin image page
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 absolute"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  Saved
                </button>
              ) : (
                <button
                onClick={(e)=>{
                  e.stopPropagation();
                savePin(_id);
                }
                  }
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pin
