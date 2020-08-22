import React, {ReactElement, ReactNode} from 'react';
import cx from "classnames";
import GoBack from "../Element/Button/GoBack";
import {motion} from "framer-motion";

interface WizardPageInterface {
    children: ReactNode;
    title?: string
    width: number
    alignLeft?: boolean
    goBack?: boolean,
    align?: "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "left" | "right" | "center" | "end" | "start" | "justify" | "match-parent" | undefined,
    animate?: boolean
}

const WizardPage = (props: WizardPageInterface) => {
    let transitionVariants : any = {
        in: {
            opacity: 1,
            x: 0
        },
        initial: {
            opacity: 0,
            x: "-100vw"
        },
        out: {
            opacity: 1,
            x: "100vw"
        }
    }
    let pageTransitions : any = {
        transition: "linear"
    };

    if (!props.animate) {
        pageTransitions = {};
        transitionVariants = {};
    }
    const titleBar = () => {
        if (props.title)
            return <span>{props.title}</span>;
        return <img style={{height: 40}} src={process.env.PUBLIC_URL + '/bux_big.png'} alt="Bux"/>

    };
    const titleStyle = cx("title", {
        "has-text-centered": !props.alignLeft
    });

    return (
        <section className="hero is-light">
            {
                props.goBack && <span style={{position: "fixed"}}><GoBack/></span>

            }
            <motion.div initial="initial" animate="in" exit="out" variants={transitionVariants}
                        transition={pageTransitions}>

                <section className="hero is-light is-fullheight">
                    <div className="hero-body">
                        <div className="container">

                            <div className="columns is-centered">
                                <div className={`column is-${props.width}`}>
                                    <p style={{textAlign: props.align}} className={titleStyle}>
                                        {titleBar()}
                                    </p>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>

        </section>
    );
};

export default WizardPage;