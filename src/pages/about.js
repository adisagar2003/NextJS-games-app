import BlurBlob from "@/components/BlurBlob";
import Navbar from "@/components/Navbar";
import SignInModal from "@/components/SignInModal";
import { useState } from "react";
function about() {
  const [signInModal, setSignInModal] = useState(false);

  return (
    <div>
      {signInModal && <SignInModal setSignInModal={setSignInModal} />}
      <BlurBlob />
      <Navbar setSignInModal={setSignInModal} />
    </div>
  );
}

export default about;
