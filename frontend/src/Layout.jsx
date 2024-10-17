import NavBar from "./components/NavBar/NavBar"
import HomeSection from './components/Home/Home'
import Tabs from "./components/Tabs/Tabs"
import Aboutus from "./components/Aboutus/Aboutus"
import Footer from "./components/Footer/Footer"

function Layout() {
  return (
    <>
      <NavBar />
      <br />
      <HomeSection />
      <br />
      <Tabs />
      <Aboutus />
      <Footer />
    </>
  )
}

export default Layout