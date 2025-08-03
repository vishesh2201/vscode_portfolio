import reactLogo from '../assets/reactLogo.svg';
import viteLogo from '../assets/viteLogo.svg'
import tailwindLogo from '../assets/tailwind.svg'
import gsapLogo from '../assets/gsapLogo.svg'
import supabaseLogo from '../assets/supabaseLogo.svg'
import txtLogo from '../assets/txtLogo.svg'
import jsLogo from '../assets/jsLogo.svg'
import jsonLogo from '../assets/jsonLogo.svg'
import markDownLogo from '../assets/markdown.svg'

export const files = [
  {
    type: "folder",
    name: "Vishesh's Portfolio",
    isOpen: true, // Set to false if you want it collapsed by default
    children: [
       {
        type: "folder",
        name: "node_modules",
        isOpen: false,
        children: [
          { type: "file", name: "react.js", icon: reactLogo },
          { type: "file", name: "react-dom.js", icon: reactLogo },
          { type: "file", name: "vite.js", icon: viteLogo },
          { type: "file", name: "tailwindcss.js", icon: tailwindLogo },
          { type: "file", name: "gsap.js", icon: gsapLogo },
          { type: "file", name: "supabase.js",icon: supabaseLogo }
        ]
      },
      {
        type: "folder",
        name: "projects",
        isOpen: true,
        children: [
          {
            type: "folder",
            name: "web-apps",
            isOpen: true,
            children: [
              { type: "file", name: "clash-of-clans.jsx", icon: reactLogo },
              { type: "file", name: "linkedout.tsx", icon: reactLogo },
              { type: "file", name: "brainwave.jsx", icon: reactLogo }
            ]
          },
                      {
              type: "folder",
              name: "mobile-apps",
              isOpen: true,
              children: [
                { type: "file", name: "manache-ganpati.apk", icon: reactLogo },
                { type: "file", name: "tic-tac-two.apk", icon: reactLogo },
                { type: "file", name: "swipeflix.apk", icon: reactLogo },
                { type: "file", name: "guess-the-flag.apk", icon: reactLogo },
                { type: "file", name: "polo.apk", icon: reactLogo }
              ]
            }
        ]
      },
      { type: "file", name: "about-me.jsx", icon: reactLogo },
      { type: "file", name: "contact.json", icon: jsonLogo },
      {type: "file", name: "resume.md", icon: markDownLogo}
      
    ]
  }
];