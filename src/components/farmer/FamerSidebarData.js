import React from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";

export const FamerSidebarData = [
    {
        title: 'Farmer Dashboard',
        path: '/dashboard/farmer',
        icon: <FaIcons.FaTachometerAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Manage Profile',
        path: '/dashboard/farmer/profile',
        icon: <FaIcons.FaUserAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Cultivation Plan',
        path: '/dashboard/farmer/cultivation-plan',
        icon: <FaIcons.FaBookReader />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Active Plan',
                path: '/dashboard/farmer/cultivation-active-plan',
                icon: <FaIcons.FaBookReader />,
            },
            {
                title: 'Completed Plan',
                path: '/dashboard/farmer/cultivation-completed-plan',
                icon: <FaIcons.FaBookReader />,
            }
        ]
    },
    {
        title: 'Forecasting Information',
        path: '/dashboard/farmer/forecasting-information',
        icon: <FaIcons.FaFilter />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Stock List',
        path: '/dashboard/farmer/stock-list',
        icon: <FaIcons.FaChartArea />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    }
]