import React from 'react';
import Workspace from "./Workspace";
import Container from "../Layout/Container";
import Card from "../Layout/Card";
import OrgCard from "../Element/Cards/OrgCard";

const Home = () => {
    return (
        <Workspace active="Home">
            <Container>
                <div className="columns">
                    <div className="column">
                        <OrgCard />
                    </div>
                    <div className="column">
                        <OrgCard />
                    </div>
                </div>
            </Container>
        </Workspace>
    );
};

export default Home;
