import React, {Component} from 'react';
import NavBar from './components/NavBar';
import shuffleArray from 'shuffle-array'

import './App.css';
import Card from "./components/Card";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardsData: this.generateCardsData(),
            activeCardId: null
        };

        this.resetGame = this.resetGame.bind(this);
    }

    render() {
        return (
            <div className="App">
                <NavBar headingText="Memory Game" onResetBtnClick={this.resetGame}/>
                <div className="cardboard">
                    {
                        this.state.cardsData.map((cardDataEntry, i) => <Card key={i}{...cardDataEntry}/>)
                    }
                </div>
            </div>
        );
    }

    static NUM_PAIRS = 9;

    /**
     * Generates new memory data
     * @returns {Array}
     */
    generateCardsData() {
        const me = this;
        // generate {NUM_PAIRS} random colors
        const getRandom8bitNum = () => Math.floor(Math.random() * 256); // Random between 0-255;
        const getRandomRgb = () => `rgb(${getRandom8bitNum()},${getRandom8bitNum()},${getRandom8bitNum()})`;
        const randomColors = Array(App.NUM_PAIRS).fill('').map(el => getRandomRgb());

        // for each color generate two objects containing an id and the color and put them in a list
        let id = 1, cardsData = [];

        randomColors.forEach(color => {
            addNewCardEntry(color);
            addNewCardEntry(color);
        });

        function addNewCardEntry(color) {
            cardsData.push({
                id,
                color,
                visible: false,
                onClick: me.handleCardTurnOver.bind(me, id)
            });
            id++
        }

        // shuffle that list and return it

        return shuffleArray(cardsData, {'copy': true});
    }

    resetGame() {
        this.setState({
            cardsData: this.generateCardsData(),
            activeCardId: null
        })
    }

    /**
     * Main game logic. Called when a card is clicked
     * @param {Number} idOfClickedCard
     */
    handleCardTurnOver(idOfClickedCard) {
        // set cardsData entry for clicked card to visible:true while not mutating any state
        const cardsDataEntryId = this.state.cardsData.findIndex((el) => el.id === idOfClickedCard);
        const copiedCardsData = [...this.state.cardsData];
        const copiedCardsDataEntry = {...copiedCardsData[cardsDataEntryId]};
        copiedCardsDataEntry.visible = true;
        copiedCardsData[cardsDataEntryId] = copiedCardsDataEntry;
        this.setState({
            cardsData: copiedCardsData
        })

    }

}

export default App;
