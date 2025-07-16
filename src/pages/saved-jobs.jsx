import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJob,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="sm:px-16 px-6">
      <h1 className="text-white font-extrabold text-2xl sm:text-4xl text-center pb-5">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJob?.length ? (
            savedJob?.map((saved) => {
              return (
                <JobCard
                  key={saved.id}
                  job={saved?.job}
                  onJobAction={fnSavedJobs}
                  savedInit={true}
                />
              );
            })
          ) : (
             <div className="flex flex-col items-center justify-center w-full gap-4">
      <div className="text-2xl font-semibold text-white">No Jobs Found</div>
      <img src="nojobs.png" alt="No Jobs" className="w-72 h-72 object-contain" /></div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
