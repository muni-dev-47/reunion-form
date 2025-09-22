import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearInputDatas, formInput, postFormData } from '../redux/formSlice';
import LoginModal from './Login';

const Form = () => {

  const dispatch = useDispatch();
  const formData = useSelector(store => store.formData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(formInput({ name, value }));

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData?.name) formErrors.name = 'Full name is required';
    if (!formData?.age) formErrors.age = 'Age is required';
    else if (isNaN(formData?.age) || formData?.age < 1 || formData?.age > 120)
      formErrors.age = 'Please enter a valid age';

    if (!formData?.mobileNumber) formErrors.mobileNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData?.mobileNumber))
      formErrors.number = 'Please enter a valid 10-digit phone number';
    if (!formData?.email) formErrors.email = 'Email is required';
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData?.email))
      formErrors.email = 'Please enter a valid email address';

    if (!formData?.companyName) formErrors.companyName = 'Company name is required';
    if (!formData?.jobTitle) formErrors.jobTitle = 'Job title is required';
    if (!formData?.address) formErrors.address = 'Address is required';
    // if (!formData?.benefit_company) formErrors.benefit_company = 'This field is required';
    // if (!formData?.benefit_industry) formErrors.benefit_industry = 'This field is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const repos = await dispatch(postFormData(formData));
      if (repos.payload?.message === "User with this Mobile Number already exists") {
        setSubmitStatus("already");
      } else {
        setSubmitStatus("success");
      }

      setSubmitted(true);
    }
  };

  const resetForm = () => {
    dispatch(clearInputDatas());
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg border-0 invitation-card">
            <div className="card-header invitation-header text-center py-4">
              <h2 className="card-title mb-1 text-white">Personal Information</h2>
              <p className="invitation-subtitle mb-0">We'd love to know more about you</p>
            </div>

            <div className="card-body p-5">
              {submitted ? (
                submitStatus === "success" ? (
                  <div className="text-center py-4">
                    <div className="success-icon mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <h3 className="text-success mb-3">Successfully Submitted!</h3>
                    <p className="text-muted mb-4">Thank you for providing your information. We'll be in touch soon.</p>
                    <button className="btn btn-outline-primary btn-invitation" onClick={resetForm}>
                      Submit Another Response
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="success-icon mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-exclamation-circle-fill text-warning" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm.93 2.412a.5.5 0 0 0-.86.5l.35 1.25a.25.25 0 0 0 .48 0l.35-1.25a.5.5 0 0 0-.45-.5z" />
                      </svg>
                    </div>
                    <h3 className="text-warning mb-3">Already Submitted!</h3>
                    <p className="text-muted mb-4">This account has already submitted information.</p>
                    <button className="btn btn-outline-primary btn-invitation" onClick={resetForm}>
                      Try Another Account
                    </button>
                  </div>
                )
              ) :
                (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="name" className="form-label invitation-label">Full Name</label>
                        <div className="input-group">
                          <span className="input-group-text invitation-input-icon">
                            <i className="bi bi-person"></i>
                          </span>
                          <input
                            type="text"
                            className={`form-control invitation-input`}
                            id="name"
                            name="name"
                            value={formData?.name || ""}
                            onChange={handleChange}
                            placeholder="Enter your name"
                          />
                        </div>
                        {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                      </div>

                      <div className="col-md-6 mb-4">
                        <label htmlFor="age" className="form-label invitation-label">Age</label>
                        <div className="input-group">
                          <span className="input-group-text invitation-input-icon">
                            <i className="bi bi-calendar3"></i>
                          </span>
                          <input
                            type="number"
                            className={`form-control invitation-input`}
                            id="age"
                            name="age"
                            value={formData?.age || ""}
                            onChange={handleChange}
                            placeholder="Enter your age"
                          />
                        </div>
                        {errors.age && <div className="invalid-feedback d-block">{errors.age}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="mobileNumber" className="form-label invitation-label">Phone Number</label>
                        <div className="input-group">
                          <span className="input-group-text invitation-input-icon">
                            <i className="bi bi-telephone"></i>
                          </span>
                          <input
                            type="tel"
                            className={`form-control invitation-input`}
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData?.mobileNumber || ""}
                            onChange={handleChange}
                            placeholder="Enter your number"
                            maxLength={10}
                          />
                        </div>
                        {errors.mobileNumber && <div className="invalid-feedback d-block">{errors.mobileNumber}</div>}
                      </div>

                      <div className="col-md-6 mb-4">
                        <label htmlFor="email" className="form-label invitation-label">Email ID</label>
                        <div className="input-group">
                          <span className="input-group-text invitation-input-icon">
                            <i className="bi bi-envelope"></i>
                          </span>
                          <input
                            type="text"
                            className={`form-control invitation-input`}
                            id="email"
                            name="email"
                            value={formData?.email || ""}
                            onChange={handleChange}
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                      </div>
                    </div>

                    {/* <div className="mb-4">
                      <label htmlFor="mobileNumber" className="form-label invitation-label">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text invitation-input-icon">
                          <i className="bi bi-telephone"></i>
                        </span>
                        <input
                          type="tel"
                          className={`form-control invitation-input`}
                          id="mobileNumber"
                          name="mobileNumber"
                          value={formData?.mobileNumber || ""}
                          onChange={handleChange}
                          placeholder="Enter your number"
                        />
                      </div>
                      {errors.mobileNumber && <div className="invalid-feedback d-block">{errors.mobileNumber}</div>}
                    </div> */}

                    <div className="mb-4">
                      <label htmlFor="companyName" className="form-label invitation-label">Working Company Name</label>
                      <div className="input-group">
                        <span className="input-group-text invitation-input-icon">
                          <i className="bi bi-building"></i>
                        </span>
                        <input
                          type="text"
                          className={`form-control invitation-input`}
                          id="companyName"
                          name="companyName"
                          value={formData?.companyName || ""}
                          onChange={handleChange}
                          placeholder="Working company name"
                        />
                      </div>
                      {errors.companyName && <div className="invalid-feedback d-block">{errors.companyName}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="jobTitle" className="form-label invitation-label">Job Title</label>
                      <div className="input-group">
                        <span className="input-group-text invitation-input-icon">
                          <i className="bi bi-briefcase"></i>
                        </span>
                        <input
                          type="text"
                          className={`form-control invitation-input`}
                          id="jobTitle"
                          name="jobTitle"
                          value={formData?.jobTitle || ''}
                          onChange={handleChange}
                          placeholder="Job title"
                        />
                      </div>
                      {errors.jobTitle && <div className="invalid-feedback d-block">{errors.jobTitle}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="form-label invitation-label">Address</label>
                      <div className="input-group">
                        {/* <span className="input-group-text invitation-input-icon">
                          <i className="bi bi-house-door"></i>
                        </span> */}
                        <textarea
                          className={`form-control input-background`}
                          id="address"
                          name="address"
                          value={formData?.address || ""}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          rows="3"
                        ></textarea>
                      </div>
                      {errors.address && <div className="invalid-feedback d-block">{errors.address}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="form-label invitation-label">Benefits for the company</label>
                      <div className="input-group">
                        {/* <span className="input-group-text invitation-input-icon">
                          <i className="bi bi-house-door"></i>
                        </span> */}
                        <textarea
                          className={`form-control input-background`}
                          id="benefit_company"
                          name="benefit_company"
                          value={formData?.benefit_company || ""}
                          onChange={handleChange}
                          placeholder="Enter the details"
                          rows="3"
                        ></textarea>
                      </div>
                      {errors.benefit_company && <div className="invalid-feedback d-block">{errors.benefit_company}</div>}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="form-label invitation-label">Benefits for the Industry</label>
                      <div className="input-group">
                        <textarea
                          className={`form-control input-background`}
                          id="benefit_industry"
                          name="benefit_industry"
                          value={formData?.benefit_industry || ""}
                          onChange={handleChange}
                          placeholder="Enter the details"
                          rows="3"
                        ></textarea>
                      </div>
                      {errors.benefit_industry && <div className="invalid-feedback d-block">{errors.benefit_industry}</div>}
                    </div>

                    <div className="d-grid mt-4">
                      <button type="submit" className="btn btn-lg btn-invitation">Submit Information</button>
                    </div>
                  </form>
                )}
            </div>

            <div className="card-footer invitation-footer text-center py-3">
              <p className="mb-2">Your information is secure and will never be shared</p>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </button>
              <LoginModal />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .invitation-card {
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
        }
        
        .invitation-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          border-bottom: none;
        }
        
        .invitation-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
        }
        
        .invitation-label {
          font-weight: 500;
          color: #495057;
          margin-bottom: 8px;
          font-size: 1rem;
        }
        
        .invitation-input {
          border-radius: 0 8px 8px 0;
          padding: 12px 16px;
          border-left: none;
          background: #f8f9fa;
        }

        .input-background {
          background: #f8f9fa;
        }
        
        .invitation-input:focus {
          background: #fff;
          box-shadow: 0 0 0 0.25rem rgba(38, 117, 252, 0.15);
          border-color: #86b7fe;
        }
        
        .invitation-input-icon {
          background: #f8f9fa;
          border-radius: 8px 0 0 8px;
          border-right: none;
          color: #6c757d;
        }
        
        .btn-invitation {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          border: none;
          color: white;
          padding: 14px 20px;
          border-radius: 10px;
          font-weight: 600;
          transition: all 0.3s;
        }
        
        .btn-invitation:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(38, 117, 252, 0.4);
          color: white;
        }
        
        .invitation-footer {
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
          color: #6c757d;
        }
        
        .success-icon {
          animation: scaleUp 0.5s ease;
        }
        
        @keyframes scaleUp {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Form;