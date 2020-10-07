import React, {useEffect, useState} from 'react';
import MdIcon from "../Icon/MDIcon";
import {makeStyles} from "@material-ui/styles";
import TabSwitcher from "./TabSwitcher";
import NewGoal from "../Modal/NewGoal";
import {getRequest} from "../../../service/request";
import {ReactComponent as SharedGoalsPlaceholder} from "../../../images/shared_goals.svg";
import {Spin} from "antd";
import Priority from "../Icon/Priority";
import {Priority as PriorityType} from "../../../types";
import {Link} from "react-router-dom";
import Progress, {Pressure} from "../Progress";
import {GoalStatus} from "../../WorkspaceContent/Goal";
import PrimaryButton from "../Button/PrimaryButton";

const useStyles = makeStyles({
    root: {
        width: "100%",
        backgroundColor: "#fff"
    },
    statsContainer: {
        color: "darkgray",
        fontSize: 12
    },
    stat: {
        marginRight: "7px"
    },
    panelContainer: {
        maxHeight: 320,
        overflowY: "auto"
    },
    progress: {
        height: 10,
        width: 60,
        margin: '0px 3px 0 3px',
        display: "inline-block"
    },
    panelItem: {
        width: "100%"
    }
});

type Goal = {
    id: string,
    title: string,
    teamSize: number,
    deadline: string,
    progress: number,
    pressure: Pressure,
    status: GoalStatus,
    priority: PriorityType,
    milestone?: string
}

const goalTabs = ['All', 'Planning', 'Active', 'Completed', 'Abandoned']

const Goals = (props: { projectKey: string, team: string }) => {
    const classes = useStyles();


    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('Active');
    const switchTab = (tab: string) => {
        setActiveTab(tab);
    }

    const [goals, setGoals] = useState<{ [key: string]: Goal[] }>({});
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getRequest(`/team/${props.team}/projects/${props.projectKey}/goals`, {},
                (result) => {
                    const allGoals: Goal[] = result.goals;
                    setGoals({
                        'All': allGoals,
                        'Planning': allGoals.filter(goal => (goal.status) === 'PLANNING'),
                        'Active': allGoals.filter(goal => (goal.status) === 'ACTIVE'),
                        'Completed': allGoals.filter(goal => (goal.status) === 'COMPLETED'),
                        'Abandoned': allGoals.filter(goal => (goal.status) === 'ABANDONED'),
                    });
                })
        }
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <>
            <div className={classes.root}>
                <nav className="panel">
                    <p className="panel-heading">
                        Goals
                    </p>
                    <div className="panel-block">
                        <p className="control has-icons-left">
                            <MdIcon value="mdi-magnify mdi-24px"/>
                            <input className="input" type="text" placeholder="Search"/>
                        </p>
                    </div>
                    <TabSwitcher tabs={goalTabs} default="Active" onSwitch={switchTab}/>
                    <div className={classes.panelContainer}>
                        {
                            goals[activeTab] ? (
                                    goals[activeTab].length == 0
                                        ? <div style={{margin: 10, fontSize: 14, color: "gray", textAlign: "center"}}>
                                            <div style={{width: 250, margin: "0 auto"}}>
                                                <SharedGoalsPlaceholder style={{width: 250, height: 200}}/>
                                            </div>
                                            This area seems empty. Create a new goal to get started!
                                        </div>
                                        : goals[activeTab].map(goal => (
                                            <Link to={`/team/${props.team}/projects/${props.projectKey}/goals/${goal.id}`} key={goal.id}
                                                  className="panel-block">
                                                <span className="panel-icon">
                                                    <Priority type={goal.priority}/>
                                                </span>
                                                <div className={classes.panelItem}>
                                                    <div style={{height: 24}}>
                                                        <span style={{
                                                            maxWidth: 280,
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            display: "inline-block",
                                                            textOverflow: "ellipsis"
                                                        }}>{goal.title}</span>

                                                        {goal.milestone &&
                                                        <span style={{
                                                            fontSize: 13,
                                                            color: "darkgray",
                                                            maxWidth: 100,
                                                            display: "inline-block",
                                                            float: "right",
                                                            marginRight: 10
                                                        }}>
                                                <MdIcon value="mdi-flag-checkered"/>{goal.milestone}</span>
                                                        }
                                                    </div>
                                                    <div className={classes.statsContainer}>
                                                        <span className={classes.stat}><b>Deadline: </b>{goal.deadline}</span>
                                                        <span className={classes.stat} style={{float: "right"}}>
                                                            <Progress progress={goal.progress} pressure={goal.pressure}
                                                                      className={classes.progress}/>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                ) :
                                <div style={{height: 150}} className="centered-absolutely">
                                    <Spin/>
                                </div>
                        }

                    </div>
                    <div className="panel-block">
                        <PrimaryButton onClick={() => setModalVisible(true)}
                                className="is-fullwidth">
                            Create a new goal
                        </PrimaryButton>
                    </div>
                </nav>
            </div>
            <NewGoal team={props.team} project={props.projectKey} visible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    );
};

export default Goals;
