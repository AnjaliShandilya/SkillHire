import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (<>
   <div className="items-center flex justify-center lg:text-4xl text-2xl">Your next job or next hire 💻 <span className="text-cyan-400">starts here.</span></div>
    <span className="flex justify-center items-center text-gray-400 mt-6">One platform. Two goals. Endless possibilities.</span>
{/* <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
  <h2 className="text-white text-5xl font-bold mb-16 text-center">I am a...</h2> */}

  <div className="flex flex-col md:flex-row justify-center w-full max-w-6xl h-full gap-5 px-3">
    
  
    <div className="w-full md:w-1/2 flex justify-center">
      <img src="onboarding.png" alt="Onboarding" className="w-4/5 max-w-md" />
    </div>

    <div className="w-full md:w-1/2 grid lg:grid-cols-2 grid-flow-col lg:mt-12 gap-6 sm:mt-20">
      <Button
        className="h-24 text-xl bg-cyan-500 text-black border-2 border-transparent hover:bg-cyan-400 hover:border-cyan-500"
        onClick={() => handleRoleSelection("candidate")}
      >
        Candidate
      </Button>
      <Button
        className="h-24 text-xl bg-[#CDFF] text-black  hover:bg-cyan-200"
        onClick={() => handleRoleSelection("recruiter")}
      >
        Recruiter
      </Button>
    </div></div>
   <div className="flex justify-end items-start lg:-mt-56 px-3">
  <img
    src="carrer.png"
    alt="Career Visual"
    className="object-contain"
  />
</div>

</>

    
  );
};

export default Onboarding;
