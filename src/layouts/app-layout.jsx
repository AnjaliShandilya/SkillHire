import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container px-4 m-auto ">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-blue-100 text-blue-600 font-semibold  text-lg mt-7">
        Made with 💗 by Anjali Shandilya
      </div>
    </div>
  );
};

export default AppLayout;
