//@flow

import autobind from 'autobind-decorator';
import * as mobx from 'mobx';
import * as mobxreact from 'mobx-react';
import React from 'react';
import {Form, Label, Segment, TextArea} from 'semantic-ui-react';

@autobind
@mobxreact.observer
export default class ZeroOrOne extends React.Component<{}> {
    @mobx.observable input = '[[1, 4], [1, 5], [2, 5], [2, 6], [2, 7], [3, 8], [5, 9], [6, 9], [6, 10], [7, 11], [8, 11]]';
    @mobx.observable output = '';

    componentDidMount() {
        try {
            this.output = zeroOrOne(JSON.parse(this.input));
        }
        catch(error) {
            console.log(error);
            this.output = error.message;
        }
    }

    onTextAreaChange(event: SyntheticEvent<any>) {
        this.input = event.currentTarget.value;

        try {
            this.output = zeroOrOne(JSON.parse(this.input));
        }
        catch(error) {
            console.log(error);
            this.output = error.message;
        }
    }

    render() {
        return (
            <div>
                <h2>Zero Or One Parent Problem</h2>

                <div>Prompt:</div>
                <div>Given a list of [parent, child] pairs, write the function zeroOrOneParent that returns a list of nodes with 0 parents and a list of nodes with exactly 1 parent.</div>
                <div>Input : [[1, 4], [1, 5], [2, 5], [2, 6], [2, 7], [3, 8], [5, 9], [6, 9], [6, 10], [7, 11], [8, 11]]</div>
                <div>Output : [[1, 2, 3], [4, 6, 7, 8, 10]]</div>

                <Segment.Group compact={true}>
                    <Segment style={{width: 500}}>
                        <Form>
                            <Label attached="top">Input</Label>
                            <TextArea onChange={this.onTextAreaChange} placeholder="Input" value={this.input} />
                        </Form>
                    </Segment>

                    <Segment style={{width: 500}}>
                        <Segment>
                            <Label attached="top">Output</Label>
                            <pre>{this.output}</pre>
                        </Segment>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}

function zeroOrOne(pairs: Array<Array<number>>) {
    let zeroParents = [];
    let oneParents = [];

    let numbers = {};
    let childParent = {};
    pairs.forEach(pair => {
        pair.forEach(number => numbers[number] = true);
        let entry = childParent[pair[1]] || 0;
        childParent[pair[1]] = ++entry;
    });

    Object.keys(numbers).forEach(number => {
        if (!childParent[number]) {
            zeroParents.push(number);
        }
        else if (childParent[number] == 1) {
            oneParents.push(number);
        }
    });

    return JSON.stringify([zeroParents, oneParents]);
}
