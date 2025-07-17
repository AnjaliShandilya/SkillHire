import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-12 ">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center lg:px-20 px-10">
  {/* Left Text (reuse or add more context) */}
  <div>
    <h2 className="text-x4l sm:text-5xl font-bold mb-4">
      Discover The <br /> Truth Behind The <br />
      <span className="text-cyan-400">Hiring Process</span>
    </h2>
    <p className="text-gray-400 mb-6">
      Real reviews. Clear interviews. Smarter job listings — all in one platform.
    </p>
    <div className="flex gap-4 ">
        <Link to={"/jobs"}>
          <Button className="bg-cyan-500 text-black hover:bg-cyan-300 w-32" >
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button className="bg-transparent border-cyan-500 border-2 hover:bg-cyan-300 hover:border-transparent hover:text-black w-32 ">
            Post a Job
          </Button>
        </Link>
      </div>
  </div>

 {/* Right: Image with layered UI cards */}
<div className=" pt-16 px-4 flex justify-center items-center">
  <div className="relative w-full max-w-5xl">
    {/* Blurred Back Card */}
    <div className="absolute top-8 left-8 w-full max-w-[640px] h-[300px] bg-[#1a1f2e] rounded-2xl scale-95 blur-[1.5px] opacity-60 z-0" />
    {/* Foreground Image Card */}
    <div className="relative z-10 rounded-2xl overflow-hidden shadow-lg border border-[#1a1a1a]">
      <img
        src="banner.jpeg"
        alt="workspace"
        className="w-full h-[300px] object-cover"
      />
    </div>

    {/* Floating Job Card */}
    <div className="absolute -top-16 -left-6  bg-[#0f172a] lg:w-[300px] w-[270px] rounded-xl shadow-xl p-5 border border-gray-700 z-20">
      <div className="flex items-center justify-between lg:mb-2 sm:mb-2 mb-0">
        <div className="flex items-center gap-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            className="h-3"
            alt="Microsoft"
          />
          <span className="text-white font-semibold text-sm">Microsoft</span>
        </div>
        <span className="text-gray-400 text-xs">4 mins ago</span>
      </div>
      <h3 className="text-white text-base font-bold">Senior Graphic Designer</h3>
      <p className="text-gray-400 text-xs mb-1">$60,000 - $80,000 / Year</p>
      <div className="flex gap-2 text-xs text-gray-400 mb-4 ">
        <span>Remote</span>
        <span>Graphic/Photoshop</span>
        <span>45 Reviews</span>
      </div>
      <div className="flex gap-2">
        <span className="bg-cyan-400 text-black text-xs px-3 py-1 rounded-md font-medium hover:bg-cyan-300">
          Apply Now
        </span>
        <span className="border border-gray-600 text-white text-xs px-3 py-1 rounded-md hover:bg-gray-800">
          View Details
        </span>
      </div>
    </div>

    {/* Badge on Image - Bottom Right */}
    <div className="absolute bottom-6 right-6 bg-[#111827] px-4 py-1 rounded-xl shadow border border-gray-700 flex items-center gap-3 z-10">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
        alt="Microsoft"
        className="h-5"
      />
      <div>
        <p className="text-white text-sm font-semibold">Microsoft</p>
        <p className="text-yellow-400 text-xs">★★★★★ 5.0 </p>
      </div>
    </div>
  </div>
</div>

</section>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full lg:py-7 py-2 m-0 "
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:px-20 px-10">
        <Card className="  border-cyan-900 border-2 bg-gradient-to-tl from-[#0e1218] to-[#112414]  text-white  rounded-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="font-bold text-white">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card className="  border-cyan-900 border-2 rounded-2xl  bg-gradient-to-tl from-[#0e1218] to-[#11241c]  text-white shadow-2xl" >
          <CardHeader >
            <CardTitle className="font-bold text-white">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      <Accordion type="multiple" className="w-full text-base text-white lg:px-14 px-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default LandingPage;
