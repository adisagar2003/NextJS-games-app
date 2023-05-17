import { useEffect, useState } from "react";
import styles from "@/styles/Register.module.css";
import BlurBlob from "@/components/BlurBlob";
import Card from "@/components/Card";
import { ClipLoader } from "react-spinners";
import Navbar from "@/components/Navbar";
import SignInModal from "@/components/SignInModal";
import { withIronSessionSsr } from "iron-session/next";

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
    if (userName != "") {
      if (password.length > 7) {
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
        setError("Password length should be at least 8 characters long");
        isLoading(false);
      }
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

      <div className={styles.registerLayout}>

        <div className={styles.formContent}>

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
