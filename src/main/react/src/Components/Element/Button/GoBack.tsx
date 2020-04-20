import React from 'react';
import {withRouter} from 'react-router-dom';
import MdIcon from "../Icon/MDIcon";

// @ts-ignore
const GoBack = ({history}) => <MdIcon className="primary-colored spc-10 clickable" onClick={() => history.goBack()}
                                      value="mdi-arrow-left mdi-24px" size="24px"/>;

export default withRouter(GoBack);
