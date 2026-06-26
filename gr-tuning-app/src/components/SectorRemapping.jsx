export default function SectorRemapping({ isEcoMode }) {
  const activeColor = 'var(--brand-glow)';

  const sectors = [
    {
      id: 'passenger',
      title: 'Passenger Vehicles',
      subtitle: 'Daily drivers and performance builds',
      focus: 'Stage 1 / Stage 2 / Throttle Mapping',
      desc: 'Custom ECU maps for smoother response, stronger torque, and better daily drivability without ignoring reliability.',
      relevance: !isEcoMode
    },
    {
      id: 'commercial',
      title: 'Commercial Fleets',
      subtitle: 'Delivery, logistics, and transport vehicles',
      focus: 'Fuel-Save Mapping / Torque Control',
      desc: 'Economy tuning targets the RPM range your loaded vehicles use most, helping reduce diesel spend and mechanical strain.',
      relevance: isEcoMode
    },
    {
      id: 'agricultural',
      title: 'Agricultural Machinery',
      subtitle: 'Tractors, harvesters, and yellow equipment',
      focus: 'Low-End Torque / Heavy-Duty Calibration',
      desc: 'Heavy-duty ECU calibration can improve pulling power and fuel use during long working hours and high-load operation.',
      relevance: isEcoMode
    },
    {
      id: 'marine',
      title: 'Marine Craft',
      subtitle: isEcoMode ? 'Commercial vessels and cruisers' : 'Jet skis and leisure boats',
      focus: isEcoMode ? 'Cruise Efficiency / Range Tuning' : 'Throttle Response / RPM Calibration',
      desc: isEcoMode
        ? 'Fuel and timing maps can be refined for steady cruising RPM, helping extend range and reduce running costs.'
        : 'Performance mapping can improve throttle response and torque delivery for compatible marine engines.',
      relevance: true
    }
  ];

  return (
    <div className="sector-section">
      <h3>
        // Operational Tuning Sectors
      </h3>

      <div className="sector-grid">
        {sectors.map((s) => (
          <div
            key={s.id}
            className="interactive-sector-card sector-card"
            data-active={s.relevance ? 'true' : 'false'}
            style={{
              borderColor: s.relevance ? activeColor : 'rgba(255,255,255,0.05)',
              boxShadow: s.relevance ? `0 0 20px ${activeColor}15` : 'none',
              opacity: s.relevance ? 1 : 0.42,
              cursor: s.relevance ? 'pointer' : 'default'
            }}
          >
            <div>
              <span className="sector-card__focus" style={{ color: s.relevance ? activeColor : 'var(--text-muted)' }}>
                {s.focus}
              </span>
              <h4>
                {s.title}
              </h4>
              <p className="sector-card__subtitle" style={{ color: s.relevance ? activeColor : 'var(--text-muted)' }}>
                {s.subtitle}
              </p>
            </div>
            <p className="sector-card__desc">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
