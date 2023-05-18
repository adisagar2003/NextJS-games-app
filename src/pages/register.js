import { useEffect, useState } from "react";
import styles from "@/styles/Register.module.css";
import BlurBlob from "@/components/BlurBlob";
import Card from "@/components/Card";
import { ClipLoader } from "react-spinners";
import Navbar from "@/components/Navbar";
import SignInModal from "@/components/SignInModal";
import { withIronSessionSsr } from "iron-session/next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function register(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [signInModal, setSignInModal] = useState(false);
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading,isLoading] = useState(false);
  const [error, setError] = useState(null);
  async function register() {
    isLoading(true);
    let data = JSON.stringify({
      userName: userName,
      password: password,
      profile_image:
        "https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlJTIwZ3JhZGllbnR8ZW58MHx8MHx8&w=1000&q=80",
      email: email,
    });
    if (userName != "" || confirmPassword!="" || password!=""||email!="") {
      if (password.length > 7 && password==confirmPassword) {
        const response = await fetch("/api/user", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: data, // body data type must match "Content-Type" header
        });

        response.json().then((result) => {
          console.log(result);
          if (result.error) {
            setError(result.error);
          isLoading(false);
           
          } else {

            location.href = "/";
            isLoading(false);
            
          }
        });
      } else {
        toast.error('Passwords dont match/null provided', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        setError("Password length should be at least 8 characters long");
        isLoading(false);
      }
    }else{
      toast.error('Password length should be at least 8 characters long', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }
  function changeText(e, targetFunction) {
    targetFunction(e.target.value);
    if (confirmPassword != password) {
      setError("Passwords don't match");
    } else {
      setError(null);
      
    }
  }


  
  useEffect(() => {
    if (confirmPassword != password) {
      setError("Passwords don't match");
    } else {
      setError(null);
    }
  }, [userName, password, confirmPassword]);

  return (
    <>
    <Navbar setSignInModal={setSignInModal} user={props.user}  />
    <div className={styles.registerPage}>
    {signInModal && <SignInModal setSignInModal={setSignInModal} />}
      
      <div className={styles.registerFlexBox}>
        <div className={styles.backgroundImage}>
              <img src={'/assets/leon.jfif'} />
        </div>
        <div className={styles.registerLayout}>
          <h4>Join to gain access to games around the globe</h4>
          <div className={styles.formContent}>
            <input placeholder="Email" type="text"  onChange={(e)=>setEmail(e.target.value)} />
            <input placeholder="Username" type="text"  onChange={(e)=>setUserName(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
            <input placeholder="Confirm Password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} />
            <button onClick={register}>Register</button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        props: {
          user: false,
        },
      };
    }
    return {
      props: {
        user: req.session.user,
      },
    };
  },
  {
    cookieName: "access_token",
    password: process.env.NEXT_PUBLIC_COOKIE_SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
export default register;
