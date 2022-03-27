import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectServices, { createProject } from '../../actions/ProjectServices';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as types from '../../actions/types';


function AddProject(props) {

  const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  useEffect(() => {
    if (props.errors) {
      // setValue({ errors: props.errors })
       console.log(props.errors)
    }
  })
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const project = getValues();
    const send = props.createProject(project, navigate)
  };
  
    return (
      <div>
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create / Edit Project form</h5>
              <hr />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg "
                      placeholder="Project Name" name="projectName"
                      {...register("projectName") } />
                  </div>
                  <div className='text-danger'>{props.errors.projectName}</div>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg"
                      placeholder="Unique Project ID"
                      name="projectIdentifier" {...register("projectIdentifier")}/>
                </div>
                <div className='text-danger'>{props.errors.projectIdentifier}</div>
                <div className="form-group">
                    <textarea className="form-control form-control-lg"
                      placeholder="Project Description"
                      name="description" {...register("description")}/>
                  </div>
                  <div className='text-danger'>{props.errors.description}</div>
                <h6>Start Date</h6>
                <div className="form-group">
                    <input type="date" className="form-control form-control-lg"
                      name="start_date"
                  {...register("start_date")}/>
                  </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                    <input type="date" className="form-control form-control-lg"
                      name="end_date" {...register("end_date")}/>
                </div>
                <input type="submit" className="btn btn-primary btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
        </div>
       </div> 
    );
  };

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors:state.errors
});

export default connect(mapStateToProps,
  { createProject })(AddProject);




