class Card { // initialize card class to hold card individual card info
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    describe() { // describe the card
        return `${this.value} of ${this.suit}`;
    }

    faceCardValue() { // assign numeric values to face cards
        if (this.value === 'J') {
            return 11;
        } else if (this.value === 'Q') {
            return 12;
        } else if (this.value === 'K') {
            return 13;
        } else if (this.value === 'A') {
            return 14;
        } else {
            return this.value;
        }
    } // end of faceCardValue()
}

class Deck { // initialize deck class to create a deck and hold information on where cards are
    constructor() {
        this.cards = [];
        this.active = [];
        
        this.createDeck();
    }

    createDeck() { // function to create the deck of cards by iterating through two arrays and pushing each combination to the cards array
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(value, suit));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) { // start from the last card, as long as deck is greater than 0, go down one
            let temp = Math.floor(Math.random() * (i + 1)); // let a temporary variable hold a random number between 0 and i
            [this.cards[i], this.cards[temp]] = [this.cards[temp], this.cards[i]]; // swap the temporary variable position in the array with the position of the current index
        }
    }

    deal() {
        return this.cards.pop(); // returns the last card of the deck
    }

    describe() { // function for describing deck length
        return `${this.cards.length} cards in the deck`;
    }
}

class Player { // initialize class to hold player name and current hand
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.discard = [];
        this.score = 0;
    }

    getTotal() {
        return this.hand.length + this.discard.length;
    }

    describe() { // describe player info
        return `Name: ${this.name}\nTotal cards: ${this.getTotal()}\nHand: ${this.hand.length}\nScore: ${this.score}`;
    }
}

class StartGame { // initialize StartGame class to create and manage the game
    constructor(playerNames) { // takes in names of players
        this.players = playerNames.map(name => new Player(name)); // creates a players array that takes all names passed to the instance and maps them to a new Player instance
        this.deck = new Deck(); // creates a new deck instance of 52 cards
    }

    dealCards() {
        while (this.deck.cards.length) {
            for (let player of this.players) {
                let card = this.deck.deal();
                if (card) {
                    player.hand.push(card);
                } // end of if
            } // end of for
        } // end of while
    } // end of dealCards method

    playRound() {
        game.players.forEach(player => console.log(player.describe())); // show players name and number of cards

        for (let player of this.players) { // iterate through the players and describe the card that is being pulled
            console.log(`Name: ${player.name}\nCard: ${player.hand[player.hand.length - 1].describe()}`)
        }

        let card1 = this.players[0].hand.pop();
        let card2 = this.players[1].hand.pop();

        let result = this.compareCards(card1, card2);
        
        console.log(result);
    } // end of startRound()

    playGame() {
        while (this.players[0].getTotal() > 0 && this.players[1].getTotal() > 0) { // while loop to play rounds until a player hits 0 cards
            this.playRound();
        }
            let player1Score = this.players[0].score;
            let player2Score = this.players[1].score;

            if (player1Score > player2Score) {
                console.log(`${this.players[0].name} wins with a score of ${player1Score}`)
                console.log(`${this.players[1].name} loses with a score of ${player2Score}`)
            } else if (player2Score > player1Score) {
                console.log(`${this.players[1].name} wins with a score of ${player2Score}`)
                console.log(`${this.players[0].name} loses with a score of ${player1Score}`)
            } else {
                console.log("It's a tie!");
            }

            console.log('Thank you for playing!');
            // if (this.players[0].hand.length === 0) {
            //     player.hand = player.discard;
            //     player.discard = [];
            //     this.deck.shuffle(this.players[0].hand);
            // } else if (this.players[1].hand.length === 0) {
            //     player.hand = player.discard;
            //     this.deck.shuffle(player.hand);
            // }
    }

    compareCards(card1, card2) { // compare card values and show winner
        let value1 = card1.faceCardValue();
        let value2 = card2.faceCardValue();

        if (value1 > value2) {
            // this.players[0].discard.push(card1, card2);
            this.players[0].score++;
            return `${card1.describe()} beats ${card2.describe()}`;
        } else if (value1 < value2) {
            // this.players[1].discard.push(card1, card2);
            this.players[1].score++;
            return `${card2.describe()} beats ${card1.describe()}`;
        } else {
            // this.players[0].discard.push(card1);
            // this.players[1].discard.push(card2);
            return `It's a tie`;
        }
        
    } // end of compareCards(card1, card2)

    describe() {
        return `Game includes ${this.players.length} players`
    } // end of describe method
} // end of StartGame class

let player = new Player('Andrew Hughes'); // new instance of Player
console.log(player.describe());

let deck = new Deck(); // new instance of Deck
deck.shuffle();
console.log(deck.describe());

let game = new StartGame(['Andrew', 'Michaela']); // new instance of StartGame including two players
game.deck.shuffle();
game.dealCards();
game.playGame();