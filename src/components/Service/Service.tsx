const services = [
  {
    service: "Original Guaranteed",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, error? lorem",
  },
  {
    service: "Free shipping",
    description: "Lorem ipsum dolor sit,  elit. Placeat, error?",
  },
  {
    service: "Easy Payment",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, error?",
  },
  {
    service: "Easy Return",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, error?",
  },
];

function Service() {
  return (
    <section id="service" className="mx-auto px-6 py-12 md:py-20">
      <ul className="flex flex-wrap justify-around gap-y-12 lg:gap-y-8">
        {services.map((service, index) => {
          return (
            <li
              className="align flex w-full flex-col items-center text-center md:w-[45%] lg:w-[20%]"
              key={index}
            >
              <div className="mb-4 text-5xl">😎</div>
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
