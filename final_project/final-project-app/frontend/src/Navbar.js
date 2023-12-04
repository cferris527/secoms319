export default function Navbar() {
  return <nav className="nav">
    <ul>
      <Customlink href="/home">Home</Customlink>
      <Customlink href="/artists">Artists</Customlink>
      <Customlink href="/albums">Albums</Customlink>
      <Customlink href="/songs">Songs</Customlink>
      <Customlink href="/compare">Compare</Customlink>
    </ul>
    <a href="/" className="site-title">ArtistInsight</a>
  </nav>
}

function Customlink({ href, children, ...props }) {
  const path = window.location.pathname


  return (
    <li className={path === href ? "active" : ""}>
      <a href={href} {...props}>
        {children}
      </a>
    </li>
  )
}