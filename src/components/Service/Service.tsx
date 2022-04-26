const services = [
  { service: "Original Guaranteed", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, error? lorem" },
  { service: "Free shipping", description: "Lorem ipsum dolor sit,  elit. Placeat, error?" },
  { service: "Easy Payment", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, error?" },
  { service: "Easy Return", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, error?" },
];

function Service() {
  return (
    <section id="service" className="mx-auto px-6 py-12 md:py-16">
      <ul className="flex flex-wrap justify-around gap-y-12 lg:gap-y-8">
        {services.map((service, index) => {
          return (
            <li className="md:w-[45%] w-full flex flex-col items-center lg:w-[23%] align text-center" key={index}>
              <div className="text-5xl mb-4">😎</div>
              <h3 className="text-2xl font-medium">{service.service}</h3>
              <p>{service.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Service;
