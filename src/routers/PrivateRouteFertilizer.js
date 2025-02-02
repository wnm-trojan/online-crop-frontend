import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

function PrivateRouteFertilizer(props) {
  const { auth } = props;
  return auth.isLoggedin ? (
    auth.user.user.type_id == 4 ? <Outlet /> : NotificationManager.warning('Please login as a fertilizer.', 'Warning')
  ) : (<Navigate to="/login" />);
}

const mapStateToProps = (state) => {
  return {
      auth: state,
  }
}

export default connect(mapStateToProps)(PrivateRouteFertilizer);