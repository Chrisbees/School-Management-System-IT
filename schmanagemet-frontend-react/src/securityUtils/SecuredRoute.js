import React from 'react'
import { Route, Navigate, Outlet } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import Landing from '../components/Layout/Landing';


const SecuredRoute = (security) => {
    return security.validToken ? <Outlet /> : <Landing />
};

SecuredRoute.propTypes = {
    security: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    security: state.security
})
export default connect(mapStateToProps)(SecuredRoute)