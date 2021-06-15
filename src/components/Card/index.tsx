 
import React from 'react'
import Classes from './index.module.css'
import LinkButton, { ILinkType } from '../LinkButton'

export interface ICard {
    img: string;
    text: string;
    link?: ILinkType;
}

function Card({ img, text, link }: ICard) {
    return (
        <div className={Classes.card} style={{ backgroundImage: `url(${img})` }}>
            <div className={Classes.contentWrapper}>
                <div className={Classes.content}>
                    <div className={Classes.text}>{text}</div>
                    {link && <LinkButton buttonLink={link} name="View Project" className={Classes.btn} />}
                </div>
            </div>
        </div>
    )
}

export default Card
