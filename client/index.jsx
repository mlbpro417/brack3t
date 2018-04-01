import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Players from './Players';
import API_KEY from '../api_key';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      description: '',
    };
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

  handleSubmit() {
    const data = {
      tournament: {
        api_key: API_KEY,
        name: this.state.name,
        url: this.state.url,
        description: this.state.description,
      },
    };
    this.submitTournament(data);
  }

  submitTournament(tournament) {
    axios({
      method: 'POST',
      url: 'https://api.challonge.com/v1/tournaments.json',
      data: tournament,
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
            <button className="create-submit-button" type="submit" onClick={() => this.handleSubmit()}>Create Tournament!</button>
          </form>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app')); // eslint-disable-line
