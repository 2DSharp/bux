import React from 'react';
import 'bulma/css/bulma.css'
import '@mdi/font/css/materialdesignicons.min.css'
import style from '../../sass/nav.module.scss'
import {Link} from "react-router-dom";

interface GlobalNavbarProps {
    active: string;
}

const GlobalNavbar = (props: GlobalNavbarProps) => {
    return (
        <nav className={`navbar is-fixed-top ${style.customNav}`} role="navigation" aria-label="main navigation">
            <div className={`navbar-brand ${style.branding} `}>
                <a className={`navbar-item ${style.navItem}`} href="/">
                    <img style={{height: 28}} src={process.env.PUBLIC_URL + '/bux_big.png'} alt="Bux"/>
                </a>
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/home" className={`navbar-item ${style.navItem} ${props.active == "Home" && style.isActive}`}>
                        <span>Home</span>
                    </Link>


                    <Link to="#" className={`navbar-item ${style.navItem}`}>
                        Your Tasks
                    </Link>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Teams
                        </a>

                        <div className="navbar-dropdown">
                            <Link to="/teams/new" className={`navbar-item ${style.navItem}`}>
                                Team1
                            </Link>
                            <a className={`navbar-item ${style.navItem}`}>
                                Jobs2
                            </a>
                            <a className={`navbar-item ${style.navItem}`}>
                                Contact
                            </a>
                            <hr className="navbar-divider"/>
                            <Link to="/teams/new" className={`navbar-item ${style.navItem}`}>
                                Create a team
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="navbar-end">
                    <div className={`navbar-item ${style.navItem}`}>
                        <div className="control has-icons-left ">
                            <input className={`input is-small is-rounded ${style.input}`} type="text"
                                   placeholder="Search"/>
                            <span className={`icon is-left ${style.icon}`}>
                                <i className={`mdi mdi-magnify ${style.mdiCustom} `}/>
                            </span>
                        </div>
                    </div>
                    <a className={`navbar-item ${style.navItem}`}>
                        <span className={`icon `}>
                            <i className="mdi mdi-24px mdi-inbox" aria-hidden="true"/>
                        </span>
                    </a>
                    <a className={`navbar-item ${style.navItem}`}>
                        <span className="icon">
                            <i className="mdi mdi-24px mdi-bell mdi-rotate-45" aria-hidden="true"/>
                        </span>
                    </a>
                    <a className={`navbar-item ${style.navItem}`}>
                            <span className="icon">
                                <i className="mdi mdi-24px mdi-cog" aria-hidden="true"/>
                            </span>
                    </a>
                    <a className={`navbar-item ${style.navItem}`}>
                            <span className="icon">
                                <i className={`mdi mdi-24px mdi-account-circle ${style.blued}`} aria-hidden="true"/>
                            </span>
                    </a>
                </div>
            </div>
        </nav>

    );
};

export default GlobalNavbar;