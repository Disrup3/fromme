import { ReactNode } from "react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center ">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
