import Features from "@/components/features/Features";
import Hero from "../../components/Hero";
import Testimonial from "@/components/testimonial/Testimonial";
import Pricing from "@/components/pricing/Pricing";
import Faqs from "@/components/faqs/Faqs";



export default function Home() {
  return (
<div>
  <Hero/>
  <Features/>
  <Testimonial/>
  <Pricing/>
  <Faqs/>
</div>
  );
}
