import React, { Component, useEffect, useState } from 'react'
import { getProject } from '../../actions/ProjectServices'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { createProject } from '../../actions/ProjectServices';

function UpdateProject(props) {

  const [project, setProject] = useState([])
  const defaultValues = {
    id: project.id,
    projectName: project.projectName,
    projectIdentifier: project.projectIdentifier,
    description: project.description,
    start_date: project.start_date,
    end_date: project.end_date,
    errors: {}
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
  });
  
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {   
    props.getProject(id, navigate).then((result) => {
      setProject(result)
      reset(result)
    }).catch((err) => {
      console.log(err)
    })
    if (props.errors) {
      // setValue({ errors: props.errors })
       console.log(props.errors)
    }
  }, [reset])

  const onSubmit = (data) => {
      props.createProject(data, navigate)
    };
  
      return (
    
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Update Project form</h5>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                      <input type="text" className="form-control form-control-lg "
                        placeholder="Project Name" name="projectName"
                        {...register("projectName") } defaultValue={defaultValues.projectName}
                         />
                  </div>
                  <div className='text-danger'>{props.errors.projectName}</div>
                  <div className="form-group">
                      <input type="text" className="form-control form-control-lg"
                        placeholder="Unique Project ID"
                      name="projectIdentifier" disabled
                      {...register("projectIdentifier") } defaultValue={defaultValues.projectIdentifier}/>
                  </div>
                  <div className='text-danger'>{props.errors.projectIdentifier}</div>
                  <div className="form-group">
                      <textarea className="form-control form-control-lg"
                        placeholder="Project Description"
                      name="description"
                      {...register("description") } defaultValue={defaultValues.description}/>
                    </div>
                    <div className='text-danger'>{props.errors.description}</div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                      <input type="date" className="form-control form-control-lg"
                        name="start_date" {...register("start_date") } defaultValue={defaultValues.start_date}
                    />
                    </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                      <input type="date" className="form-control form-control-lg"
                        name="end_date" {...register("end_date") } defaultValue={defaultValues.end_date}/>
                  </div>
                  <input type="submit" className="btn btn-primary btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
          </div>
      );
    };

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project.project,
  errors:state.errors
})
export default connect(mapStateToProps, {getProject, createProject})(UpdateProject)