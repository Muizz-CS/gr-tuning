import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LeadModal({ isOpen, onClose, isEcoMode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    companyName: '',
    fleetSize: '',
    vehicleModel: '',
    hardwareSpecs: ''
  });

  if (!isOpen) return null;

  const activeColor = 'var(--brand-glow)';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    const cleanPayload = {
      name: formData.name,
      contact_number: formData.contactNumber,
      email: formData.email,
      is_eco_mode: isEcoMode,
      company_name: isEcoMode ? formData.companyName : null,
      fleet_size: isEcoMode ? parseInt(formData.fleetSize, 10) || null : null,
      vehicle_model: !isEcoMode ? formData.vehicleModel : null,
      hardware_specs: !isEcoMode ? formData.hardwareSpecs : null,
    };

    try {
      const { error } = await supabase
        .from('tuning_leads')
        .insert([cleanPayload]);

      if (error) throw error;

      setStatus({
        type: 'success',
        text: 'Tuning request successfully logged! Our lead calibrator will review your details shortly.'
      });

      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (err) {
      console.error('Backend submission failure:', err.message);
      setStatus({
        type: 'error',
        text: 'Transmission failed. Please check your network connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="lead-modal" style={{ borderColor: activeColor, boxShadow: `0 0 30px ${activeColor}22` }}>
        <button onClick={onClose} className="modal-close" aria-label="Close booking form" disabled={isSubmitting}>
          x
        </button>

        <div className="modal-heading">
          <h3>{isEcoMode ? 'Request Fleet Assessment' : 'Book Software Calibration'}</h3>
          <p>
            {isEcoMode
              ? 'Share your fleet details so we can estimate fuel savings and recommend the right ECU calibration.'
              : 'Share your vehicle and hardware details so the tune can be matched to your setup.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="lead-form">
          {status.text && (
            <div 
              className={`status-message ${status.type}`}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '6px',
                marginBottom: '1.25rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                lineHeight: '1.4',
                border: '1px solid',
                backgroundColor: status.type === 'success' ? '#065f4633' : '#991b1b33',
                borderColor: status.type === 'success' ? '#10b981' : '#ef4444',
                color: status.type === 'success' ? '#34d399' : '#f87171'
              }}
            >
              {status.text}
            </div>
          )}

          <div>
            <label>Your Name</label>
            <input 
              type="text" 
              required 
              className="form-input" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              disabled={isSubmitting || status.type === 'success'}
            />
          </div>

          <div className="form-grid-two">
            <div>
              <label>Contact Number</label>
              <input 
                type="tel" 
                required 
                className="form-input" 
                value={formData.contactNumber}
                onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} 
                disabled={isSubmitting || status.type === 'success'}
              />
            </div>
            <div>
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                className="form-input" 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })} 
                disabled={isSubmitting || status.type === 'success'}
              />
            </div>
          </div>

          {isEcoMode && (
            <div className="form-grid-two form-grid-fleet">
              <div>
                <label>Company Name</label>
                <input 
                  type="text" 
                  required 
                  className="form-input" 
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })} 
                  disabled={isSubmitting || status.type === 'success'}
                />
              </div>
              <div>
                <label>Fleet Size</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5" 
                  required 
                  className="form-input" 
                  value={formData.fleetSize}
                  onChange={e => setFormData({ ...formData, fleetSize: e.target.value })} 
                  disabled={isSubmitting || status.type === 'success'}
                />
              </div>
            </div>
          )}

          {!isEcoMode && (
            <>
              <div>
                <label>Vehicle Model & Year</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2012 Golf 6 GTI 2.0" 
                  className="form-input" 
                  required 
                  value={formData.vehicleModel}
                  onChange={e => setFormData({ ...formData, vehicleModel: e.target.value })} 
                  disabled={isSubmitting || status.type === 'success'}
                />
              </div>
              <div>
                <label>Current Hardware</label>
                <input 
                  type="text" 
                  placeholder="e.g. downpipe, intake, stock turbo" 
                  className="form-input" 
                  required 
                  value={formData.hardwareSpecs}
                  onChange={e => setFormData({ ...formData, hardwareSpecs: e.target.value })} 
                  disabled={isSubmitting || status.type === 'success'}
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="primary-cta modal-submit" 
            disabled={isSubmitting || status.type === 'success'}
            style={{
              opacity: (isSubmitting || status.type === 'success') ? 0.6 : 1,
              cursor: (isSubmitting || status.type === 'success') ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Submitting...' : (status.type === 'success' ? 'Saved ✓' : (isEcoMode ? 'Submit Fleet Details' : 'Submit Vehicle Details'))}
          </button>
        </form>
      </div>
    </div>
  );
}