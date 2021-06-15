import React from 'react'
import Classes from './index.module.css'
import Card, { ICard } from '../../../components/Card'
import { Linktype } from '../../../components/LinkButton'
import ScrollAnim from '../../../components/ScrollAnim'

// Global classes
import Global from '../../../styles/global.module.css'

const projects: ICard[] = [
    {
        text: " Discoded - GoGlot(Containerized Code runner)+Cache+Discord bot",
        img: require("../../../assets/images/portfolio.jpeg"),
        link: { type: Linktype.External, link: "https://github.com/Revolyssup/discoded" }
    },
    {
        text: "Monkey- A small interpreted programming language in go",
        img: require("../../../assets/images/portfolio.jpeg"),
        link: { type: Linktype.External, link: "https://github.com/Revolyssup/monkey" }
    },

]

function Projects() {
    return (
        <section className={Classes.projectsContainer} id="projects">
            <div className={`${Global.container} ${Classes.container}`}>
                <div className={Classes.projects}>
                    <h2 className={Classes.title}>Projects</h2>
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
