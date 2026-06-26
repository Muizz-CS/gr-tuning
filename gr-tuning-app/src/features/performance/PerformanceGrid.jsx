export default function PerformanceGrid() {
  const vehicles = [
    { id: 'hatch', type: 'Hot Hatch (Golf GTI / Polo)', kw: '+35 kW', nm: '+80 Nm' },
    { id: 'sedan', type: 'Premium Turbo Sedan (BMW / Audi)', kw: '+55 kW', nm: '+110 Nm' },
    { id: 'bakkie', type: 'Utility / Bakkie (Hilux / Ranger)', kw: '+25 kW', nm: '+90 Nm' },
  ];

  return (
    <div>
      <h3 style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', letterSpacing: '0.1em', marginBottom: '2rem' }}>
        // Select Category to View Estimated Stage 1 Gains
      </h3>
      
      <div className="grid-layout">
        {vehicles.map((v) => (
          <div 
            key={v.id}
            className="card performance-hover-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {/* Standard Initial View: Show only the vehicle category type */}
            <div className="perf-card-initial" style={{ textAlign: 'center', transition: 'all 0.3s ease' }}>
              <h4 style={{ fontSize: '0.9rem', margin: 0, letterSpacing: '0.05em', color: '#ffffff' }}>
                {v.type}
              </h4>
              <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--perf-glow)', fontFamily: 'monospace', marginTop: '0.35rem', letterSpacing: '0.05em' }}>
                HOVER TO EXPAND TELEMETRY
              </span>
            </div>

            {/* Hover Specs View: Slides up instantly over the initial title */}
            <div 
              className="perf-card-specs"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#1c1c1c',
                border: '1px solid var(--perf-glow)',
                boxSizing: 'border-box',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: '4px'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '0.25rem' }}>STAGE 1 POWER</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--perf-glow)' }}>{v.kw}</span>
              </div>
              <div style={{ height: '60%', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '0.25rem' }}>STAGE 1 TORQUE</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>{v.nm}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}