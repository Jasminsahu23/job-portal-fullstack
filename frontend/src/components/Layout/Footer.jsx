import React, { useContext } from 'react'
import {Context} from "../../main"
import {Link} from "react-router-dom"
import { FaGithub , FaLinkedin} from "react-icons/fa"
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill} from "react-icons/ri"
function Footer() {
  const {isAuthorized}  = useContext(Context)
  return (
    <footer className= {isAuthorized ? "footerShow" : "footerHide"}>
<div>&copy; All Rights Reserved by US.</div>
<div>
  <Link to={'https://github.com/Jasminsahu23'} target='github'><FaGithub></FaGithub></Link>
  <Link to={'https://www.linkedin.com/in/jasmin-sahu-/'} target='linkedin'><FaLinkedin></FaLinkedin></Link>
  <Link to={'https://www.instagram.com/jasminn_133/'} target='instagram'><RiInstagramFill></RiInstagramFill></Link>
</div>
      
    </footer>
  )
}

export default Footer