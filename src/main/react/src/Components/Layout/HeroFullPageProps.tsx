import React, {ReactElement} from 'react';
import cx from "classnames";

interface HeroFullPageProps {
    children: ReactElement;
    title?: string
    width: number
    alignLeft?: boolean
}

const HeroFullPage = (props: HeroFullPageProps) => {
    const titleBar = () => {
        if (props.title)
            return <div>{props.title}</div>;
        return <img style={{ height: 40 }} src={process.env.PUBLIC_URL + '/bux_big.png'} alt="Bux" />

    };
    const titleStyle = cx("title", {
            "has-text-centered": !props.alignLeft
        });
    return (
        <section className="hero is-light">
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