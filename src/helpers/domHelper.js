const formatCard = (match) => {
  if (typeof match === 'undefined') return '';
  let returnString = '';
  const { gameName, matchID, players } = match;

  if (typeof gameName === 'undefined' || typeof matchID === 'undefined') {
    returnString = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text text-center"> ...no matches found.</p>
      </div>
    </div>
    `;
  } else {
    returnString = `
    <div class="col-md-3 col-sm-6">
      <div class="card">
        <div class="card-header bg-secondary text-light">
          <h5 class="card-title">${gameName}</h5>
        </div>
        <div class="card-body">
          <p class="card-text text-center">${matchID}</p>
          <hr />
          <div>
            <h5>Join</h5>
            <button
              type="button"
              class="btn btn-primary btn-sm join-button ${!players[0].name ? '' : 'disabled' }"
              data-matchID="${matchID}"
              data-gameName="${gameName}"
              data-playerID="0"
            >
              <i class="fas fa-user-astronaut"></i> 1 : ${!players[0].name ? 'waiting...' : players[0].name }
            </button>
            <br />
            <button
              type="button"
              class="btn btn-danger btn-sm join-button mt-1 ${!players[1].name ? '' : 'disabled' }"
              data-matchID="${matchID}"
              data-gameName="${gameName}"
              data-playerID="1"
            >
              <i class="fas fa-user-astronaut"></i> 2 : ${!players[1].name ? 'waiting...' : players[1].name }
            </button>
            <hr />
            <h5>Watch</h5>
            <button
              type="button"
              class="btn btn-primary btn-sm join-button"
              data-matchID="${matchID}"
              data-gameName="${gameName}"
              data-playerID
            >
              <i class="fas fa-glasses"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  return returnString;
}

const formatServerError = (message) => {
  const returnString = `
  <div class="col-md-3 col-sm-6 m-0">
    <div class="card">
      <div class="card-header bg-danger">
        <h5 class="card-title text-white">Error</h5>
      </div>
      <div class="card-body">
        <p class="card-text text-center">${ !message ? 'General Server Error' : message }</p>
      </div>
    </div> 
  </div>
  `;
  return returnString;
}

const formatMatchButtons = (title) => {
  if (typeof title === 'undefined') throw new Error('title undefined');

  let returnString = `
    <button
      type="button"
      class="btn btn-primary btn-sm m-2 start-match"
      data-gameTitle="${title}"
    >Start a New ${title} Match 
    <i class="fas fa-gamepad"></i>
    </button>
  `;
  return returnString;
}

export default { formatCard, formatMatchButtons, formatServerError }
