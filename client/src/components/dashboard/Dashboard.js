import React, { Fragment, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';

const DashBoard = ({
  auth: { user },
  profile: { profile, loading },
  isAuthenticated
}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [getCurrentProfile]);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'></div>
          <button className='btn btn-danger' onClick={() => deleteAccount()}>
            <i className='fas fa-user-minus'></i> Delete My Account
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <p>You don't have a cover, please create one</p>
          <Link to='/create-cover' className='btn btn-primary my-1'>
            Create Cover
          </Link>

        </Fragment>
      )}
      </div>
    </Fragment>
  );
};

DashBoard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  DashBoard
);
