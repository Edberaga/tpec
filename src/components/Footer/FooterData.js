import React from "react"
import { BsTelephoneFill } from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai"
import { MdLocationOn } from "react-icons/md"

export const FooterData = [
    {
        title: 'About Us',
        path: '/about',
        cName: 'footer-nav'
      },
      {
        title: 'Donate',
        path: '/donate',
        cName: 'footer-nav footer-nav-donate'
      },
      {
        title: 'News',
        path: '/blog',
        cName: 'footer-nav'
      },
      {
        title: 'Gallery',
        path: '/gallery',
        cName: 'footer-nav'
      },
      {
        title: 'Contact',
        path: '/contact',
        cName: 'footer-nav'
      }
]

export const ContactData = [
    {
        icon: <BsTelephoneFill/>,
        content: '+601 8232 2011',
      },
      {
        icon: <AiOutlineMail/>,
        content: 'thepeaceedu@gmail.com',
      },
      {
        icon: <MdLocationOn/>,
        content: '76, Lorong 1/77a, Imbi, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
      }
]