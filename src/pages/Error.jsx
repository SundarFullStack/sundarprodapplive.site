import React from "react";
import { useNavigate } from "react-router-dom";


// ERROR COMPONENT FOR INDICATING USER FOR EXPIRED LOGIN

const Error = () => {
  const navigator = useNavigate();

  // HANDLING LOGIN BUTTON FUNCTIONALITY

  const handleError = () => {
    navigator("/login");
  };

  return (
    <div>
      <div className="containerE">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="card text-center"
              style={{ height: "155px", marginTop: "80px" }}
            >
              <div className="col align-self-center">
                <h3
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  Invalid User, Login again...
                </h3>

                {/* LOGIN BUTTON */}

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleError();
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
