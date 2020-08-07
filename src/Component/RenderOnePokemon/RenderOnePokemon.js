import React, {Component, Suspense} from "react";
import './RenderOnePokemon.css';
import {Card, Image, Loader} from "semantic-ui-react";
import {POKEMON_TYPES} from "../../config/config";

export default class RenderOnePokemon extends Component{

    render(){
        const { pokemon, frenchName, description } = this.props;
        return (
            <div className="render-one-pokemon-container">
                <Suspense fallback={<Loader />}>
                    {pokemon !== null ? (
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
                                        {pokemon.types.map(element => {
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
                                                <tr>
                                                    <td><span className="span-types" style={{backgroundColor:bgColor}}/></td>
                                                    <td>{translatedTypeName}</td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                </div>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>
                                    Steve wants to add you to the group <strong>best friends</strong><br/>
                                    Steve wants to add you to the group <strong>best friends</strong><br/>
                                    Steve wants to add you to the group <strong>best friends</strong><br/>
                                    Steve wants to add you to the group <strong>best friends</strong><br/>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ) : (
                        <div>

                        </div>
                    )}
                </Suspense>
            </div>
        );
    }
}