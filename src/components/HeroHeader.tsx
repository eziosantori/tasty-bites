import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-dark to-primary py-8 md:py-16">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Find Delicious Recipes
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 ">
            Search by ingredients or dish name to discover your next favorite
            meal
          </p>

          <SearchBar />
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div
          style={{
            backgroundImage: "url('/bg_hero.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 opacity-20"
        ></div>
        <div className="absolute inset-0 bg-primary opacity-70"></div>
      </div>
    </section>
  );
};

export default HeroSection;
