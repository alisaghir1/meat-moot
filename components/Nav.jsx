import Link from "next/link"
import { useState } from "react"
import { FaCaretDown } from "react-icons/fa" // Import the caret down icon

const links = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/#menu',
    name: 'menu',
  },
  {
    path: 'branches',
    name: 'branches',
  },
  {
    path: 'about',
    name: 'about',
  },
  {
    path: 'media',
    name: 'media',
  },
  {
    path: 'contact',
    name: 'contact',
  }
]

const Nav = ({ containerStyles, linkStyles }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        // If it's the "media" link, show the dropdown logic
        if (link.name === "media") {
          return (
            <div key={index} className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`${linkStyles} cursor-pointer flex  items-center`} // Add flex to align the icon with text
              >
                <span className="hover:text-orange transition-all duration-300">{link.name}</span>
                {/* Add the arrow icon next to the "Media" text */}
                <FaCaretDown className={`ml-2 transform transition-all ${showDropdown ? 'rotate-180' : ''}`} />
              </button>
              {/* Dropdown menu for Blogs and News */}
              {showDropdown && (
                <div className="absolute bg-black-heavy text-white p-2 rounded shadow-lg mt-1">
                  <Link onClick={() => setShowDropdown(false)} href="/blogs" className="block px-4 py-2 hover:text-orange">
                    Blogs
                  </Link>
                  <Link onClick={() => setShowDropdown(false)} href="/news" className="block px-4 py-2 hover:text-orange">
                    News
                  </Link>
                </div>
              )}
            </div>
          )
        }
        
        // Regular links
        return (
          <Link
            key={index}
            href={link.path}
            spy="true"
            smooth="true"
            duration={500}
            className={`${linkStyles}`}
          >
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
