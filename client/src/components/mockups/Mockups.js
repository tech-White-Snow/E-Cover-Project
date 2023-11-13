import React, { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

const Mockups
 = ({
  auth: { user },
  isAuthenticated
}) => {

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  
  return (
    <Fragment>
      <div className='container'>
      <h1 className='large text-primary'>My Mockups
      </h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.name}</i>
      </p>
      <Fragment>
        {/* <p>You don't have a cover, please create one</p> */}
        <Link to='/create-cover' className='btn btn-primary my-1'>
          Create Cover
        </Link>

      </Fragment>
      </div>
    </Fragment>
  );
};

Mockups
.propTypes = {
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { })(
  Mockups

);
