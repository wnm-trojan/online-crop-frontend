import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
    display: flex;
    color: #eeeeee;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px;
    list-style: none;
    height: 45px;
    text-decoration: none;
    font-size: 16px;
    border-left: 4px solid #141423;

    &:hover {
        background: #000000;
        border-left: 4px solid #5d9d02;
        cursor: pointer;
        color: #5d9d02;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    background: #141423;
    height: 45px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 14px;

    &:hover {
        background: #000000;
        cursor: pointer;
        color: #5d9d02;
    }
`;

const SubMenu = ({ item }) => {

    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

    return (
        <>
            <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                    ? item.iconOpened
                    : item.subNav
                    ? item.iconClosed
                    : null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                )
            })}
        </>
    )
}

export default SubMenu
