
import Link from "next/link"

const links =[
  {
    path: '/',
    name: 'home',
    offset: -50
  },
  {
    path: '/#menu',
    name: 'menu',
    offset: -100
  },
  {
    path: 'locations',
    name: 'locations',
    offset: -150
  },
  {
    path: 'about',
    name: 'about',
    offset: 0
  },
  {
    path: 'blogs',
    name: 'blogs',
    offset: 0
  },
  {
  path:'contact',
  name:'contact',
  offset: 0
}
]


const Nav = ({ containerStyles, linkStyles }) => {
  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return <Link offset={link.offset} href={link.path} spy='true' smooth='true' key={index} duration={500} className={`${linkStyles}`}>{link.name}</Link>
      })}
    </nav>
  )
}

export default Nav