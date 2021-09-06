import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

import './App.css';

export default class App extends Component {
  state = {
    searchQuery: '',   
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  }
  
  render() {
    const { searchQuery } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchImages={searchQuery} />        
      </div>
    );
  }
}
