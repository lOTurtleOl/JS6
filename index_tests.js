const expect = chai.expect;

describe('Card', function() {
    it('should return the proper numeric value for face cards', function() {
        let card = new Card('K', 'Hearts'); // Create an instance of Card with 'K' value
        expect(card.faceCardValue()).to.equal(13); // Test for proper value
    });
});

