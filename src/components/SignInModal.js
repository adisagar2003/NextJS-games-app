import styles from "@/styles/SignIn.module.css";
import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";

function SignInModal(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(false);
  const [error, setError] = useState(false);
  const [cookie, setCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  let data = { userName: userName, password: password };

  function changeText(e, targetFunction) {
    console.log(e.target.value);
    targetFunction(e.target.value);
  }
  async function Login() {
    //1. Fetch data from api
    setLoading(true);
    const response = await fetch("/api/auth", {
      method: "Post",
      body: JSON.stringify({ userName: userName, password: password }),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status == 400) {
      setError(true);
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      let user_data = await response.json();
      setCookie("access_token", user_data.token, {
        sameSite: true,
        maxAge: 120000,
        path: "/",
      });
      window.sessionStorage.setItem(
        "userData",
        JSON.stringify({ isLoggedIn: true, ...user_data.userData })
      );

      location.reload();

      setLoading(false);
    }

    //2.
  }
  return (
    <div className={styles.SignInLayout}>
      <div className={styles.SignIn}>
        {error && (
          <div
            style={{
              backgroundColor: "maroon",
              height: 50,
              color: "#ffffff",
              fontWeight: 700,
              position: "absolute",
              top: 0,
              width: "100%",
            }}
          >
            Error
          </div>
        )}
        <div
          onClick={() => props.setSignInModal(false)}
          className={styles.close}
        >
          X
        </div>
        <div className={styles.logo}>
          <Logo width="100" height="100" />
        </div>
        <div className={styles.formData}>
          <input type="text" onChange={(e) => changeText(e, setUserName)} />
          <input type="password" onChange={(e) => changeText(e, setPassword)} />
          <button className={styles.loginButton} onClick={Login}>
            {loading ? <ClipLoader /> : <p>Login</p>}
          </button>
        </div>
        <div className={styles.action}>
          don't have an account?{" "}
          <Link
            style={{
              textDecoration: "underline",
              fontWeight: 1000,
              textTransform: "capitalize",
            }}
            href="register"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
