import React from 'react';
import PropTypes from 'prop-types';

const Card = ({onClick, color, visible}) => (
    <div
        className={"card" + (visible ? ' visible' : '')}    // style depending on viewmodel
        onClick={!visible ? onClick : null}                 // turned cards have no click handler
        style={{backgroundColor: color}}                    // individual color
    >

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