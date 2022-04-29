import { ReactNode } from "react";
type HomeBannerProps = {
  src: string;
  children?: ReactNode;
};
function HomeBanner({ src, children }: HomeBannerProps) {
  return (
    <div className="relative after:absolute after:left-0 after:right-0 after:top-0 after:bottom-0 after:bg-black after:opacity-40 after:content-['']">
      <img src={`${src}`} className="w-full" alt="home-banner"></img>
      <p className="absolute bottom-1/4 left-4 z-[2] text-2xl font-bold uppercase text-white sm:text-4xl md:left-8 md:text-6xl lg:left-12 lg:text-8xl">
        {children}
      </p>
    </div>
  );
}

export default HomeBanner;
