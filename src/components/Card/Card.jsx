import React from 'react';
import './Card.css'

const Card = ({name, temperature, clouds, description, wind, sunrise, sunset, togglePin, pin}) => {
    return (
        <div className={'city__card'}>
            <div>
                {description === "Clouds" ?
                    <img
                        src="https://us.123rf.com/450wm/ihorsw/ihorsw1607/ihorsw160700111/62664016-couleur-soleil-nuageux-ic%C3%B4ne-isol%C3%A9-sur-fond-pictogramme-moderne-plat-affaires-marketing-internet.jpg"
                        alt=""
                    />
                    :
                    <img
                        src="https://media.istockphoto.com/id/951711548/fr/vectoriel/ic%C3%B4ne-soleil-or-jaune-isol%C3%A9-sur-fond-pictogramme-plat-moderne-entreprise-marketing-concept.jpg?s=612x612&w=0&k=20&c=dzKZoYgZFe7GN1Ff_UCMLyotJIXkfDi_IA1S3sUikCs="
                        alt=""
                    />
                }
            </div>
            <h2 className={'city__name'}>{name}</h2>
            <p className={'city__temperature'}>{temperature}</p>
            {/*<p>clouds : {clouds + '%'}</p>*/}

            <div>
                <img src="https://www.123-stickers.com/5404-thickbox/stickers-stickers-nuage.jpg" alt="" width={50}/>
                {description}
            </div>
            <div>
                <img
                    src="https://img.freepik.com/icones-gratuites/vent_318-929764.jpg"
                    alt=""
                    width={50}
                />
                {wind}
            </div>
            <div>
                <img
                    src="https://img.freepik.com/icones-gratuites/lever-du-soleil_318-219627.jpg"
                    alt=""
                    width={50}
                />
                {sunrise}
            </div>
            <div>
                <img
                    src="https://img.freepik.com/icones-gratuites/coucher-soleil_318-219628.jpg"
                    alt=""
                    width={50}
                />
                {sunset}
            </div>
            <button onClick={togglePin} className={'city__pin'}>
                <i className="fa-solid fa-thumbtack"
                   style={{color: pin}}
                >

                </i>
            </button>
        </div>
    );
};

export default Card;