import "@/styles/globals.css";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

