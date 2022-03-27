import React, { Component, useEffect } from 'react'
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


function Register(props) {
     
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  useEffect(() => {
    if (props.errors) {
       console.log(props.errors)
    }
  })
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const project = getValues();
    const send = props.createNewUser(project, navigate)
    
  };
    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your Account</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Full Name" name="fullName"
                                    required  {...register("fullName")} />
                            </div>
                            <div className='text-danger'>{props.errors.fullName}</div>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="Email Address (Username)" name="username"
                                    {...register("username")} />
                            </div>
                            <div className='text-danger'>{props.errors.username}</div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password"
                                    {...register("password")} />
                            </div>
                            <div className='text-danger'>{props.errors.password}</div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="Confirm Password"
                                    name="confirmPassword"  {...register("confirmPassword")} />
                            </div>
                            <div className='text-danger'>{props.errors.confirmPassword}</div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

  Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired 
  };
  
const mapStateToProps = state => ({
  security: state.security,
    errors: state.errors
  });
  
  export default connect(mapStateToProps,
    { createNewUser })(Register);