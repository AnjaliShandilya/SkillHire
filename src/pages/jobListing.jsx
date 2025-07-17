import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    // loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="sm:px-16 px-6">
      <h1 className="text-white font-extrabold text-2xl sm:text-5xl  mb-5 text-center ">
        Latest Jobs
      </h1>
      <form
        onSubmit={handleSearch}
        className="h-14 grid lg:grid-cols-2 grid-cols-1 w-full gap-3 items-center"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className=" text-md"
        />
        <div className="grid grid-flow-col  gap-1 lg:gap-2 w-full text-gray-600">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
          <Button
          className="text-black bg-cyan-400 hover:bg-cyan-300"
          
          onClick={clearFilters}
        >
          X
        </Button>
        <Button type="submit" className="text-white lg:w-28 w-14 bg-transparent border-2 border-cyan-400 hover:bg-gray-800">
          Search
        </Button></div>
 
      </form>

      {loadingJobs && (
        <BarLoader className="mt-10" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        
           <div className=" sm:mt-6 mt-16  grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
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

export default JobListing;
