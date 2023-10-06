import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/mycovers'>
          <span className='hide-sm'>My Covers</span>
        </Link>
      </li>
      <li>
        <Link to='/mockups'>
          <span className='hide-sm'>Mockups</span>
        </Link>
      </li>
      {/* <li>
        <Link to='/createmockup'>
          <span className='hide-sm'>Create Mockups</span>
        </Link>
      </li> */}
      <li>
        <Link to='/create-cover'>
          <span className='hide-sm'>Create Cover</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> PERFECTDESIGN
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProp, { logout })(Navbar);
