import { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Make sure this path targets your config file

export default function LeadModal({ isOpen, onClose, isEcoMode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Build the payload mapping accurately to your PostgreSQL schema column names
    const cleanPayload = {
      name: formData.name,
      contact_number: formData.contactNumber,
      email: formData.email,
      is_eco_mode: isEcoMode,
      
      // Zero out alternative inputs based on active mode context prior to writing
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

      alert('Tuning request successfully logged. Our lead calibrator will review your details shortly.');
      
      // Clean up local modal state upon successful network write operations
      setFormData({
        name: '',
        contactNumber: '',
        email: '',
        companyName: '',
        fleetSize: '',
        vehicleModel: '',
        hardwareSpecs: ''
      });
      onClose();
    } catch (err) {
      console.error('Backend submission failure:', err.message);
      alert('Transmission failed. Please check your network connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="lead-modal" style={{ borderColor: activeColor, boxShadow: `0 0 30px ${activeColor}22` }}>
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close booking form"
          disabled={isSubmitting}
        >
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
          <div>
            <label>Your Name</label>
            <input 
              type="text" 
              required 
              className="form-input" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          <button type="submit" className="primary-cta modal-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : (isEcoMode ? 'Submit Fleet Details' : 'Submit Vehicle Details')}
          </button>
        </form>
      </div>
    </div>
  );
}