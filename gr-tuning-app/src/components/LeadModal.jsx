import { useState } from 'react';

export default function LeadModal({ isOpen, onClose, isEcoMode }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lead captured for calibration profiling:', formData);
    alert('Request received. GR Tuning will review your details and get back to you.');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="lead-modal" style={{ borderColor: activeColor, boxShadow: `0 0 30px ${activeColor}22` }}>
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close booking form"
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
            <input type="text" required className="form-input" onChange={e => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="form-grid-two">
            <div>
              <label>Contact Number</label>
              <input type="tel" required className="form-input" onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} />
            </div>
            <div>
              <label>Email Address</label>
              <input type="email" required className="form-input" onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
          </div>

          {isEcoMode && (
            <div className="form-grid-two form-grid-fleet">
              <div>
                <label>Company Name</label>
                <input type="text" required className="form-input" onChange={e => setFormData({ ...formData, companyName: e.target.value })} />
              </div>
              <div>
                <label>Fleet Size</label>
                <input type="number" placeholder="e.g. 5" required className="form-input" onChange={e => setFormData({ ...formData, fleetSize: e.target.value })} />
              </div>
            </div>
          )}

          {!isEcoMode && (
            <>
              <div>
                <label>Vehicle Model & Year</label>
                <input type="text" placeholder="e.g. 2012 Golf 6 GTI 2.0" className="form-input" required onChange={e => setFormData({ ...formData, vehicleModel: e.target.value })} />
              </div>
              <div>
                <label>Current Hardware</label>
                <input type="text" placeholder="e.g. downpipe, intake, stock turbo" className="form-input" required onChange={e => setFormData({ ...formData, hardwareSpecs: e.target.value })} />
              </div>
            </>
          )}

          <button type="submit" className="primary-cta modal-submit">
            {isEcoMode ? 'Submit Fleet Details' : 'Submit Vehicle Details'}
          </button>
        </form>
      </div>
    </div>
  );
}
