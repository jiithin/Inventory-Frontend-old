import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FadeIn from 'react-fade-in';
import { Card, Form } from 'react-bootstrap';
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';
import { selectUser } from '../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { updateUser } from '../services/authService';


function Editprofile() {
  useRedirectLoggedOutUser("/login");// reroute to login if loggedout
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo:user?.photo,
    location: user?.location,
    languages: user?.languages,
  };
  // console.log(user);
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");
  const [profileImageprew, setProfileImageprew] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setProfileImageprew(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dc13zibyc");//cloudinary name
        image.append("upload_preset", "yz7n50ld");//newly created preset for uploading

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dc13zibyc/image/upload",//clodinary url/version/username/upload destionation
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }
        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          location: profile.location,
          languages:profile.languages,
          photo: profileImage ? imageURL : profile.photo, // if image is uploaded then save image url else save old image url


        };

        const data = await updateUser(formData);
        console.log(data);
        alert("User updated");
        navigate("/profile");
        
      
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  

  return (
    <>
      <FadeIn>
        <Card className="list-group-item list-group-item-action flex-column align-items-start">
        <form className="form-control p-3">
          <div className="list-group-item list-group-item-action flex-column align-items-start px-4 py-2" style={{backgroundColor:"#727CF5"}}>
            <div className="d-flex w-100 justify-content-between ">
              <label>
                <input type="file" name="image" style={{ display: "none" }} onChange={handleImageChange}/>
                {profileImageprew != null ? (<div className="profile-preview">
                <img
                  src={profileImageprew}
                  width="150"
                  height="150"
                  className="d-flex rounded shadow-sm mt-2 "
                  alt="profile "
                /></div>):(
                  <div className="profile-drfault-preview">
                <img
                  src={user?.photo}
                  width="150"
                  height="150"
                  className="d-flex rounded shadow-sm mt-2 "
                  alt="default-profile"
                /></div>)}
                <small className='text-white'>Click to update profile image.</small>
              </label>
            </div>
            <h4 className="mb-4 mt-2 fw-bold text-white">{user?.name}</h4>
          </div>

          
            {/* new row */}
            
            <div className="row">
             
           {/* col-6 */}
              <div className="col-6">
                
                  <div className='w-75'>
                  <h4 class="header-title text-muted fw-bold mt-4">
                        Seller Details
                      </h4>
                    <label
                      for="exampleInputEmail1"
                      className="form-label mt-3 text-muted"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Eg:- Alexis Mac Allister"
                      value={profile?.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="w-75">
                    <label
                      for="exampleInputEmail1"
                      className="form-label mt-4 text-muted"
                    >
                      Phone{" "}
                    </label>
                    <input
                      type="text"
                      name='phone'
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Eg:- (+007) 22 55"
                      value={profile?.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="w-75">
                    <label
                      for="exampleInputEmail1"
                      className="form-label mt-4 text-muted"
                    >
                      Email{" "}
                    </label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder=" "
                      value={profile?.email} 
                    />
                    <small className='text-muted'>Email cannot be changed.</small>
                  </div>

                  <div className="w-75">
                    <label
                      for="location"
                      className="form-label mt-4 text-muted"
                    >
                      Location{" "}
                    </label>
                    <input
                      type="text"
                      name='location'
                      className="form-control"
                      id="location"
                      placeholder="Eg:- Argentina "
                      value={profile?.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="w-75">
                    <label
                      for="exampleInputEmail1"
                      className="form-label mt-4 text-muted"
                    >
                      Languages{" "}
                    </label>
                    <input
                      type="text"
                      name='languages'
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Eg:- English, Spanish "
                      value={profile?.languages}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    className="btn btn-primary mt-3 me-3"
                    style={{boxShadow:'0px 5px 10px 1px rgba(114, 124, 245, 0.15)'}}
                    type="submit"
                    onClick={saveProfile}
                  >
                    Update Profile
                  </button>
                  <Link to='/profile' className="btn btn-light mt-3" style={{boxShadow:'0px 5px 10px 1px rgba(10, 207, 151, 0.15)'}}>Cancel</Link>
                
              </div>

               {/* col-6 */}
               <div className="col-6">
                
                  <div>
                    <label
                      for="exampleTextarea"
                      className="form-label mt-4 text-muted"
                    >
                      <h4 class="header-title text-muted fw-bold">
                        Seller Information
                      </h4>
                    </label>
                    <textarea
                      class="form-control"
                      name='bio'
                      id="exampleTextarea"
                      rows="21"
                      placeholder=""
                      value={profile?.bio}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                
              </div>
            </div>
            </form>
          </Card>
      </FadeIn>
    </>
  );
}

export default Editprofile