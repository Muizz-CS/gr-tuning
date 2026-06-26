import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import ToggleButton from './components/ToggleButton';
import PerformanceGrid from './features/performance/PerformanceGrid';
import EcoCalculator from './features/eco/EcoCalculator';
import AddonModules from './components/AddonModules';
import SectorRemapping from './components/SectorRemapping';
import LeadModal from './components/LeadModal';

export default function App() {
  const [isEcoMode, setIsEcoMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showPerformanceHint, setShowPerformanceHint] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-glow', isEcoMode ? '#00ff66' : '#00d2ff');
  }, [isEcoMode]);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 140);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleModeChange = (nextMode) => {
    setIsEcoMode(nextMode);
    setShowPerformanceHint(false);
  };

  return (
    <div>
      <ToggleButton isEcoMode={isEcoMode} setIsEcoMode={handleModeChange} />
      {showPerformanceHint && (
        <div className="performance-hint" aria-hidden="true">
          <span>Try Performance remaps</span>
        </div>
      )}
      <Navbar isEcoMode={isEcoMode} showLogo={hasScrolled} />

      <section className="container-center hero-section" id="home">
        <div className={`hero-logo ${hasScrolled ? 'hero-logo--hidden' : ''}`}>
          <Logo isEcoMode={isEcoMode} height={96} />
        </div>

        <h1 className="hero-title">
          {isEcoMode ? (
            <>
              Smarter Fuel Use.<br />
              <span>Professional ECU Tuning.</span>
            </>
          ) : (
            <>
              Stronger Response.<br />
              <span>Safe Performance Maps.</span>
            </>
          )}
        </h1>

        <p className="hero-kicker">
          // Efficiency when you need it. Power when you want it.
        </p>

        <p className="hero-copy">
          {isEcoMode
            ? 'We tune your ECU to help work vehicles use less diesel, protect engine components, and stay on the road. Our mobile setup comes to your yard or depot, so your fleet loses less time.'
            : "We remap your vehicle's ECU for sharper throttle response, stronger torque, and usable power. Each file is matched to your vehicle, hardware, and driving goals."}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="primary-cta hero-cta-btn"
        >
          {isEcoMode ? 'Request Fleet Assessment' : 'Book Mobile Tuning'}
        </button>
      </section>

      <section className="content-section about-section" id="about">
        <div className="section-heading">
          <span>// About GR Tuning</span>
          <h2>Eco and performance tuning, built around how the vehicle is actually used.</h2>
        </div>
        <div className="about-grid">
          <p>
            GR Tuning focuses on ECU calibration for two clear needs: saving fuel in daily work vehicles and unlocking reliable performance in enthusiast vehicles.
          </p>
          <p>
            The approach stays technical where it matters: boost control, torque limits, injection timing, throttle mapping, and diagnostic checks are adjusted with the vehicle's condition and purpose in mind.
          </p>
        </div>
      </section>

      <section className="content-section services-section" id="services">
        <SectorRemapping isEcoMode={isEcoMode} />
        <div className="feature-block">
          {isEcoMode ? <EcoCalculator /> : <PerformanceGrid />}
        </div>
        <div className="feature-block">
          <AddonModules isEcoMode={isEcoMode} />
        </div>
      </section>

      <section className="content-section ops-section" id="how-it-works">
        <div className="section-heading">
          <span>// How It Works</span>
          <h2>Mobile, drop-off, and bench tuning with a safety check before every flash.</h2>
        </div>
        <div className="ops-grid">
          {[
            ['1', 'Send Vehicle Details', 'Share the model, engine, current hardware, and whether you want Eco or Performance tuning.'],
            ['2', 'Diagnostic Health Check', 'We scan live data first. If the vehicle is not healthy enough to tune safely, we stop.'],
            ['3', 'ECU Read & Calibration', 'The original ECU file is read, backed up, and matched to the correct software map.'],
            ['4', 'Flash, Verify, Support', 'The tuned file is written, checked, and kept on record for updates or flash-back support.']
          ].map(([step, title, text]) => (
            <article className="ops-card" key={title}>
              <strong>{step}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section channel-section">
        <div className="section-heading">
          <span>// Service Channels</span>
          <h2>Built for Garden Route customers who need convenience without workshop delays.</h2>
        </div>
        <div className="channel-grid">
          <article>
            <h3>Premium Mobile</h3>
            <p>On-site tuning at your driveway, farm, workshop bay, or commercial yard.</p>
          </article>
          <article>
            <h3>Knysna Drop-Off</h3>
            <p>Bring the vehicle to the local base when you want the sharpest base price.</p>
          </article>
          <article>
            <h3>ECU Mail-In</h3>
            <p>Bench tuning for out-of-town workshops and DIY mechanics who courier the ECU.</p>
          </article>
        </div>
      </section>

      <section className="content-section guardrail-section">
        <div>
          <span className="section-label">// Diagnostic Guardrails</span>
          <h2>We only tune when the vehicle passes the health check.</h2>
          <p>
            The pre-tune diagnostic scan is valued at R500 and is waived when the tune is completed successfully. If a serious mechanical fault shows up, the tune is stopped before risk is added to the engine, turbo, injectors, clutch, or gearbox.
          </p>
        </div>
        <div className="zone-list">
          <span>Zone 1: Knysna, Plett, Sedgefield - R350 call-out</span>
          <span>Zone 2: George, Wilderness - R750 call-out</span>
          <span>Zone 3: Mossel Bay, Oudtshoorn, Riversdale, Tsitsikamma - R1,400 call-out</span>
        </div>
      </section>

      <section className="content-section warranty-section">
        <div className="section-heading">
          <span>// Warranty & Responsibility</span>
          <h2>Lifetime software warranty, honest mechanical boundaries.</h2>
        </div>
        <div className="about-grid">
          <p>
            GR Tuning warrants the installed software file against corruption or accidental loss. Original factory ECU data and diagnostic notes are kept for future support.
          </p>
          <p>
            Mechanical parts remain the responsibility of the vehicle owner. All tuning is subject to vehicle condition, compatibility, safe diagnostics, and legal use.
          </p>
        </div>
      </section>

      <section className="content-section contact-section" id="contact">
        <div>
          <span className="section-label">// Contact</span>
          <h2>Ready to check what your vehicle or fleet can gain?</h2>
          <p>
            Send the basics through and GR Tuning can advise whether an economy map, performance map, or supporting software service is the right fit.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="primary-cta hero-cta-btn"
        >
          Start a Booking Request
        </button>
      </section>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isEcoMode={isEcoMode} />
    </div>
  );
}
