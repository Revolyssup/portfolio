import React,{useState,useEffect,useRef} from 'react';
import Global from '../../styles/global.module.css';
import LinkButton,{ILinkButton,Linktype} from '../LinkButton/index';
import Classes from './index.module.css'

import './index.module.css'
/***The array from which we will make are leftlinkbuttons */

const btnleft: ILinkButton[]=[
    {name: "Home", buttonLink:{ type: Linktype.Internal, link:"/" }},
    {name:"About", buttonLink:{type: Linktype.Internal_SAME_PAGE,link:"about"}},
    {name:"Personal Projects", buttonLink:{type: Linktype.Internal_SAME_PAGE,link:"projects"}}
];

const btnright: ILinkButton[]=[
    {name: "Blog(Coming soon)", buttonLink:{ type: Linktype.Internal_SAME_PAGE, link:"#about" }}
]

//MAIN COMPONENT
function    Navbar(){
    const [navClasses,setNavClasses]=useState([Classes.nav]);
    const [mobileNavClasses,setMobileNavClasses]=useState([Classes.mobile]);

    //to control weather mobile navbar will be there or not.
    const [mobileNavState,setMobileNavState]=useState(false);

    //To refer to the navbar
    const ref=useRef<HTMLDivElement>(null);

    //Set up listener for scroll to re animate navbar and to create a onClickHandler in mobilestate
    useEffect(()=>{
        window.onscroll=()=>{
            if(document.body.scrollTop>80|| document.documentElement.scrollTop > 80) setNavClasses([Classes.nav,Classes.navmin]);
            else setNavClasses([Classes.nav]);
        }

        //If we click on navbar component anywhere(for mobile) it should stay there,other mobile navbar component should vanish
        const handleClick=(e:MouseEvent)=>{
            if(ref.current?.contains(e.target as Node)) return;
            setMobileNavState(false);
        }

        document.addEventListener("mousedown",handleClick);

        return ()=>{
            window.onscroll=null;
            document.removeEventListener("mousedown",handleClick)
        }

    });


    //For setting mobile nav state css.
    useEffect(()=>{
        if(mobileNavState) setMobileNavClasses([Classes.mobile,Classes.open]);
        else setMobileNavClasses([Classes.mobile]);
    },[mobileNavState]);

    const onClickHandler=()=>{
        setMobileNavState(!mobileNavState);
    }



    return (
        <nav className={navClasses.join(' ')} ref={ref}>
            <div className={`${Global.container} ${Classes.container}`}>
             {/**Desktop */}
                <div className={Classes.block}>
                    {
                        btnleft.map((btn,i)=>(
                            <LinkButton
                            className={Classes.navItem}
                            activeClassName={Classes.active}
                            {...btn}
                            key={i}
                            ></LinkButton>
                        ))
                    }
                </div>

                <div className={Classes.block}>
                    {
                        btnright.map((btn,i)=>(
                            <LinkButton
                            className={Classes.navItem}
                            activeClassName={Classes.active}
                            {...btn}
                            key={i}
                            ></LinkButton>
                        ))
                    }
                </div>


                <div className={mobileNavClasses.join(' ')}>
                    <div className={Classes.hamburgerContainer} onClick={onClickHandler}>
                        <div className={Classes.hamburger}></div>
                    </div>

                    <div className={Classes.mobileBlock}>
                        <div className={Classes.navItems}>
                            {
                                [...btnleft, ...btnright].map((btn,i)=>(
                                    <LinkButton
                                    className={Classes.navItem}
                                    activeClassName={Classes.active}
                                    {...btn}
                                    key={i}
                                    ></LinkButton>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}



export default Navbar;
