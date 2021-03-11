import { LobbyClient } from 'boardgame.io/client';

const lobbyClient = new LobbyClient({ server: 'http://localhost:8080' });
const playerName = "Phillip";
let playerCreds = null;

const buildMatchList = (gameTitle) => {
  if (typeof gameTitle === 'undefined') throw new Error('gameTitle is undefined');

  lobbyClient.listMatches(gameTitle)
    .then((data) => {
      let returnString = ``;

      data.matches.forEach((match, idx) => {
        returnString += `
        <div class="card col-md-3 col-sm-6 m-0">
          <div class="card-body">
            <h5 class="card-title">${match.gameName}</h5>
            <p class="card-text text-center">${match.matchID}</p>
            <hr />
            <div>
              <h5>Join</h5>
              <button
                type="button"
                class="btn btn-primary btn-sm join-button"
                data-matchID="${match.matchID}"
                data-playerID="0"
              >
                <i class="fas fa-user-astronaut"></i> 1
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm join-button"
                data-matchID="${match.matchID}"
                data-playerID="1"
              >
                <i class="fas fa-user-astronaut"></i> 2
              </button>
              <hr />
              <h5>Watch</h5>
              <button
                type="button"
                class="btn btn-primary btn-sm join-button"
                data-matchID="${match.matchID}"
                data-playerID
              >
                <i class="fas fa-glasses"></i>
              </button>
            </div>
          </div>
        </div>  
        `;
      });

      returnString += `
      `;

      $('#matches-in-progress').html(returnString);
      
    })
    .catch(console.error);
}

const buildGameList = () => {
  lobbyClient.listGames()
    .then((data) => {
      data.forEach((title) => {
        buildMatchList(title);
      })
    });
};

const createMatch = () => {
  lobbyClient.createMatch('default', {
    numPlayers: 2
  });
  buildGameList();
}

function joinMatch (event) {
  if (playerCreds !== null) return;
  const btn = $(this);
  const matchID = btn.attr('data-matchID');
  const playerID = btn.attr('data-playerID');
  lobbyClient.joinMatch('default', matchID, {
    playerID,
    playerName,
  })
    .then((data) => {
      playerCreds = data.playerCredentials;
    })
}

const init = () => {
  buildGameList();
  $('#start-match').click(createMatch)
  $('body').on('click', 'button.join-button', joinMatch);
}

init();

// TODO: joinMatch
// TODO: leaveMatch
// TODO: playAgain
