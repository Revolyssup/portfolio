import React from 'react'
import Classes from './index.module.css'
import ScrollAnim from '../../../components/ScrollAnim'


import Global from '../../../styles/global.module.css'
function About(){
    return(
        <section className={Classes.container} id="about">
            <div className={Classes.aboutmeContainer}>
                <ScrollAnim
                className={`${Global.container} ${Classes.container}`}
                classAfter={Classes.transition}
                classBefore={Classes.initTransition}
                options={{threshold:0.5}}
                >
                    <div className={Classes.aboutme}>
                        <h2 className={Classes.title}>ABOUT</h2>
                        <div className={Classes.aboutContent}>
                            <p className={Classes.contentP}>
                                I am a full stack web developer in progress. I am generally more interested in Backend than front end. Due to my greater interests in 
                                Linear algebra, Calculus and Statistics, I am currently understanding Machine learning and Neural networks in depth. Other than that, I love
                                implementing new Data structures and algorithms and I believe in optimization. I ocassionally solve questions on codeforces or leetcode.
                            </p>
                        </div>

                        {/* <h3 className={Classes.titlemin}>Software Development:</h3>
                        <p className={Classes.contentPL}>
                            1. NULL
                        </p>
                        <p className={Classes.contentPL}>
                            2. NULL
                        </p>
                        <p className={Classes.contentPL}>
                            3. NULL
                        </p> */}
                    </div>
                </ScrollAnim>
            </div>

            <div className={Classes.techstackContainer}>
                <ScrollAnim
                    className={`${Global.container} ${Classes.container}`}
                    classBefore={Classes.initTransition}
                    classAfter={Classes.transition}
                    options={{ threshold: 0.25 }}>
                    <div className={Classes.techstack}>
                        <div className={Classes.techstackContent}>
                            {/* Second Title */}
                            <h3 className={Classes.titlemin}>
                                Technologies I worked or work with:
                            <br />
                           
                        </h3>

                            {/* Stack Block */}
                            <div className={Classes.stackBlock}>
                                {/* Frontend Block */}
                                <div className={Classes.block}>
                                    <h3 className={Classes.tag}>Frontend</h3>
                                    <ul>
                                        <li>React - Used for creating the UI</li>
                                        <li>Redux - Used for managing the state</li>
                                        <li>Socket.io - For Reliable Websocket communication</li>
                                    </ul>
                                </div>

                                {/* Backend Block */}
                                <div className={Classes.block}>
                                    <h3 className={Classes.tag}>Backend</h3>
                                    <ul>
                                        <li>Microservices architecture</li>
                                        <li>Docker for containerisation</li>
                                        <li>Docker swarm for orchestration</li>
                                        {/* <li>Traefik as reverse proxy</li>
                                        <li>NGINX for serving static sites like this</li>
                                        <li>Grafana and Prometheus for monitoring</li> */}
                                    </ul>
                                    <p className={Classes.contentP}>
                                        And many more depending upon the needs of a service.<br />
                                   
                                </p>
                                </div>

                                {/* Devops Block */}
                                <div className={Classes.block}>
                                    <h3 className={Classes.tag}>DevOps</h3>
                                    <p className={Classes.contentP}>
                                        Github actions
                                    <br />
                                </p>
                                </div>
                            </div>
                            <h2 className={Classes.tag}>
                                Interested in knowing more? Click on the links above or check out the blog.
                        </h2>
                        </div>
                    </div>
                </ScrollAnim>
            </div>
        </section>
    )
}

export default About