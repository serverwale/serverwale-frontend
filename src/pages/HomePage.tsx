
import React from 'react';
import useSEO from '../hooks/useSEO';
import Hero from '../components/Home/Hero';
import ServicesOverview from '../components/Home/ServicesOverview';
import IndustryReach from '../components/Home/IndustryReach';
import PartnerEcosystem from '../components/Home/PartnerEcosystem';
import AboutValue from '../components/Home/AboutValue';
import TrustSection from '../components/Home/TrustSection';
import Testimonials from '../components/Home/Testimonials';
import LeadForm from '../components/Home/LeadForm';
import ReadBlog from '../components/Home/ReadBlog';
import SuccessBar from '../components/Home/SuccessBar';
import RunningRibbon from "../components/Home/RunningRibbon";
import QuickCTA from "../components/Home/QuickCTA";
import StatsStrip from "../components/Home/StatsStrip";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import HomeFAQ from '../components/Home/HomeFAQ';
import ProStationSection from '../components/Home/ProStationSection';
import StoreSection from '../components/Home/StoreSection';
import CloudSection from '../components/Home/CloudSection';


const HomePage: React.FC = () => {
  useSEO({
    title: "Serverwale™ | Buy Refurbished Servers Online India | HP Dell Lenovo Server Dealers",
    description: "Buy certified refurbished HP ProLiant, Dell PowerEdge & Lenovo ThinkSystem servers online in India at 60-80% off. 1-year warranty, pan-India delivery, same-day dispatch in Delhi NCR.",
    keywords: "refurbished servers india, buy servers online india, hp server dealers, dell server dealers, server dealers delhi, enterprise servers india, refurbished workstations india, gpu servers india",
    canonical: "https://serverwale.com/",
  });

  return (
    <div className="overflow-x-hidden">
      <Hero />
      < RunningRibbon />
      <QuickCTA />
      <StatsStrip />
      <TrustSection />
      <WhyChooseUs />
      <AboutValue />
      <ServicesOverview />

      {/* ── Reorder these 3 sections as needed ── */}
      <ProStationSection />
      <StoreSection />
      <CloudSection />

      <PartnerEcosystem />
      
      <IndustryReach />
       <Testimonials />
      <SuccessBar />
      <ReadBlog />
       
      <HomeFAQ/>
      
      <LeadForm />
    </div>
  );
};

export default HomePage;
