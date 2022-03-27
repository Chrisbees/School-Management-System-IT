import React, { Component, useEffect } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from 'classnames';
import { login } from "../../actions/securityActions";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

function Login(props) {
     
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()

    useEffect(() => {
        if (props.security.validToken) {
            navigate("/dashboard");
        }
    });

    const navigate = useNavigate();
    const onSubmit = (data) => {
      const project = getValues();
        const send = props.login(project)
      
    };

     return (
         <div className="login">
             <div className="container">
                 <div className="row">
                     <div className="col-md-8 m-auto">
                         <h1 className="display-4 text-center">Log In</h1>
                         <form onSubmit={handleSubmit(onSubmit)}>
                             <div className="form-group mb-3">
                                 <input type="email" className="form-control form-control-lg"
                                     placeholder="Email Address" name="username"
                                     {...register("username")}/>
                             </div>
                             <div className='text-danger'>{props.errors.username}</div>
                             <div className="form-group">
                                 <input type="password" className="form-control form-control-lg"
                                     placeholder="Password" name="password"
                                     {...register("password")}/>
                             </div>
                             <div className='text-danger'>{props.errors.password}</div>
                             <input type="submit" className="btn btn-info btn-block m-4" />
                         </form>
                     </div>
                 </div>
             </div>
         </div>
     );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
      security: state.security,
      errors: state.errors
  });
  
  export default connect(mapStateToProps,
    { login })(Login);