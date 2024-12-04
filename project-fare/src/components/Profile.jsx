import React, { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { toast } from "react-toastify";
import { getProfileApi, updateProfileApi } from "../services/allAPI";
import { serverURL } from "../services/serverURL";

function Profile() {
  const [open, setOpen] = useState(false)
  const [currentprofile, setCurrentProfile] = useState({
    profileImage: "",
    github: "",
    linkedin: "",
  })
  const [profile, setProfile] = useState({
    profileImage: "",
    github: "",
    linkedin: "",
  })
  const [preview, setPreview] = useState("")


  useEffect(() => {
    if (!profile.profileImage) {
      setPreview("");
      setProfile({ ...profile, profileImage: "" })
    } else {
      setPreview(URL.createObjectURL(profile.profileImage))
    }
  }, [profile.profileImage]);

  const handleUpdate = async () => {
    if (!profile.github || !profile.linkedin) {
      toast.info("Fill Missing Fields")
    }else{
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
        const reqBody = new FormData
        reqBody.append("profileImage",profile.profileImage?profile.profileImage:currentprofile.profileImage)
        reqBody.append("github",profile.github)
        reqBody.append("linkedin",profile.linkedin)

        const result = await updateProfileApi(reqBody,reqHeader)
        if(result.status == 200){
          getProfile()
          toast.success("Profile Updated")
        }else{
          toast.warn(result.message)
        }
      }
    }
  }


  const getProfile = async () => {
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
      const result = await getProfileApi(reqHeader)
      if(result.status==200){
        setCurrentProfile({...currentprofile,linkedin:result.data.linkedin,github:result.data.github,profileImage:result.data.profile})
      }else{
        toast.warn(result.message)
      }
    }
  }
  
  useEffect(()=>{
    getProfile()
  },[])

  useEffect(()=>{
    setProfile({...Profile,linkedin:currentprofile.linkedin,github:currentprofile.github})
  },[currentprofile])


  return (
    <>
      <div className="card shadow p-5 mt-3 me-2">
        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="btn border border-info border-2"
          >
            {open ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </button>
        </div>
        <Collapse in={open}>
          <div className="row justify-content-center mt-3">
            <label style={{ width: "200px" }}>
              <input
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                name=""
                id=""
                onChange={(e) =>
                  setProfile({ ...profile, profileImage: e.target.files[0] })
                }
              />
              <img
                src={
                  preview
                    ? preview
                    : currentprofile.profileImage
                    ?`${serverURL}/uploads/${currentprofile?.profileImage}`
                    : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                }
                style={{ borderRadius: "50%", aspectRatio: "1/1" }}
                width={"100%"}
                alt="profile"
              />
            </label>
            <div className="mt-5">
              <input
                type="link"
                placeholder="GitHub Link"
                className="form-control"
                value={profile.github}
                onChange={(e) =>
                  setProfile({ ...profile, github: e.target.value })
                }
              />
              <br />
              <input
                type="link"
                placeholder="LinkedIn Link"
                className="form-control"
                value={profile.linkedin}
                onChange={(e) =>
                  setProfile({ ...profile, linkedin: e.target.value })
                }
              />
            </div>
            <div className="d-grid mt-3">
              <button className="btn btn-success" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default Profile;
