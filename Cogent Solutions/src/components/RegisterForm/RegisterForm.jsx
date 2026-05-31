import React, { useState } from 'react';
import logoImg from '../../assets/logo.png';
import partnerLogoImg from '../../assets/patner-logo.png';
import waveImg from '../../assets/wave.jpg';
import './RegisterForm.css';

const API_BASE = 'http://localhost:8000/api';

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    professionalFocus: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiResult, setApiResult] = useState(null); // Stores matched session + email

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Corporate Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const validateFinalStep = () => {
    const newErrors = {};
    if (!formData.professionalFocus.trim()) {
      newErrors.professionalFocus = 'Please describe your professional focus';
    } else if (formData.professionalFocus.trim().length < 10) {
      newErrors.professionalFocus = 'Please provide at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFinalStep()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          professional_focus: formData.professionalFocus,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setApiResult(data);
      setSubmitSuccess(true);
      setStep(1);
      setFormData({
        name: '',
        email: '',
        professionalFocus: '',
      });
    } catch (err) {
      setErrors({ submit: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = step === 1 ? 50 : 100;

  return (
    <section id="register" className="register-section">
      <div className="register-cyber-overlay"></div>

      <div className="register-split-container">
        {/* Left Side: Futuristic Multi-Step booking Manifest card */}
        <div className="register-card-panel">

          {/* Opacity Reduced Theme Wave Overlay */}
          <div className="register-card-wave">
            <img src={waveImg} alt="SCM Wave Decor" className="register-wave-img" />
          </div>

          {submitSuccess ? (
            <div className="success-screen">
              <div className="success-icon-globe">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>Pass Secured Successfully!</h3>

              {/* Show AI-matched session if available */}
              {apiResult?.matched_session && (
                <div className="ai-match-card">
                  <span className="ai-match-label">✦ AI-MATCHED SESSION FOR YOU</span>
                  <p className="ai-match-title">{apiResult.matched_session.title}</p>
                  <p className="ai-match-meta">
                    🕐 {apiResult.matched_session.time} &nbsp;·&nbsp;
                    🎤 {apiResult.matched_session.speaker}
                  </p>
                </div>
              )}

              {/* Show AI-generated email preview */}
              {apiResult?.email_body && (
                <div className="ai-email-preview">
                  <span className="ai-match-label">✦ YOUR PERSONALISED INVITATION</span>
                  <pre className="ai-email-body">{apiResult.email_body}</pre>
                </div>
              )}

              {/* Fallback text if no API result */}
              {!apiResult && (
                <p>
                  Your SCM Manifest pass has been successfully generated and signed.
                  A digital boarding pass has been dispatched to your corporate inbox.
                </p>
              )}

              <button
                onClick={() => { setSubmitSuccess(false); setApiResult(null); }}
                className="reset-button"
              >
                Register Another Delegate
              </button>
            </div>
          ) : (
            <div className="form-inner">

              {/* SCM Booking Progress bar */}
              <div className="scm-booking-progress-header">
                <span className="step-label">BOOKING GATEWAY // STEP {step} OF 2</span>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              <h2 className="form-card-title">Register Pass</h2>

              <form onSubmit={handleSubmit} className="form-grid">

                {/* STEP 1: Identification */}
                {step === 1 && (
                  <div className="form-step-slide animate-slide-in">
                    <span className="step-section-title">01 / DELEGATE DETAILS</span>

                    <div className="form-element">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input-field ${errors.name ? 'field-error' : ''}`}
                        placeholder="e.g. Dr. Raman Kumar"
                      />
                      {errors.name && <span className="field-error-text">{errors.name}</span>}
                    </div>

                    <div className="form-element">
                      <label htmlFor="email">Corporate Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input-field ${errors.email ? 'field-error' : ''}`}
                        placeholder="name@company.com"
                      />
                      {errors.email && <span className="field-error-text">{errors.email}</span>}
                    </div>
                  </div>
                )}

                {/* STEP 2: Professional Focus */}
                {step === 2 && (
                  <div className="form-step-slide animate-slide-in">
                    <span className="step-section-title">02 / PROFESSIONAL FOCUS</span>

                    {/* ── AI Personalisation Field ── */}
                    <div className="form-element">
                      <label htmlFor="professionalFocus">
                        Professional Focus / Career Challenges *
                        <span className="ai-field-badge">✦ AI PERSONALISED</span>
                      </label>
                      <textarea
                        id="professionalFocus"
                        name="professionalFocus"
                        value={formData.professionalFocus}
                        onChange={handleChange}
                        className={`input-field textarea-field ${errors.professionalFocus ? 'field-error' : ''}`}
                        placeholder="Describe your role, industry focus, or key supply chain challenges you're facing — e.g. 'I manage warehouse automation and I'm struggling with real-time inventory visibility across our Gulf operations.'"
                        rows={5}
                      />
                      {errors.professionalFocus && (
                        <span className="field-error-text">{errors.professionalFocus}</span>
                      )}
                      <span className="ai-hint-text">
                        Our AI will match you to the most relevant summit session and craft a personalised invitation.
                      </span>
                    </div>

                    {/* Global submit error */}
                    {errors.submit && (
                      <div className="submit-error-banner">
                        ⚠ {errors.submit}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons panel */}
                <div className="form-actions-row">
                  {step > 1 && (
                    <button type="button" onClick={handlePrevStep} className="form-back-action">
                      <span>BACK</span>
                    </button>
                  )}

                  {step < 2 ? (
                    <button type="button" onClick={handleNextStep} className="form-next-action">
                      <span>NEXT GATEWAY</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow-icon"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="form-submit-action">
                      {isSubmitting ? (
                        <>
                          <div className="action-spinner" />
                          <span>GENERATING...</span>
                        </>
                      ) : (
                        <>
                          <span>SECURE PASS</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="btn-arrow-icon"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Side: High-impact Brand Identity Block (Using Nav Logos) */}
        <div className="register-brand-panel">
          <span className="brand-tagline">Supply Chain &amp; Logistics</span>
          <img src={logoImg} alt="Accelalpha Logo" className="register-main-logo" />
          <img src={partnerLogoImg} alt="Oracle Partner Logo" className="register-partner-logo" />
        </div>
      </div>
    </section>
  );
}
