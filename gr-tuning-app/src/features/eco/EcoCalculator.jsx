import { useState } from 'react';

export default function EcoCalculator() {
  const [spend, setSpend] = useState(20000); 
  const estimatedSavings = Math.round(spend * 0.125 * 12);

  return (
    <div className="calculator-box">
      <h3 style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--eco-glow)', textAlign: 'center', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
        // Fuel Savings Estimate
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Monthly Diesel Spend: R {spend.toLocaleString()} ZAR
          </label>
          <input 
            type="range" 
            min="10000" 
            max="200000" 
            step="5000"
            value={spend} 
            onChange={(e) => setSpend(Number(e.target.value))}
            className="slider-input"
            style={{ accentColor: 'var(--eco-glow)' }}
          />
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Estimated Annual Saving</p>
          <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--eco-glow)', textShadow: '0 0 10px rgba(57,255,20,0.3)' }}>
            R {estimatedSavings.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
