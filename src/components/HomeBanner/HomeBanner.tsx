import { ReactNode } from "react";
type HomeBannerProps = {
  src: string;
  children?: ReactNode;
};
function HomeBanner({ src, children }: HomeBannerProps) {
  return (
    <div className="relative after:content-[''] after:left-0 after:right-0 after:top-0 after:bottom-0 after:absolute after:bg-black after:opacity-40">
      <img src={`${src}`} className="w-full" alt="home-banner"></img>
      <p className="absolute text-white font-bold text-2xl z-[2] uppercase bottom-1/4 left-4 sm:text-4xl md:text-6xl lg:text-8xl md:left-8 lg:left-12">{children}</p>
    </div>
  );
}

export default HomeBanner;
