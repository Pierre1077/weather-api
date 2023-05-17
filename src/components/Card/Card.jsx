import React from 'react';
import './Card.css'

const Card = ({name, temperature, clouds, description, wind, sunrise, sunset, togglePin, pin}) => {
    return (
        <div className={'city__card'}>
            <div>
                {description === "Clouds" ?
                    <img
                        src="https://www.meteobelgique.be/staticfiles/images/picto/v2/bc/day/mostcloudy.png"
                        alt=""
                        width={100}
                    />
                    :
                    <img
                        src="https://images.emojiterra.com/google/android-nougat/512px/2600.png"
                        alt=""
                        width={100}
                    />
                }
            </div>
            <h2 className={'city__name'}>{name}</h2>
            <p className={'city__temperature'}>{temperature}</p>
            {/*<p>clouds : {clouds + '%'}</p>*/}

            <div className={'city__infos__container'}>
                <div className={'city__description__wrapper'}>
                    <div>
                        {description === "Clouds" ?
                            <i className="fa-solid fa-cloud"></i>
                            :
                            <i className="fa-solid fa-sun"></i>
                        }
                        <p>{description}</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-wind"></i>
                        <p>{wind}</p>
                    </div>
                </div>
                <div className={'sunrise__wrapper'}>
                    <div>
                        <i className="fa-solid fa-sun i-sunrise"></i>
                        <p>{sunrise}</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-moon i-sunset"></i>
                        <p>{sunset}</p>
                    </div>
                </div>
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