import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

function PrivateRouteDealer(props) {
  const { auth } = props;
  return auth.isLoggedin ? (
    auth.user.user.type_id == 3 ? <Outlet /> : NotificationManager.warning('Please login as a dealer.', 'Warning')
  ) : (<Navigate to="/login" />);
}

const mapStateToProps = (state) => {
  return {
      auth: state,
  }
}

export default connect(mapStateToProps)(PrivateRouteDealer);