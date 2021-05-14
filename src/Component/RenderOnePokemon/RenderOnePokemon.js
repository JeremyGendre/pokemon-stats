import React, {Component, Suspense} from "react";
import './RenderOnePokemon.css';
import {Card, Image, Loader, Table} from "semantic-ui-react";
import {POKEMON_TYPES} from "../../config/config";

export default class RenderOnePokemon extends Component{

    render(){
        const { pokemon, frenchName, description } = this.props;
        return (
            <div className="render-one-pokemon-container">
                <Suspense fallback={<Loader />}>
                    {pokemon !== null && (
                        <Card className="custom-card-container">
                            <Card.Content className="custom-card-content">
                                <Image
                                    floated='right'
                                    size='small'
                                    src={pokemon.sprites.front_default}
                                    className="custom-card-image"
                                />
                                <Card.Header className="text-center">{frenchName}</Card.Header>
                                <Card.Meta className="text-center">{description}</Card.Meta>
                                <div className="card-header-simple-text">
                                    <table className="card-type-table">
                                        <tbody>
                                        {pokemon.types.map((element,index) => {
                                            let bgColor = 'white';
                                            let translatedTypeName = element.type.name;
                                            for(let i = 0; i < POKEMON_TYPES.length; i++){
                                                if(POKEMON_TYPES[i].name === element.type.name){
                                                    bgColor = POKEMON_TYPES[i].color;
                                                    translatedTypeName = POKEMON_TYPES[i].translate;
                                                    break;
                                                }
                                            }
                                            return (
                                                <tr key={"pokemon-type-"+index}>
                                                    <td>
                                                        <div style={{display:'flex'}}>
                                                            <span className="span-types" style={{backgroundColor:bgColor, margin:'auto'}}/>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{display:'flex'}}>
                                                            <div style={{margin:'auto 0.5em'}}>{translatedTypeName}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    <Table celled selectable>
                                        <Table.Body>
                                            {pokemon.stats.map((stat,index)=>{
                                                return (
                                                    <Table.Row key={'pokemon-stats-' + index}>
                                                        <Table.Cell className="text-bold">{stat.stat.name}</Table.Cell>
                                                        <Table.Cell>{stat.base_stat}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Body>
                                    </Table>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )}
                </Suspense>
            </div>
        );
    }
}