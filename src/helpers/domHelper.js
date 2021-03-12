const formatCard = (gameTitle, matchID) => {
  let returnString = '';

  if (typeof gameTitle === 'undefined' || typeof matchID === 'undefined') {
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
    <div class="card col-md-3 col-sm-6 m-0">
      <div class="card-body">
        <h5 class="card-title">${gameTitle}</h5>
        <p class="card-text text-center">${matchID}</p>
        <hr />
        <div>
          <h5>Join</h5>
          <button
            type="button"
            class="btn btn-primary btn-sm join-button"
            data-matchID="${matchID}"
            data-playerID="0"
          >
            <i class="fas fa-user-astronaut"></i> 1
          </button>
          <button
            type="button"
            class="btn btn-danger btn-sm join-button"
            data-matchID="${matchID}"
            data-playerID="1"
          >
            <i class="fas fa-user-astronaut"></i> 2
          </button>
          <hr />
          <h5>Watch</h5>
          <button
            type="button"
            class="btn btn-primary btn-sm join-button"
            data-matchID="${matchID}"
            data-playerID
          >
            <i class="fas fa-glasses"></i>
          </button>
        </div>
      </div>
    </div> 
    `;
  }
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

export default { formatCard, formatMatchButtons }
