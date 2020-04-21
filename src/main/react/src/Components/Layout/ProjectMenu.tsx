import * as React from 'react';
import 'bulma/css/bulma.css'
import '../../sass/base.scss'
import styles from '../../sass/menu.module.scss';
import classNames from "classnames";

interface MenuItem {
    active?: boolean,
    text: string,
    icon: string
}

const ProjectMenu = () => {
    const menu = [
        {
            active: true,
            text: "Dashboard",
            icon: "mdi-math-compass"
        },
        {
            text: "Issues",
            icon: "mdi-bug"
        },
        {
            text: "Tasks",
            icon: "mdi-view-grid"
        },
        {
            text: "Teams",
            icon: "mdi-account-group"
        },
        {
            text: "Docs",
            icon: "mdi-text"
        },
        {
            text: "Progress",
            icon: "mdi-chart-bell-curve-cumulative"
        },
        {
            text: "Settings",
            icon: "mdi-cog"
        }
    ];
    const itemClass = (active: boolean | undefined) => classNames({
        [styles.isActive]: active
    });
    const generateMenu = (item: MenuItem) => {
        return (
            <li className={styles.item}>
                <a className={itemClass(item.active)}>
                    <span className={`icon ${styles.iconContainer}`}>
                        <i className={`mdi ${styles.icon} ${item.icon}`}/>
                    </span>
                    {item.text}
                </a>
            </li>
        );
    };
    return (
        <div className={`column sticky is-2 is-fullheight ${styles.fixedColumn}`}>
            <aside className={`menu  ${styles.menu}`}>
                <ul className="menu-list">
                    {menu.map(generateMenu)}
                </ul>
            </aside>
        </div>
    );
};

export default ProjectMenu;