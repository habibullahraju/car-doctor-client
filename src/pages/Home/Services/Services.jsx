import React, {useEffect, useState} from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://car-doctor-server-umber-two.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="mx-auto">
      <div className="text-center space-y-4 mt-5">
        <h2 className="text-2xl font-bold text-orange-600">Services</h2>
        <h1 className="text-4xl font-bold">Our Services Area</h1>
        <p className="lg:w-1/2 mx-auto">
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.{" "}
        </p>
      </div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
