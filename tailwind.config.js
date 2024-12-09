
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	container:{
		center:true,
		padding:'15px'
	},
	screens:{
		sm:'640px',
		md:'768px',
		lg:'960px',
		xl:'1200px'
	},
  	extend: {
  		colors: {
  			body: '#e5e5e5',
			white:'#fff',
			green:{DEFAULT: '#539592', hover:'#50807d'},
			black:{DEFAULT: '#273029', heavy:'#1b211c'},
			grey: '#888888',
			orange:{
				DEFAULT: '#f2994a',
				hover: '#da863c'
			},
			outline: '#f1f1f1',
			pink:'#ffa5a5'
  			
  		},
		boxShadow:{
			primary:'40px 4px 40px 0px rgba(68, 68, 68, 0.25i)'
		},
		backgroundImage:{
			hero:'url(/hero-bg2.jpg)',
			reservation:'url(/reservation.jpg)',
			hero2:'url(/smallBg3.jpg)',

		},
		backgroundSize: {
			hero: 'cover',
			reservation: 'cover',
			hero2:'cover'
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
