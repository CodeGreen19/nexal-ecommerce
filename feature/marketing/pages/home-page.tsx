import { Categories } from "../components/home/categories";
import { FeatureProducts } from "../components/home/feature-products";
import { HeroBanner } from "../components/home/hero-banner";
import {
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "../components/home/section-header";

export function HomePage() {
  return (
    <div>
      <HeroBanner />
      <section>
        <SectionHeader>
          <SectionTitle>Categories</SectionTitle>
          <SectionDescription>Category description is added</SectionDescription>
        </SectionHeader>
        <Categories />
      </section>
      <section>
        <SectionHeader>
          <SectionTitle>Feature Products</SectionTitle>
          <SectionDescription>Feature products is added</SectionDescription>
        </SectionHeader>
        <FeatureProducts />
      </section>
    </div>
  );
}
