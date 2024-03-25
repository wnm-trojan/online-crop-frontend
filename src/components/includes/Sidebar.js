import '../../assets/css/includes/Sidebar.css';
import React, {useState} from 'react';
import styled from 'styled-components';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { AdminSidebarData } from '../admin/AdminSidebarData';
import { FamerSidebarData } from "../farmer/FamerSidebarData";
import { DealerSidebarData } from "../dealer/DealerSidebarData";
import { FertilizerSidebarData } from "../fertilizer/FertilizerSidebarData";
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { connect } from 'react-redux';

const Nav = styled.div`
    background: #141423;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled.div`
    margin-left: 0.6rem;
    font-size: 1.5rem;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    display: none;
`;

const NavCloseIcon = styled.div`
    margin-right: 0.6rem;
    font-size: 1.5rem;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    display: none;
`;

const SidebarNav = styled.div`
    background: #141423; 
    width: 265px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 85px;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Sidebar = (props) => {
    const { auth } = props;

    const [sidebar, setSidebar] = useState(true)

    const showSidebar = () => setSidebar(!sidebar)

    return(
        <aside className="main-sidebar">
            <IconContext.Provider value={{ color: '#5d9d02' }}>
            <Nav>
                <NavIcon to='#'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </NavIcon>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavCloseIcon to='#'>
                        <AiIcons.AiOutlineClose onClick={showSidebar} />
                    </NavCloseIcon>
                    {auth.isLoggedin && auth.user.user.type_id == 1 ? (
                        <React.Fragment>
                        {AdminSidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />
                        })}
                        </React.Fragment>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}

                    {auth.isLoggedin && auth.user.user.type_id == 2 ? (
                        <React.Fragment>
                        {FamerSidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />
                        })}
                        </React.Fragment>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}

                    {auth.isLoggedin && auth.user.user.type_id == 3 ? (
                        <React.Fragment>
                        {DealerSidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />
                        })}
                        </React.Fragment>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}

                    {auth.isLoggedin && auth.user.user.type_id == 4 ? (
                        <React.Fragment>
                        {FertilizerSidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />
                        })}
                        </React.Fragment>
                    ) : (
                        <React.Fragment></React.Fragment>
                    )}
                </SidebarWrap>
            </SidebarNav>
            </IconContext.Provider>
        </aside>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (userState, history) => {
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);