import React, {ReactElement} from 'react';
import cx from "classnames";
import GoBack from "../Element/Button/GoBack";

interface HeroFullPage {
    children: ReactElement;
    title?: string
    width: number
    alignLeft?: boolean
    goBack?: boolean
}

const HeroFullPage = (props: HeroFullPage) => {
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
            <section className="hero is-light is-fullheight">
                <div className="hero-body">
                    <div className="container">

                        <div className="columns is-centered">
                            <div className={`column is-${props.width}`}>
                                <p className={titleStyle}>
                                    {titleBar()}
                                </p>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default HeroFullPage;