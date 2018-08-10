import React from "react";
import { render } from "react-dom";
import Router from "./Router";
import { browserHistory } from "react-router-dom";

render(<Router history={browserHistory}/>, document.getElementById("main"));
