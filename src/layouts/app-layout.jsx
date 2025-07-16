import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container px-4 m-auto ">
        <Header />
        <Outlet />
      </main>
      <div className="p-2 text-center font-semibold  text-[#CDFF] mt-8">
        Made with 💗 by Anjali Shandilya
      </div>
    </div>
  );
};

export default AppLayout;
