import React from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

export const DealerSidebarData = [
    {
        title: 'Dealer Dashboard',
        path: '/dashboard/dealer',
        icon: <FaIcons.FaTachometerAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Manage Profile',
        path: '/dashboard/dealer/profile',
        icon: <FaIcons.FaUserAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Find Cultivation',
        path: '/dashboard/dealer/stock-filter',
        icon: <FaIcons.FaSearchLocation />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Cultivation Wanted Ad',
        path: '/dashboard/dealer/wanted-list',
        icon: <FaIcons.FaAdversal />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    }
]