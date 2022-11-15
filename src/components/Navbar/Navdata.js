import React from 'react';
import {FaRegNewspaper} from 'react-icons/fa';
import {AiFillHome, AiFillPicture} from 'react-icons/ai';
import {IoMdPeople} from 'react-icons/io';
import {MdContactMail} from 'react-icons/md';
import {BiDonateHeart} from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '/about',
    icon: <IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Donate',
    path: '/donate',
    icon: <BiDonateHeart />,
    cName: 'nav-text nav-donate'
  },
  {
    title: 'News',
    path: '/blog',
    icon: <FaRegNewspaper/>,
    cName: 'nav-text'
  },
  {
    title: 'Gallery',
    path: '/gallery',
    icon: <AiFillPicture/>,
    cName: 'nav-text'
  },
  {
    title: 'Contact Us',
    path: '/contact',
    icon: <MdContactMail />,
    cName: 'nav-text'
  }
];