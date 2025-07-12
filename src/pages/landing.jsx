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
    <main className="flex flex-col gap-10 sm:gap-12 py-2">
      <section className="text-center bg-blue-400">
        <h1 className="flex flex-col items-center justify-center text-white font-extrabold text-4xl sm:text-6xl lg:text-7xl">
          <img
              src="/logo.png"
              className="h-14 sm:h-20 lg:h-32 rounded-xl "
              alt="Hirrd Logo"
            />
          <span className="flex items-center gap-2 sm:gap-6 my-2">
            Where Jobs Find Skills and Skills Find Jobs
          </span>
        </h1>
        <p className="text-white sm:mt-3 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        <Link to={"/jobs"}>
          <Button variant="blue" className="bg-blue-600" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant="destructive" className="bg-red-600" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-7"
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="  border-transparent border-2 hover:border-blue-400 rounded-2xl bg-blue-100">
          <CardHeader>
            <CardTitle className="font-bold text-blue-600">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card className="  border-transparent border-2 hover:border-blue-400 rounded-2xl bg-blue-100 " >
          <CardHeader >
            <CardTitle className="font-bold text-blue-600">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      <Accordion type="multiple" className="w-full text-base text-white">
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
