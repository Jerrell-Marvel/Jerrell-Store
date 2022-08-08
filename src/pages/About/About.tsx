import { Link } from "react-router-dom";

function About() {
  return (
    <section className="pt-20">
      <div className="px-6 py-8">
        <div className="flex flex-col items-center sm:flex-row">
          <div className="w-full flex-col justify-center sm:flex sm:pr-4 md:pr-6 lg:pr-8">
            <h2 className="mb-2 text-4xl font-bold md:text-5xl lg:text-6xl">Jerrell Store</h2>
            <h3 className="text-dark mb-4 text-xl font-medium md:text-3xl lg:text-3xl">Lorem, ipsum dolor.</h3>
            <p className="mb-4 text-slate-500 md:text-lg lg:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, numquam? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod at cupiditate perferendis ex pariatur minus cumque? Incidunt itaque repudiandae fuga ab illo
              suscipit sint cum sequi voluptates quia quo, possimus vel hic sunt accusamus amet quae iste beatae impedit voluptate.
            </p>
            <Link to="/">
              <button className="my-4 w-full border-2 border-black bg-primary py-4 uppercase text-white transition-colors duration-300 hover:bg-white hover:text-black">start shopping</button>
            </Link>
          </div>

          <div className="h-full w-full sm:pl-4 md:pl-6 lg:pl-8">
            <img src="https://www.designyourway.net/blog/wp-content/uploads/2019/05/iPad-Pro-wallpaper-54-700x700.jpg" alt="" className="mx-auto max-w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
