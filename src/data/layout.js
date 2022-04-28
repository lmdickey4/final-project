import React from "react"
import { Helmet } from "react-helmet"
import themes from "../../content/themes.json"
// other imports

export default function Layout({ children }) {
  function colors(theme) {
    return `
          --primary-color: ${theme.colors["primary-color"]};
          --text: ${theme.colors["text"]};
          --text-alt: ${theme.colors["text-alt"]};
          --background: ${theme.colors["background"]};
          --background-alt: ${theme.colors["background-alt"]};
          --border: ${theme.colors["border"]};
          --shadow: ${theme.colors["shadow"]};
          color-scheme: ${theme.colors["color-scheme"]};
    `
  }
  
  return (
    <>
      <Helmet>
        // other head meta tags

        <style type="text/css">{`
    ${themes
      .map(theme => {
        if (theme.id === "default") {
          return `
          :root {
            ${colors(theme)}
          }
        `
        } else if (theme.id === "dark") {
          return `
          @media (prefers-color-scheme: dark) {
            ${colors(theme)}
          }
        `
        }
      })
      .join("")}
    ${themes
      .map(theme => {
        return `
        [data-theme="${theme.id}"] {
          ${colors(theme)}
        }
      `
      })
      .join("")}
  `}
        </style>
      </Helmet>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}