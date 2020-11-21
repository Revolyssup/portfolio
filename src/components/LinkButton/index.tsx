import React from 'react'
import {Link} from 'react-router-dom'
import {Link as ScrollLink} from 'react-scroll'

/***********************Interfaces***************** */

//Different component or anchor tag for different types of link.
export enum Linktype{
    Internal, //react router
    External, //anchor tag
    Internal_SAME_PAGE
}

//Will have type and link
export interface ILinkType{
    type: Linktype,
    link: string
}

//The general link button
export interface ILinkButton{
    name: string,
    buttonLink: ILinkType,
    className?: string,
    activeClassName?:string
}

/***********************Link Button higher order component******/

function LinkButton({name, buttonLink,className,activeClassName}: ILinkButton){
    if(buttonLink.type===Linktype.Internal){
        return (
        <Link to={buttonLink.link}>
            <div className={className}>
                {name}
            </div>
        </Link>)
    }
        else if(buttonLink.type===Linktype.External){
            return (<a href={buttonLink.link} target="_blank" rel="noopener noreferrer">
                <div className={className}>
                    {name}
                </div>
            </a>)
        }

        else{
            return(
                <ScrollLink
                style={{ cursor: "pointer" }}
                activeClass={activeClassName}
                spy
                hashSpy
                smooth
                offset={0}
                duration={300}
                to={buttonLink.link}
                >
                    <div className={className}>
                        {name}
                    </div>
                </ScrollLink>
            )
        }
    
}

export default LinkButton