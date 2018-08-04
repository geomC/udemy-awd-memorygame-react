import React from 'react';
import PropTypes from 'prop-types';

const Card = ({onClick, color, visible}) => (
    <div className={"card" + (visible ? ' visible' : '')} onClick={onClick} style={{backgroundColor: color}}>

    </div>
);

Card.propyTypes = {
    id: PropTypes.number,
    color: PropTypes.string,
    visible: PropTypes.bool
};

Card.defaultProps = {
    visible: false,
    onClick: () => console.log('onClick handler of card not implemented yet...')
};

export default Card;