import React from 'react';

import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

// Material-UI
import {
  Typography,
} from '@material-ui/core';

function Imprint() {
  return (
      <div>
        <Navbar
          selectedMenuItem="Imprint"
        />
        <Typography>
          This is a purely private web page, designed for the purpose of learning how to code only.
          It hence does not need any proper imprint. <br />
          Any images are license free or licensed under creative commons licenses.
        </Typography>
        <Footer />
      </div>
  )
}


export default Imprint;