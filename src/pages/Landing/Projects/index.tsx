import React from 'react'
import Classes from './index.module.css'
import Card, { ICard } from '../../../components/Card'
import { Linktype } from '../../../components/LinkButton'
import ScrollAnim from '../../../components/ScrollAnim'

// Global classes
import Global from '../../../styles/global.module.css'

const projects: ICard[] = [
    {
        text: " GoGlot: A multi-language code runner written in Go.",
        img: require("../../../assets/images/Golang.png").default,
        link: { type: Linktype.External, link: "https://github.com/Revolyssup/discoded" }
    },
    {
        text: " Discoded: GoGlot + Code Caching + Code editor + Discord bot",
        img: require("../../../assets/images/discoded.png").default,
        link: { type: Linktype.External, link: "https://discoded.centralindia.cloudapp.azure.com/" }
    },
    {
        text: "Monkey- A small interpreted programming language in go",
        img: require("../../../assets/images/monkey.png").default,
        link: { type: Linktype.External, link: "https://github.com/Revolyssup/monkey" }
    },
    {
        text: "BargeDB - Raft based consensus layer for key-value stores (In progress)",
        img: require("../../../assets/images/barge.jpeg").default,
        link: { type: Linktype.External, link: "https://github.com/Revolyssup/bargedb" }
    },

]

function Projects() {
    return (
        <section className={Classes.projectsContainer} id="projects">
            <div className={`${Global.container} ${Classes.container}`}>
                <div className={Classes.projects}>
                    <h2 className={Classes.title}>Personal Projects</h2>
                    <div className={Classes.wrapper}>
                        {projects.map((project, i) => (
                            <ScrollAnim
                                className={Classes.card}
                                key={"card_" + i}
                                classBefore={Classes.animBefore}
                                styleComponenet={{ transitionDelay: `${i * 0.1}s` }}
                                classAfter={Classes.animAfter}>
                                <Card {...project} />
                            </ScrollAnim>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects
