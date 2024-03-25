import '../../assets/css/includes/Header.css';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAuthAction } from '../../redux/actions/AuthAction';
import { useTranslation } from "react-i18next";
import * as BsIcons from "react-icons/bs";
import i18next from 'i18next';

const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'gb'
    },
    {
        code: 'sn',
        name: 'සිංහල',
        country_code: 'lk'
    }
]

function Header(props) {
    const { auth, logout } = props;
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
    <div className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    {/* Crop Management And Forecasting System */}
                    <img src="/images/logo.png" alt="Crop Management And Forecasting System" className="img-fluid" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/home">{t('Home')}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/articles">{t('Articles')}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/fertilizers">{t('Fertilizers')}</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Farmer</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Dealer</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Fertilizer</a>
                    </li> */}
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                {!auth.isLoggedin ? (
                    <React.Fragment>
                        <li className="nav-item">
                            <a className="nav-link active sign-in" aria-current="page" href="/register">{t('Sign_Up')}</a>
                        </li>
                        <li className="nav-item ms-2">
                            <a className="nav-link active sign-in" aria-current="page" href="/login">{t('Sign_In')}</a>
                        </li>
                    </React.Fragment>
                    ) : ( 
                    <React.Fragment>
                        <li className="nav-item">
                            <a className="nav-link" href={auth.profile_url}>{auth.user.user.username}</a>
                        </li>
                        <li className="nav-item">
                            <a 
                            className="nav-link" 
                            onClick={() => {
                                logout(navigate);
                            }}>{t('Logout')}</a>
                        </li>
                    </React.Fragment>
                )}
                </ul>
                <div className="dropdown languages">
                    <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <BsIcons.BsTranslate /> {t('Languages')}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {languages.map(({code, name, country_code}) => (
                            <li className='d-flex' key={country_code}>
                                <button className="dropdown-item ps-1" onClick={() => i18next.changeLanguage(code)}> 
                                    <span className={`flag-icon flag-icon-${country_code} mx-2`}></span> {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </nav>
    </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (navigate) => {
            dispatch(logoutAuthAction(navigate))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);