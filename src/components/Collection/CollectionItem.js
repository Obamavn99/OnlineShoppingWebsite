import React from 'react'

export default function CollectionItem(props) {

    return (
        <div className="CollectionItem">
            <img src={props.img}></img>
            <div className="collectionitem-overlay">
                <div className="collectionitem-title">{props.name}</div>
                <div className="collectionitem-des">{props.des}</div>
                <div className="collectionitem-price">
                    <div>
                        <p>${props.price}</p>
                            <div className="addtocart-btn-collection">
                                ADD TO CART
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}