import React from 'react'
import { ReactComponent as Github } from '../../../assets/images/icons8-github-50.svg'
import {ReactComponent as LinkedIn } from '../../../assets/images/icons8-linkedin.svg'
import {ReactComponent as Twitter } from '../../../assets/images/icons8-twitter.svg'

import LinkButton,{ILinkButton,Linktype} from '../../../components/LinkButton'
import Global from '../../../styles/global.module.css'
import Classes from './index.module.css'


const btn1: ILinkButton={name: "Passionate Backend developer and Software engineer", buttonLink:{ type: Linktype.Internal, link:"/" }};

                        
function Intro(){
    return(
        <section className={Classes.section}>
            <div className={Global.container}>
                <div className={Classes.content}>
                    <h1 className={Classes.title}> Ashish Tiwari</h1>
                    <h2 className={Classes.tagline}>
                    <span><LinkButton {...btn1} className={`${Classes.topics} ${Classes.webd}`} /></span>
                    
                    </h2>
                    <div className={Classes.icons}>
                    <a
                        className={Classes.iconContainer}
                        href="https://twitter.com/revolyssup96"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Twitter className={Classes.icon} />
                        </a>
                        <a
                        className={Classes.iconContainer}
                        href="https://github.com/Revolyssup"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Github className={Classes.icon} />
                        </a>
                        
                        <a
                        className={Classes.iconContainer}
                        href="https://www.linkedin.com/in/ashish-tiwari-9b8a73167/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <LinkedIn className={Classes.icon} />
                        </a>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Intro