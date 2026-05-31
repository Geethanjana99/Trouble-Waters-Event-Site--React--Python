import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import NavigateSection from './components/NavigateSection/NavigateSection';
import ReasonsSection from './components/ReasonsSection/ReasonsSection';
import QuoteSection from './components/QuoteSection/QuoteSection';
import Speakers from './components/Speakers/Speakers';
import Agenda from './components/Agenda/Agenda';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Dynamic Blurred Header Navigation */}
      <Header />
      
      {/* Main Content Sections */}
      <main style={{ flexGrow: 1 }}>
        {/* Event Headline & Countdown */}
        <Hero />
        
        {/* Editorial Strategic Insight Section */}
        <NavigateSection />
        
        {/* Reasons to Attend Section */}
        <ReasonsSection />
        
        {/* High-impact Editorial Quote Section */}
        <QuoteSection />
        
        {/* Experts Grid */}
        <Speakers />
        
        {/* Dynamic Accordion Schedule */}
        <Agenda />
        
        {/* Interactive validated Form */}
        <RegisterForm />
      </main>
      
      {/* Semantic footer */}
      <Footer />
    </div>
  );
}
