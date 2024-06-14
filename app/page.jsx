import Image from "next/image";
import { logout } from "./logout/actions";
import SignUpPage from "./signup/pages";
import Navbar from "../components/navbar/page";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      {/* <form action={logout}>
          <button type="submit">
            Logout
          </button>
      </form> */}
      <SignUpPage />
      
    </div>
  );
}