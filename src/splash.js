import { LobbyClient } from 'boardgame.io/client';
import { kickoffClient } from './game';
import DH from './helpers/domHelper';

const lobbyClient = new LobbyClient({ server: 'http://localhost:8080' });
const playerName = "Phillip";
let playerCreds = null;

const buildMatchList = (gameTitle) => {
  if (typeof gameTitle === 'undefined') throw new Error('gameTitle is undefined');

  lobbyClient.listMatches(gameTitle)
    .then((data) => {
      let domString = '';
      if (!data || data.matches.length === 0) {
        domString += DH.formatCard();
      } else {
        data.matches.forEach((match) => {
          console.log(match);
          domString += DH.formatCard(match);
        });
      }
      $('#matches-in-progress').html(domString);
    })
    .catch(console.error);
}

const buildGameList = () => {
  lobbyClient.listGames()
    .then((data) => {
      data.forEach((title) => {
        buildMatchList(title);
        $('#start-buttons').html(DH.formatMatchButtons(title))
      })
    });
};

function createMatch() {
  const btn = $(this);
  const gameTitle = btn.attr('data-gameTitle');
  lobbyClient.createMatch(gameTitle, {
    numPlayers: 2
  });
  buildGameList();
}

function joinMatch() {
  // if (playerCreds !== null) return;
  const btn = $(this);
  console.log(btn);
  const matchID = btn.attr('data-matchID');
  const playerID = btn.attr('data-playerID');
  const gameName = btn.attr('data-gameName');
  lobbyClient.joinMatch(gameName, matchID, {
    playerID,
    playerName,
  })
    .then((data) => {
      playerCreds = data.playerCredentials;
      // localStorage.setItem('sg-playerCredentials', playerCreds);
      // localStorage.setItem('sg-matchID', matchID);
      buildGameList();
      kickoffClient(playerID, playerCreds);
      toggleLobby();
    })
}

const toggleLobby = () => {
  $('#lobby').toggle();
  
}

const init = () => {
  playerCreds = localStorage.getItem('sg-playerCredentials');
  buildGameList();
  $('body').on('click', 'button.start-match', createMatch);
  $('body').on('click', 'button.join-button', joinMatch);
}

init();

// TODO: fix spectator mode
// TODO: rejoinMatch
// TODO: leaveMatch
// TODO: playAgain
