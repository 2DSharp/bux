import React, {useState} from 'react';
import styles from "../../../sass/std_component.module.scss";
import classNames from "classnames";

interface TabSwitcher {
    tabs: string[],
    default: string,

    onSwitch(tab: string): void;
}

const TabSwitcher = (props: TabSwitcher) => {
    const [active, setActive] = useState(props.default);
    const activeClass = (current: string) => classNames(styles.panelTabs, {
        'is-active': current === active
    });
    const switchTab = (tab: string) => {
        setActive(tab);
        props.onSwitch(tab);
    }
    return (
        <p className={`panel-tabs`}>
            {
                props.tabs.map(tab => (
                    <a onClick={() => switchTab(tab)} className={activeClass(tab)}>{tab}</a>
                ))
            }
        </p>

    );
};

export default TabSwitcher;
