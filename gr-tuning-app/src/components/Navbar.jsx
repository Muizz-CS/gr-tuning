import Logo from './Logo';

export default function Navbar({ isEcoMode, showLogo }) {
  return (
    <nav className={`main-nav ${showLogo ? 'main-nav--scrolled' : ''}`}>
      <a
        className={`nav-logo ${showLogo ? 'nav-logo--visible' : ''}`}
        href="#home"
        aria-label="GR Tuning home"
      >
        <Logo isEcoMode={isEcoMode} height={52} />
      </a>

      <div className="nav-links" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
