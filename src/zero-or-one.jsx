//@flow

import React from 'react';

export default class ZeroOrOne extends React.Component<{}> {
    render() {
        return (
            <div>
                <h2>Zero Or One Parent Problem</h2>

                <div>Prompt:</div>
                <div>Given a list of [parent, child] pairs, write the function zeroOrOneParent that returns a list of nodes with 0 parents and a list of nodes with exactly 1 parent.</div>
                <div>Input : [[1, 4], [1, 5], [2, 5], [2, 6], [2, 7], [3, 8], [5, 9], [6, 9], [6, 10], [7, 11], [8, 11]]</div>
                <div>Output : [[1, 2, 3], [4, 6, 7, 8, 10]]</div>
            </div>
        );
    }
}
