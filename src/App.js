import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/includes/Header';
import AppRoutes from './routers/AppRouter';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import { connect } from 'react-redux';

function App(props) {
  const { auth } = props;
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <AppRoutes/>
        <footer className="footer">
          <span>University of Vocationl Technology | 2017-B2 Batch | Final Project</span>
        </footer>
        <NotificationContainer/>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
      auth: state,
  }
}

export default connect(mapStateToProps)(App)