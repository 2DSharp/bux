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
                        <p className="title has-text-centered">
                            <img style={{ height: 40 }} src={process.env.PUBLIC_URL + '/bux_big.png'} alt="Bux" />
                        </p>
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