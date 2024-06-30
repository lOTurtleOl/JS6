const expect = chai.expect;

describe('Card', function() {
    it('should return the proper numeric value for face cards', function() {
        let cardK = new Card('K', 'Hearts'); // Create an instance of Card with 'K' value

        // Test cases for faceCardValue function
        expect(cardK.faceCardValue()).to.equal(13); // Test for King ('K') value
        expect(cardK.faceCardValue('J')).to.equal(11); // Test for Jack ('J') value
        expect(cardK.faceCardValue('Q')).to.equal(12); // Test for Queen ('Q') value
        expect(cardK.faceCardValue('A')).to.equal(14); // Test for Ace ('A') value
    });

    it('should return the proper numeric value for face cards', function() {
        expect(cardK.faceCardValue()).to.equal(13);
    });
});
