import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({headingText, onResetBtnClick}) => (
    <header>
        <h1>{headingText}</h1>
        <button onClick={onResetBtnClick}>New Game</button>
    </header>
);

NavBar.propTypes = {
    headingText: PropTypes.string,
    onResetBtnClick: PropTypes.func
};
NavBar.defaultProps = {
    headingText: 'Memory Game',
    onResetBtnClick: () => console.log('reset btn clicked, no handler specified...')
};

export default NavBar;