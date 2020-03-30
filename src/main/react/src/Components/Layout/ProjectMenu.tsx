import * as React from 'react';
import 'bulma/css/bulma.css'
import '../../sass/base.scss'
import styles from '../../sass/menu.module.scss';

const ProjectMenu = () => {
    return (
        <div className={`hero column sticky is-2 is-fullheight ${styles.fixedColumn}`}>
            <aside className={`menu  ${styles.menu}`}>

                <ul className="menu-list">
                    <li className={styles.item}><a className={`is-active ${styles.isActive}`}><span className={`icon ${styles.icon}`}><i className="mdi mdi-math-compass"/> </span>Dashboard</a></li>
                    <li className={styles.item}><a><span className={`icon ${styles.icon}`}><i className="mdi mdi-bug"/> </span>Issues</a></li>
                    <li className={styles.item}><a><span className={`icon ${styles.icon}`}><i className="mdi mdi-view-grid"/> </span>Tasks</a></li>
                    <li className={styles.item}><a><span className={`icon ${styles.icon}`}><i className="mdi mdi-account-group"/> </span>Teams</a></li>
                    <li className={styles.item}><a><span className={`icon ${styles.icon}`}><i className="mdi mdi-text"/> </span>Docs</a></li>
                    <li className={styles.item}><a><span className={`icon ${styles.icon}`}><i className="mdi mdi-chart-bell-curve-cumulative"/> </span>Progress</a></li>
                    <li className={styles.item}><a><span className={`icon ${styles.icon}`}><i className="mdi mdi-cog"/> </span>Settings</a></li>
                </ul>
            </aside>
        </div>
    );
};

export default ProjectMenu;