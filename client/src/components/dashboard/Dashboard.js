import React, { Fragment, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

const DashBoard = ({
  auth: { user },
  isAuthenticated
}) => {

  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  
  return (
    <Fragment>
      <div className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.name}</i>
      </p>
      <Fragment>
        <p>You don't have a cover, please create one</p>
        <Link to='/create-cover' className='btn btn-primary my-1'>
          Create Cover
        </Link>

      </Fragment>
      </div>
    </Fragment>
  );
};

DashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { })(
  DashBoard
);
