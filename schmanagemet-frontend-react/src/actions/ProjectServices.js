import axios from "axios";
import { GET_ERRORS } from "./types";
import * as types from './types';
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const createProject = (project, navigate) => async dispatch => {
    
            try {
                const res = await axios.post("http://localhost:8082/api/project", project);
                navigate("/")
                dispatch({
                    type: types.GET_ERRORS,
                    payload: {}
                })
            } catch (error) {
                dispatch({
                    type: types.GET_ERRORS,
                    payload: error.response.data
                })
            }
};


export const getProjects = () => async dispatch => {
    const res = await axios.get("http://localhost:8082/api/project/all")
    dispatch({
        type: types.GET_PROJECTS,
        payload: res.data
    })
}

export const getProject = (id, navigate) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8082/api/project/${id}`)
        dispatch({
            type: types.GET_PROJECT,
            payload: res.data
        })
        // console.log(JSON.stringify(res.data))
        return res.data;
    } catch (error) {
        navigate("/")
    }
 
}

export const deleteProject = (id) => async dispatch => {
  await axios.delete(`http://localhost:8082/api/project/${id}`)
    dispatch({
        type: types.DELETE_PROJECT,
        payload: id
    })
}