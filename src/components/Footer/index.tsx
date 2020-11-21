import React from 'react'
import Classes from './index.module.css'

import Global from '../../styles/global.module.css'

const getCurrYear=()=>{
    const date=new Date();
    return date.getFullYear();
}

function Footer(){
    return (<div>
        <footer className={Classes.footer}>
            <div className={Global.container}>
                <small>Copyright &copy; {getCurrYear()} Ashish Tiwari. All Rights Reserved</small>
            </div>
        </footer>
    </div>)
}

export default Footer