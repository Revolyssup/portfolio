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
                                I am a Software Engineer currenly focused in cloud native ecosystem. My primary interests range from networking, Operating systems,
                                eBPF, Distributed systems, Databases and cloud. I have over an year worth of experience working with Golang writing kubernetes operators,
                                service mesh adapters and more.  
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
                                {/* Backend Block */}
                                <div className={Classes.block}>
                                    <h3 className={Classes.tag}>Language and Tooling</h3>
                                    <ul>
                                        <li>Golang</li>
                                        <li>Docker</li>
                                        <li>Kubernetes</li>
                                        <li>Service Mesh(Istio/Traefik/Kuma/Nginx and more)</li>
                                        <li>Envoy/xDS APIs</li>
                                        <li>Service Mesh Management(Meshery)</li>
                                        <li>Grafana and Prometheus for monitoring</li>
                                    </ul>
                                    <p className={Classes.contentP}>
                                        And many more...<br />      
                                </p>
                                </div>

                                {/* Devops Block */}
                                <div className={Classes.block}>
                                    <h3 className={Classes.tag}>CI/CD</h3>
                                    <ul>
                                        <li>Github actions</li>
                                        <li>Argo</li>
                                        <li>FluxCD</li>
                                    </ul>
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