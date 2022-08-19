export default function TestComponent() {
  const elementRef = (node: any) => {
    console.log(node);
  };
  return (
    <div ref={elementRef}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum incidunt modi et maxime sint quis sit illum nulla expedita corrupti ex unde aut voluptatum saepe numquam, repudiandae voluptatibus! Quidem harum sequi repellendus ad
      officia aut doloremque ratione quis numquam corporis veritatis, voluptates alias sunt reiciendis fugit molestias, vel nemo fugiat.
    </div>
  );
}
