import React from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

export const FertilizerSidebarData = [
    {
        title: 'Fertilizer Dashboard',
        path: '/dashboard/fertilizer',
        icon: <FaIcons.FaTachometerAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Manage Profile',
        path: '/dashboard/fertilizer/profile',
        icon: <FaIcons.FaUserAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Fertilizer Ads',
        path: '/dashboard/fertilizer/fertilizer-ads',
        icon: <FaIcons.FaUserAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
]