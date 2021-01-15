import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'

class App extends Component {
    componentDidMount() {
       axios.get('http://localhost:5000/users')
        .then(res => {
          const characters = res.data.users_list;
          this.setState({ characters });
        })
        .catch(function (error) {
      //Not handling the error. Just logging into the console.
      console.log(error);
        });
    }
    
    state = {
      characters: [],
    }

    removeCharacter = index => {
      const { characters } = this.state

      this.setState({
        characters: characters.filter((character, i) => {
          return i !== index
        }),
      })
    }

   handleSubmit = character => {
    this.makePostCall(character).then( callResult => {
      if (callResult !== false) {
         this.setState({ characters: [...this.state.characters, callResult] });
      }
    });
   }

   handleDelete = (character, index) => {
    this.makeDeleteCall(character.id).then( callResult => {
      if (callResult !== false) {
         this.removeCharacter(index);
      }
    });
   }

    render() {
      const { characters } = this.state

      return (
        <div className="container">
          <Table characterData={characters} remove={this.handleDelete} />
          <Form handleSubmit={this.handleSubmit} />
        </div>
      )
    }

    makePostCall(character){
        return axios.post('http://localhost:5000/users', character)
                    .then(function (response) {
                       console.log(response);
                       if (response.status === 201) {
                          return response.data;
                       } else {
                          return false;
                       }
                    })
                    .catch(function (error) {
                       console.log(error);
                       return false;
                    });
    }

    makeDeleteCall(id){
        return axios.delete('http://localhost:5000/users/' + id)
                    .then(function (response) {
                       if (response.status === 200) {
                          console.log(response.data);
                          return response.data;
                       } else {
                          console.log("delete failed");
                          return false;
                       }
                    })
                    .catch(function (error) {
                       console.log(error);
                       return false;
                    });
    }
}

export default App
