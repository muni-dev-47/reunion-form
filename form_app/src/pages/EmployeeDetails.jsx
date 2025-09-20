import React, { useEffect } from "react";

const EmployeeDetails = ({ user, show, onClose }) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");

      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);

      return () => {
        document.body.classList.remove("modal-open");
        if (document.body.contains(backdrop)) {
          document.body.removeChild(backdrop);
        }
      };
    }
  }, [show]);

  if (!show || !user) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fas fa-user me-2"></i>Employee Details
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="row mb-4">
              <div className="col-md-4 text-center">
                <div
                  className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto shadow"
                  style={{ width: "120px", height: "120px", fontSize: "48px" }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "E"}
                </div>
                <h5 className="mt-3" style={{ wordBreak: "break-word" }}>
                  {user.name || "Not provided"}
                </h5>
                <span className="badge bg-info fs-6 mt-1" style={{ wordBreak: "break-word" }}>
                  {user.jobTitle || "Not provided"}
                </span>
              </div>

              <div className="col-md-8">
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">
                    <i className="fas fa-birthday-cake me-2 text-warning"></i>Age:
                  </div>
                  <div className="col-sm-8" style={{ wordBreak: "break-word" }}>
                    {user.age || "Not provided"}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">
                    <i className="fas fa-phone-alt me-2 text-success"></i>Mobile:
                  </div>
                  <div className="col-sm-8" style={{ wordBreak: "break-word" }}>
                    {user.mobileNumber || "Not provided"}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4 fw-bold">
                    <i className="fas fa-building me-2 text-primary"></i>Company:
                  </div>
                  <div className="col-sm-8" style={{ wordBreak: "break-word" }}>
                    {user.companyName || "Not provided"}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 fw-bold">
                    <i className="fas fa-map-marker-alt me-2 text-danger"></i>Address:
                  </div>
                  <div className="col-sm-8" style={{ wordBreak: "break-word" }}>
                    {user.address || "Not provided"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <i className="fas fa-times me-2"></i>Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
