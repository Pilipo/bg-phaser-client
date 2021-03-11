import { LobbyClient } from 'boardgame.io/client';

const lobbyClient = new LobbyClient({ server: 'http://localhost:8080' });

const buildMatchList = (gameTitle) => {
  if (typeof gameTitle === 'undefined') throw new Error('gameTitle is undefined');

  lobbyClient.listMatches(gameTitle)
    .then((data) => {
      let returnString = ``;

      data.matches.forEach((match, idx) => {
        returnString += `
        <div class="card col-sm-3 m-0">
          <div class="card-body">
            <h5 class="card-title">${match.gameName}</h5>
            <p class="card-text text-center">${match.matchID}</p>
            <hr />
            <div>
              <h5>Join</h5>
              <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-user-astronaut"></i> 1</button>
              <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-user-astronaut"></i> 2</button>
              <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-glasses"></i></button>
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

const init = () => {
  buildGameList();
  $('#start-match').click(createMatch)
}

init();