import Navbar from './Navbar'

import Home from './pages/Home'
import Artists from './pages/Artists'
import Albums from './pages/Albums'
import Songs from './pages/Songs'
import Compare from './pages/Compare'
import About from './pages/About'

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <About />
      break
    case "/home":
      component = <Home />
      break
    case "/artists":
      component = <Artists />
      break
    case "/albums":
      component = <Albums />
      break
    case "/songs":
      component = <Songs />
      break
    case "/compare":
      component = <Compare />
      break
    default:
      component = <Home />
  }

  return (
    <>
      <Navbar />
      <div className="container">{component}</div>
    </>
  )
}

export default App;
