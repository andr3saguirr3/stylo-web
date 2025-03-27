import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <Image 
        src="/hero-image.png" 
        alt="Hero" 
        layout="fill" 
        objectFit="cover" 
        priority 
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50 text-white p-6">
        <h1 className="text-4xl md:text-6xl font-bold">Explora Nuestra Colección</h1>
        <h2 className="text-xl md:text-2xl mt-2">Lentes de Sol de las Mejores Marcas</h2>
      </div>
    </div>
  );
};

export default Hero;
