import React, {Component, Suspense} from "react";
import './RenderOnePokemon.css';
import {Card, Image, Loader} from "semantic-ui-react";

export default class RenderOnePokemon extends Component{

    render(){
        const { pokemon, frenchName, description } = this.props;
        return (
            <div className="render-one-pokemon-container">
                <Suspense fallback={<Loader />}>
                    {pokemon !== null ? (
                        <Card className="custom-card-container">
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='small'
                                    src={pokemon.sprites.front_default}
                                />
                                <Card.Header>{frenchName}</Card.Header>
                                <Card.Meta>{description}</Card.Meta>
                            </Card.Content>
                            <hr/>
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