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
            activeCardId: null,
            noClick: false,
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

    /**
     * Set state to initial state TODO: DRY
     */
    resetGame() {
        this.setState({
            cardsData: this.generateCardsData(),
            activeCardId: null
        })
    }

    /**
     * Main game logic. Called when a card is clicked. Split up in subfunctions.
     * @param {Number} idOfClickedCard
     */
    handleCardTurnOver(idOfClickedCard) {
        console.log('handleCardTurnOver called');
        // if allowed to handle click, set cardsData entry for clicked card to visible:true while not mutating any state
        !this.state.noClick && this.setCardVisibility(idOfClickedCard, true, this.checkForPairing)


    }

    /**
     * First part of main logic.
     * @param {Number} id
     * @param {Boolean} visible
     * @param {Function} cb
     */
    setCardVisibility(id, visible, cb) {

        const cardsDataEntryListIndex = this.state.cardsData.findIndex((el) => el.id === id);
        const copiedCardsData = [...this.state.cardsData];
        const copiedCardsDataEntry = {...copiedCardsData[cardsDataEntryListIndex]};
        copiedCardsDataEntry.visible = visible;
        copiedCardsData[cardsDataEntryListIndex] = copiedCardsDataEntry;

        const callback = cb ? cb.bind(this, id) : null; // handle unpassed callback
        this.setState({
            cardsData: copiedCardsData
        }, callback); // make sure the next part is run after setState has finished
    }

    /**
     * Second part of main logic.
     * Run after a clicked card is turned over (its data entry is set to visible:true)
     */
    checkForPairing(idOfClickedCard) {

        // if – in the current round – no card was turned yet, register id of clicked card as activeCardId
        const activeCardId = this.state.activeCardId;
        if (!activeCardId) {
            this.setState({
                activeCardId: idOfClickedCard
            })
        }
        // else ( if – in the current round – a card has already been turned over), compare colors of both cards using the cards IDs
        else {
            // prevent user from turning over other cards while the current pair is showing
            this.setState({noClick: true});

            // if they are not equal, set both card data entries to visible:false again
            const colorOfFirstCard = this.getColorForCardId(activeCardId);
            const colorOfSecondCard = this.getColorForCardId(idOfClickedCard);
            if (colorOfFirstCard !== colorOfSecondCard) {
                // give it a bit of delay (TODO: use css to slim code)
                setTimeout(() => {
                    [activeCardId, idOfClickedCard].forEach((id) => this.setCardVisibility(id, false, null));
                    // allow user to turn over cards again
                    this.setState({noClick: false});
                }, 2000)

            }
            // in any case set activeCardId to null again
            this.setState({
                activeCardId: null
            })
        }
    }

    getColorForCardId(id) {
        return this.state.cardsData.find(cardDataItem => cardDataItem.id === id).color;
    }


}

export default App;
