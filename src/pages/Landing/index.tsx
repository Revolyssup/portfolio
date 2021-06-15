import React, {Fragment} from 'react';
import Classes from './index.module.css'
import Intro from './Intro'
import About from './About'
import Projects from './Projects'
import {animateScroll as Scroll} from 'react-scroll'

import {ReactComponent as ScrollUp} from '../../assets/images/uparrow.svg'
const scrollUp=()=>{
    Scroll.scrollTo(-100,{
        duration: 500,
        delay: 10,
        smooth: true,
      })
}
function Landing(){
    return(
        <Fragment>
            <Intro/>
            <About/>
            <Projects/>
            <div className={Classes.scrollBtn} onClick={scrollUp}>
                <ScrollUp fill="purple"/>
            </div>
        </Fragment>
    )
}

export default Landing;