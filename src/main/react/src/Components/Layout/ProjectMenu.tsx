import * as React from 'react';
import 'bulma/css/bulma.css'
import '../../sass/base.scss'
import styles from '../../sass/menu.module.scss';
import classNames from "classnames";
import {Link, useRouteMatch} from "react-router-dom";

interface MenuItem {
    active?: boolean,
    text: string,
    icon: string,
    path: string
}

const ProjectMenu = () => {
    const menu = [
        {
            active: true,
            text: "Dashboard",
            icon: "mdi-math-compass",
            path: "dashboard"
        },
        {
            text: "Issues",
            icon: "mdi-bug",
            path: "issues"
        },
        {
            text: "Tasks",
            icon: "mdi-view-grid",
            path: "tasks"
        },
        {
            text: "Teams",
            icon: "mdi-account-group",
            path: "teams"

        },
        {
            text: "Docs",
            icon: "mdi-text",
            path: "docs"
        },
        {
            text: "Progress",
            icon: "mdi-chart-bell-curve-cumulative",
            path: "progress"
        },
        {
            text: "Settings",
            icon: "mdi-cog",
            path: "settings"
        }
    ];
    const itemClass = (active: boolean | undefined) => classNames({
        [styles.isActive]: active
    });
    const {url} = useRouteMatch();
    const generateMenu = (item: MenuItem) => {
        return (
            <li key={item.text} className={styles.item}>
                <Link to={`${url}/${item.path}`} className={itemClass(item.active)}>
                    <span className={`icon ${styles.iconContainer}`}>
                        <i className={`mdi ${styles.icon} ${item.icon}`}/>
                    </span>
                    {item.text}
                </Link>
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