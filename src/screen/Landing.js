import React from 'react';

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="d-flex justify-content-center container" style={{ height: 30 }}>

        {/* TODO: insert link to home */}

        <a className="h-100" href="/"><img className="h-100" src="./images/homeIcon.png" alt="Clickable home button"/></a>
      </div>
    </footer>
  )
}


function LandingImages() {
  const images = {
    first: [
      {
        city: "Barcelona",
        link: "./images/city-images/barcelona.jpg",
      },
      {
        city: "Berlin",
        link: "./images/city-images/berlin.jpg",
      },
      {
        city: "Budapest",
        link: "./images/city-images/budapest.jpg",
      },
      {
        city: "Paris",
        link: "./images/city-images/paris.jpg",
      }
    ],
    second: [
      {
        city: "Vienna",
        link: "./images/city-images/vienna.jpg",
      },
      {
        city: "London",
        link: "./images/city-images/london.jpg",
      },
      {
        city: "Sarajevo",
        link: "./images/city-images/sarajevo.jpg",
      },
      {
        city: "Rome",
        link: "./images/city-images/rome.jpg",
      }
    ]
  };
  
  return (
    <div className="carousel-inner">

      {/* First slide */}
      <div className="container carousel-item active">
        <div className="row justify-content-center">
          {images.first.map(image => {
            return (
              <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 d-flex align-items-stretch">
                <div className="card mb-4">
                  <img className="card-img-top" src={image.link} alt={"Image of " + image.city} />
                  <div className="card-img-overlay d-flex justify-content-center align-items-center">
                    <h4 className="card-title">{image.city}</h4>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>


      {/* Second slide */}
      <div className="carousel-item">
      <div className="row justify-content-center">
          {images.second.map(image => {
            return (
              <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 d-flex align-items-stretch">
                <div className="card mb-4">
                  <img className="card-img-top" src={image.link} alt={"Image of " + image.city} />
                  <div className="card-img-overlay d-flex justify-content-center align-items-center">
                    <h4 className="card-title">{image.city}</h4>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
    </div>

  )
}



function LandingImageBox() {
  return (
    <div className="container">

      {/* Carousel Wrapper */}
      <div id="multi-item-carousel" className="carousel slide carousel-multi-item" data-ride="carousel">

        <LandingImages />
        
        <a className="carousel-control-prev" href="#multi-item-carousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#multi-item-carousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>

      </div>

    </div>

  )
}


function LandingMain() {
  return (
    <div className="d-flex flex-column align-items-center">
      <p style={{ textAlign: "center" }}>Find your perfect trip, designed by insiders who know and love their cities.</p>
      <h3>Start browsing</h3>
      <div className="mb-5" style={{ height: 100 }}>
        <a className="h-100" href="/cities"><img className="h-100" src="./images/circled-right-2.png" alt="Clickable button displaying an arrow."/></a>
      </div>
      <p>Popular MYtineraries:</p>
      <LandingImageBox />
    </div>
  )
}


function Logo() {
  return (
    <div className="d-flex justify-content-center mb-2" style={{ height: 100 }}>
      <img className="h-100" src="./images/MYtineraryLogo.png" alt="MYtinerary Logo"/>
    </div>
  )
}


function Navbar(props) {
  return (
    <nav className="navbar navbar-light bg-lignt">
        <button type="button" className="btn dropdown" style={{ height: 60 }} data-toggle="dropdown"> 
        <a className="h-100" href="#"><img className="h-100" src="./images/userIcon.png" alt="Clickable user button"/></a>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu">
          <ul>
            <li className="dropdown-item"><a href="#">Create Account</a></li>
            <li className="dropdown-item"><a href="#">Log In</a></li>
          </ul>
        </div>
        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="collapsingNavbar">
            <ul className="navbar-nav mx-auto">
                <li className={"nav-item " + (props.NavbarLandingLink === true ? "active" : "")}>
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className={"nav-item " + (props.NavbarCitiesLink === true ? "active" : "")}>
                    <a className="nav-link" href="/cities">Cities</a>
                </li>
            </ul>
        </div>
    </nav>



  )
}


function Landing() {
  return (
   <div>
    <Navbar
      NavbarLandingLink={true}
    />
    <Logo />
    <LandingMain />
    <Footer />
   </div>
  )
}


export default Landing;
export {Navbar, Logo};