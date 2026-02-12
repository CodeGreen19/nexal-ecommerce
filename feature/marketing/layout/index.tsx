import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function MarketingLayout(props: LayoutProps<"/">) {
  return (
    <main>
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl m-auto ">{props.children}</div>
      </div>
      <Footer />
    </main>
  );
}
