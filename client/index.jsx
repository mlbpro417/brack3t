import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import Players from './Players';
import API_KEY from '../api_key';
import { client } from '../client/challonge';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      description: '',
      tournamentType: 'single elimination',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitTournament = this.submitTournament.bind(this);
  }

  onNameChange(input) {
    this.setState({ name: input });
  }

  onUrlChange(input) {
    this.setState({ url: input });
  }

  onDescriptionChange(input) {
    this.setState({ description: input });
  }

  handleSubmit(e) {
    const data = {
      tournament: {
        api_key: API_KEY.API_KEY,
        name: this.state.name,
        url: this.state.url,
        description: this.state.description,
        tournamentType: this.state.tournamentType,
      },
    };
    e.preventDefault();
    this.submitTournament(data);
    console.log(data);
  }

  submitTournament(tournament) { // eslint-disable-line
    // client.tournaments.create({
    //   tournament,
    //   callback: (err, data) => {
    //     console.log(err, data);
    //   },
    // });

    $.ajax({
      method: 'POST',
      url: 'https://api.challonge.com/v1/tournaments.json',
      api_key: API_KEY.API_KEY,
      contentType: 'application/json',
      data: tournament,
      success: (data) => {
        console.log('POST new tournament success');
      },
      error: (data) => {
        console.error('POST not successful', data);
      },
    });
  }

  render() {
    return (
      <div>
        <div>
         <h2>Welcome to Brack3t</h2>
        </div>
        <div>
          <h2>Create a new tournament</h2>
          <form>
            <input className="create-name-input" type="text"  placeholder="Tournament Name" onChange={(input) => this.onNameChange(input.target.value)}></input>
            <input className="create-url-input" type="text"  placeholder="Tournament URL" onChange={(input) => this.onUrlChange(input.target.value)}></input>
            <textarea className="create-description-textarea"  placeholder="Post Tournament Description" onChange={(input) => this.onDescriptionChange(input.target.value)}></textarea>
            <button className="create-submit-button" type="submit" onClick={(e) => this.handleSubmit(e)}>Create Tournament!</button>
          </form>
        </div>
        <div><iframe src="http://challonge.com/HRSF91/module" width="100%" height="500" frameborder="0" scrolling="auto" allowtransparency="true"></iframe>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app')); // eslint-disable-line
