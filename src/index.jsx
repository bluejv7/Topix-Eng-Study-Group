//@flow

import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

import SharedAncestor from './shared-ancestor.jsx';
import ZeroOrOne from './zero-or-one.jsx';

export default class Index extends React.Component<{}> {
    render() {
        return (
            <Router>
                <div className="cmp-index">
                    <div className="nav">
                        <h2>Problems</h2>

                        <ul>
                            <li>
                                <Link to="">Home</Link>
                            </li>
                            <li>
                                <Link to="/zero-or-one">Zero Or One Parent</Link>
                            </li>
                            <li>
                                <Link to="/shared-ancestor">Shared Ancestor</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="main">
                        <Route exact path="/" render={() => <h2>Hello!</h2>} />
                        <Route path="/zero-or-one" component={ZeroOrOne} />
                        <Route path="/shared-ancestor" component={SharedAncestor} />
                    </div>
                </div>
            </Router>
        );
    }
}
