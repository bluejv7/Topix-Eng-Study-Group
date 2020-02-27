//@flow

import autobind from 'autobind-decorator';
import * as mobx from 'mobx';
import * as mobxreact from 'mobx-react';
import React from 'react';
import {Form, Input, Label, Segment, TextArea} from 'semantic-ui-react';

@autobind
@mobxreact.observer
export default class SharedAncestor extends React.Component<{}> {
    @mobx.observable pairs = '[[1, 4], [1, 5], [2, 5], [2, 6], [2, 7], [3, 8], [5, 9], [6, 9], [6, 10], [7, 11], [8, 11]]';
    @mobx.observable person1 = '9';
    @mobx.observable person2 = '7';
    @mobx.observable output = '';

    componentDidMount() {
        this._updateOutput();
    }

    onInput1Change(event: SyntheticEvent<any>) {
        this.person1 = event.currentTarget.value;
        this._updateOutput();
    }

    onInput2Change(event: SyntheticEvent<any>) {
        this.person2 = event.currentTarget.value;
        this._updateOutput();
    }

    onTextAreaChange(event: SyntheticEvent<any>) {
        this.pairs = event.currentTarget.value;
        this._updateOutput();
    }

    _updateOutput() {
        try {
            this.output = sharedAncestor(JSON.parse(this.pairs), parseInt(this.person1), parseInt(this.person2));
        }
        catch(error) {
            console.log(error);
            this.output = error.message;
        }
    }

    render() {
        return (
            <div>
                <h2>Shared Ancestor Problem</h2>

                <div>Prompt:</div>
                <div>Given a list of [parent, child] pairs, write the function sharedAncestor(pairs, person1, person2) that returns an ancestor that both people share. If none exist, return null. If more than 1 exist, return any of them.</div>

                <div style={{marginTop: '1rem'}}>Examples:</div>
                <div>pairs : [[1, 4], [1, 5], [2, 5], [2, 6], [2, 7], [3, 8], [5, 9], [6, 9], [6, 10], [7, 11], [8, 11]]</div>
                <div>Input : pairs, 9, 7</div>
                <div>Output : 2</div>
                <div>Input : pairs, 4, 11</div>
                <div>Output : null</div>
                <div>Input : pairs, 1, 4</div>
                <div>Output : null</div>

                <Segment.Group compact={true}>
                    <Segment style={{width: 1000, display: 'flex', justifyContent: 'space-between'}}>
                        <Form style={{width: '75%'}}>
                            <Label attached="top">Input: Pairs</Label>
                            <TextArea onChange={this.onTextAreaChange} placeholder="pairs" value={this.pairs} />
                        </Form>

                        <Form>
                            <Label attached="top">Input: person1</Label>
                            <Input
                                onChange={this.onInput1Change}
                                placeholder="person1"
                                style={{width: '8rem'}}
                                value={this.person1}
                            />
                        </Form>

                        <Form>
                            <Label attached="top">Input: person2</Label>
                            <Input
                                onChange={this.onInput2Change}
                                placeholder="person2"
                                style={{width: '8rem'}}
                                value={this.person2}
                            />
                        </Form>
                    </Segment>

                    <Segment>
                        <Segment style={{width: 500}}>
                            <Label attached="top">Output</Label>
                            <pre>{this.output}</pre>
                        </Segment>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}

function getAncestorInfos(ancestors: Array<number>, person: number) {
    return ancestors.map(a => {
        return {ancestor: a, person: person};
    });
}

function sharedAncestor(pairs: Array<Array<number>>, person1: number, person2: number) {
    let ancestors = {};
    pairs.forEach(pair => {
        if (!ancestors[pair[1]])
            ancestors[pair[1]] = [];
        ancestors[pair[1]].push(pair[0]);
    });

    if (!ancestors[person1] || ancestors[person1].length == 0)
        return 'null';
    if (!ancestors[person2] || ancestors[person2].length == 0)
        return 'null';

    const person1AncestorInfos = getAncestorInfos(ancestors[person1], 1);
    const person2AncestorInfos = getAncestorInfos(ancestors[person2], 2);
    let currentAncestorInfos = [].concat(person1AncestorInfos, person2AncestorInfos);

    let viewedAncestors = {};
    do {
        let ancestorInfo = currentAncestorInfos.pop();
        const ancestor = ancestorInfo.ancestor;
        const viewedAncestor = viewedAncestors[ancestor];
        if (viewedAncestor && viewedAncestor.person != ancestorInfo.person) {
            return ancestor;
        }
        viewedAncestors[ancestor] = ancestorInfo;

        if (ancestors[ancestor])
            currentAncestorInfos.push(...getAncestorInfos(ancestors[ancestor], ancestorInfo.person));
    } while (currentAncestorInfos.length != 0);

    return 'null';
}
