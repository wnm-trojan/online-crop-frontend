import React from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

export const AdminSidebarData = [
    {
        title: 'Admin Dashboard',
        path: '/dashboard/admin',
        icon: <FaIcons.FaTachometerAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Manage Profile',
        path: '/dashboard/admin/profile',
        icon: <FaIcons.FaUserAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Crop Master',
        path: '/dashboard/admin',
        icon: <FaIcons.FaTree />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Crop Categories',
                path: '/dashboard/admin',
                icon: <FaIcons.FaBorderAll />,
            },
            {
                title: 'Crop Items',
                path: '/dashboard/admin',
                icon: <FaIcons.FaAppleAlt />,
            }
        ]
    },
    {
        title: 'Users',
        path: '/dashboard/admin',
        icon: <FaIcons.FaUsers />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Farmers',
                path: '/dashboard/admin',
                icon: <FaIcons.FaUsersCog />,
            },
            {
                title: 'Dealers',
                path: '/dashboard/admin',
                icon: <FaIcons.FaUsersCog />,
            },
            {
                title: 'Fertilizer',
                path: '/dashboard/admin',
                icon: <FaIcons.FaUsersCog />,
            }
        ]
    },
    {
        title: 'Articles',
        path: '/dashboard/admin',
        icon: <FaIcons.FaNewspaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Banner Ads',
        path: '/dashboard/admin',
        icon: <FaIcons.FaAdversal />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    }
]