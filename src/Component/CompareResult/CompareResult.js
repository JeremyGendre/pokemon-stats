import React, {Component} from "react";
import './CompareResult.css';
import {Table} from "semantic-ui-react";

export default class CompareResult extends Component{

    render(){
        return (
            <div className="compare-result-container">
                <Table definition selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className="empty-header-cell"/>
                            <Table.HeaderCell>Arguments</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>reset rating</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                            <Table.Cell>Resets rating to default value</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>set rating</Table.Cell>
                            <Table.Cell>rating (integer)</Table.Cell>
                            <Table.Cell>Sets the current star rating to specified value</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}