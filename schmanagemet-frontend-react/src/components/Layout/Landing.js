import React, { Component, useEffect } from 'react'
import { Link, useLinkClickHandler } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from 'classnames';
import { login } from "../../actions/securityActions";
import { isDisabled } from '@testing-library/user-event/dist/utils';

function Landing(props) {

    const navigate = useNavigate();

    
        useEffect(() => {
        if (props.security.validToken) {
            navigate("/dashboard")
        }
          
    });
  
    return (
        <div className="landing">
        <div className="light-overlay landing-inner text-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Landing Page</h1>
                        <p className="lead">
                            Create your account to join active projects or start you own
                        </p>
                        <hr />
                        <Link className="btn btn-lg btn-primary m-2" to="/register">
                        Sign Up
                      </Link>
                        <Link to="login" className="btn btn-lg btn-secondary mr-2 link" >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }

  Landing.propTypes = {
    landing: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
      security: state.security,
      errors: state.errors
  });
  
  export default connect(mapStateToProps,
    null)(Landing);