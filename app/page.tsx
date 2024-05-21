import { NewestProducts } from "./components/NewestProducts";
import { ProductRow } from "./components/ProductRow";


export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Discover the Ultimate Resource for</h1>
        <h1 className="text-primary">Templates, UI Kits & Icons</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
        HoltzDigital stands out as the premier digital marketplace for both buyers and sellers of high-quality digital design assets related to marketing needs. 
        </p>
      </div>
      <ProductRow category="newest" />
      <ProductRow category="templates" />
      <ProductRow category="icons" />
      <ProductRow category="uikits" />
    </section>
  );
}
