window.onload = function() {

    function Game() {
        var game = this;

        this.cards = [];
        this.cardShown = 0;
        this.shownCards = [0, 0];
        this.points = 0;

        this.newGame = function() {
            var windowHeight, windowWidth;

            windowHeight = document.getElementById("gameWindow").clientHeight;
            windowWidth = document.getElementById("gameWindow").clientWidth;
            game.cards = [];
            game.cardShown = 0;
            game.shownCards = [0, 0];
            game.points = 0;
            document.getElementById("gamePoints").innerHTML = 'Points : ' + game.points;
            game.renderCards();
        };

        this.renderCards = function() {
            var html = '';
            var cardValue = 0;
            var cardFound = 0;

            for (i = 0; i < 16; i++) {
                do {
                    cardFound = 0;
                    cardValue = Math.ceil(Math.random() * 8);
                    game.cards.forEach(function(card) {
                        if (card == cardValue) {
                            cardFound++;
                        }
                    });
                } while (cardFound > 1)
                game.cards[i] = cardValue;

                //html += '<div class="card cardHidden" id="card-' + i + '">' + cardValue + '</div>';
                html += '<div class="card cardHidden" id="card-' + i + '"></div>';
            }
            document.getElementById("gameWindow").innerHTML = html;
            for (i = 0; i < 16; i++) {
                document.getElementById("card-" + i).addEventListener("click", function _toggleCard() {
                    var cardId = this.id.replace(/^\D+/g, '');
                    var cardValue = game.cards[cardId];
                    game.shownCards[game.cardShown] = cardId;
                    if (this.classList[1] == 'cardHidden') {
                        game.cardShown++;
                    }

                    if (game.cardShown > 2) {

                    } else {
                        if (this.classList[1] == 'cardHidden') {
                            this.classList.remove("cardHidden");
                            this.classList.add("cardShown" + cardValue);
                        }

                        if (game.cardShown == 2) {
                            var card1 = game.cards[game.shownCards[0]];
                            var card2 = game.cards[game.shownCards[1]];

                            if (card1 == card2) {
                                game.points++;
                                document.getElementById("gamePoints").innerHTML = 'Points : ' + game.points;
                                game.shownCards = [];
                                game.cardShown = 0;
                                if (game.points == 8) {
                                    alert("You WON !!!!")
                                }
                            } else {
                                setTimeout(function() {
                                    game.shownCards.forEach(function(card) {
                                        document.getElementById('card-' + card).classList.remove("cardShown" + game.cards[card]);
                                        document.getElementById('card-' + card).classList.add("cardHidden");
                                    });
                                    game.shownCards = [];
                                    game.cardShown = 0;
                                }, 1250);
                            }

                        }
                    }

                });
            }
        };

        this.checkCards = function() {

        }


    };

    game = new Game();

    document.getElementById("newGameBtn").addEventListener("click", game.newGame);

};