import * as React from 'react';
import 'bulma/css/bulma.css'
import '../../sass/base.scss'
import styles from '../../sass/menu.module.scss';
import classNames from "classnames";
import {Link, useRouteMatch} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {ReactComponent as ProjectDefaultIcon} from "../../images/project_icon.svg";
import variables from "../../sass/colors.module.scss";
import MdIcon from "../Element/Icon/MDIcon";

interface MenuItem {
    active?: boolean,
    text: string,
    icon: string,
    path: string
}

const useStyles = makeStyles({
    menuUl: {
        margin: 10
    },
    projectSwitcher: {
        padding: "0 6px 0 6px",
        margin: 7,
        marginBottom: 15,
        borderRadius: 8,
        cursor: "pointer",
        transition: "all ease-in 0.3s",

        '&:hover': {
            backgroundColor: variables.primaryHover
        }
    },
    iconContainer: {
        display: "inline-flex",
        verticalAlign: "middle",
        margin: 8,
        padding: 5,
    },
    detailHolder: {
        display: "inline-block",
        verticalAlign: "middle",
        padding: 3,
        margin: 3,
        width: 80,
        textOverflow: "ellipsis"
    },
    actionIcon: {
        display: "inline-flex",
        verticalAlign: "middle"
    },

});
const ActiveProject = () => {

}
const ProjectMenu = () => {
    const menu = [
        {
            active: true,
            text: "Overview",
            icon: "mdi-eye-outline",
            path: "dashboard"
        },
        {
            text: "Issues",
            icon: "mdi-bug-outline",
            path: "issues"
        },
        {
            text: "Goals",
            icon: "mdi-math-compass",
            path: "goals"
        },
        {
            text: "Team",
            icon: "mdi-account-group-outline",
            path: "team"

        },
        {
            text: "Documents",
            icon: "mdi-text",
            path: "docs"
        },
        {
            text: "Reports",
            icon: "mdi-chart-bell-curve-cumulative",
            path: "stats"
        },
    ];

    const actionMenu = [
        {
            text: "Help",
            icon: "mdi-help",
            path: "help"
        },
        {
            text: "Settings",
            icon: "mdi-cog-outline",
            path: "settings"
        },

    ];

    const itemClass = (active: boolean | undefined) => classNames({
        [styles.isActive]: active
    });
    const dynamicStyles = useStyles();

    const {url} = useRouteMatch();
    const generateMenu = (item: MenuItem) => {
        return (
            <li key={item.text} className={styles.item}>
                <Link to={`${url}/${item.path}`} className={itemClass(item.active)}>
                    <span style={{verticalAlign: "middle"}} className={`icon ${styles.iconContainer}`}>
                        <i className={`mdi mdi-24px ${styles.icon} ${item.icon}`}/>
                    </span>
                    {item.text}
                </Link>
            </li>
        );
    };
    return (
        <div className={`${styles.fixedColumn}`}>
            <aside style={{position: "relative"}} className={`menu  ${styles.menu}`}>

                <ul className={`menu-list ${dynamicStyles.menuUl}`}>
                    <div className={dynamicStyles.projectSwitcher}>
                        <div className={`${dynamicStyles.iconContainer}`}>
                            <ProjectDefaultIcon style={{width: 32, height: 32}}/>
                        </div>
                        <div className={dynamicStyles.detailHolder}>
                            <b style={{color: "#252a32", fontSize: 17}}>Bux</b>
                            <div style={{color: "rgba(0, 0, 0, 0.6)", fontSize: 13}}>Glox</div>
                        </div>
                        <div className={dynamicStyles.actionIcon}>
                            <MdIcon value={"mdi-chevron-down"}/>
                        </div>
                    </div>
                    {menu.map(generateMenu)}
                </ul>
                <ul style={{position: "absolute",marginBottom: 20, bottom: 20}} className={`menu-list ${dynamicStyles.menuUl}`}>
                    {actionMenu.map(generateMenu)}
                </ul>

            </aside>
        </div>
    );
};

export default ProjectMenu;