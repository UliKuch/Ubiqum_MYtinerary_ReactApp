import React from 'react';

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="d-flex justify-content-center container" style={{ height: 30 }}>

        {/* TODO: insert link to home */}

        <a className="h-100" href="#"><img className="h-100" src="./images/homeIcon.png" alt="A clickable home button"/></a>
      </div>
    </footer>
  )
}


function LandingMain() {
  return (
    <div className="d-flex flex-column align-items-center">
      <p style={{ textAlign: "center" }}>Find your perfect trip, designed by insiders who know and love their cities.</p>
      <h3>Start browsing</h3>
      <div className="mb-5" style={{ height: 100 }}>

        {/* TODO: insert link to cities page */}
        
        <a className="h-100" href=""><img className="h-100" src="./images/circled-right-2.png" alt="A clickable button displaying an arrow."/></a>
      </div>
      <p>Want to build your own MYtinerary?</p>
      <div className="d-flex justify-content-around w-100">
        
        {/* TODO insert links to login page and to create account page */}
        
        <a href="">Login</a>
        <a href="">Create Account</a>
      </div>
    </div>
  )
}


function Logo() {
  return (
    <div className="d-flex justify-content-center mb-5" style={{ height: 100 }}>
      <img className="h-100" src="./images/MYtineraryLogo.png" alt="The MYtinerary Logo"/>
    </div>
  )
}


function Landing() {
  return (
   <div>
    <Logo />
    <LandingMain />
    <Footer />
   </div>
  )
}


export default Landing;