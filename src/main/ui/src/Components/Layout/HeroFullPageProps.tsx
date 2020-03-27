import React, {ReactElement} from 'react';

interface HeroFullPageProps {
    children: ReactElement;
    title: string
    width: number
}

const HeroFullPage = (props: HeroFullPageProps) => {
    return (
        <section className="hero is-light ">
            <section className="hero is-light is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <p className="title has-text-centered">{props.title}</p>
                        <div className="columns is-centered">
                            <div className={`column is-${props.width}`}>
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