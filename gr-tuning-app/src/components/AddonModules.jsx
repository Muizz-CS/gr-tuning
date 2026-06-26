export default function AddonModules({ isEcoMode }) {
  const allModules = [
    {
      code: 'MOB-DISP',
      name: 'On-Site Mobile Service',
      function: isEcoMode
        ? 'We come to your yard or depot, inspect the vehicle details, and complete the ECU work with minimal fleet downtime.'
        : 'We come to your home or office with the equipment needed to read, write, and test your ECU calibration.',
      category: 'both'
    },
    {
      code: 'DPF-MOD',
      name: isEcoMode ? 'DPF Management' : 'DPF Software Calibration',
      function: isEcoMode
        ? 'DPF parameters can be optimized to help regeneration cycles run more predictably in stop-start fleet use.'
        : 'For compatible setups, DPF-related software can be calibrated around exhaust flow, diagnostics, and stage tuning requirements.',
      category: 'both'
    },
    {
      code: 'EGR-MOD',
      name: isEcoMode ? 'EGR Flow Optimization' : 'EGR Software Calibration',
      function: isEcoMode
        ? 'EGR duty cycles can be adjusted to support cleaner running, lower carbon buildup, and better thermal efficiency.'
        : 'EGR-related software can be adjusted for compatible performance builds where intake air flow and response are the priority.',
      category: 'both'
    },
    {
      code: 'SPD-LIM',
      name: 'Fleet Speed Limiter',
      function: 'Electronic speed limits help with driver control, compliance, tyre wear, and high-speed fuel use.',
      category: 'eco'
    },
    {
      code: 'POPS-BNG',
      name: 'Pops & Bangs',
      function: 'Controlled overrun calibration for compatible petrol performance cars with the right exhaust setup.',
      category: 'perf'
    },
    {
      code: 'LAUNCH-C',
      name: 'Hardcut / Launch Control',
      function: 'Custom RPM limiting to help build boost and improve launch consistency on suitable vehicles.',
      category: 'perf'
    },
    {
      code: 'DECAT-CAL',
      name: 'Decat Software',
      function: 'Sensor and diagnostic calibration for compatible high-flow or decat exhaust systems.',
      category: 'perf'
    }
  ];

  return (
    <div className="addon-section">
      <h3>
        // Extra Software Modules & Services
      </h3>

      <div className="addon-list">
        {allModules.map((m) => {
          const isRelevant = m.category === 'both' || (isEcoMode && m.category === 'eco') || (!isEcoMode && m.category === 'perf');
          const highlightColor = isRelevant ? 'var(--brand-glow)' : 'rgba(255,255,255,0.1)';

          return (
            <div
              key={m.code}
              className="addon-row"
              style={{
                borderLeftColor: highlightColor,
                opacity: isRelevant ? 1 : 0.35
              }}
            >
              <div className="addon-row__header">
                <span className={isRelevant ? '' : 'addon-row__name--muted'}>
                  {m.name}
                </span>

                <span
                  className="addon-row__code"
                  style={{
                    color: isRelevant ? highlightColor : 'var(--text-muted)',
                    backgroundColor: isRelevant ? `${highlightColor}11` : 'transparent',
                    borderColor: isRelevant ? `${highlightColor}33` : 'rgba(255,255,255,0.1)'
                  }}
                >
                  {m.code}
                </span>
              </div>
              <p>{m.function}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
