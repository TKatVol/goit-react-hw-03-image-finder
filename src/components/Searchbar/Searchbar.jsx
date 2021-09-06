import { Component } from 'react';
import s from '../Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        searchQuery: '',
    }

    handleSubmit = event => {
        event.preventDefault();

        const { searchQuery } = this.state;
        this.props.onSubmit(searchQuery);
        this.setState({ searchQuery: '' });
    };

    handleChange = event => {
        this.setState({ searchQuery: event.currentTarget.value.trim()});
    };

    render() {
        const { searchQuery } = this.state;

        return (
            <header className={s.Searchbar}>
                <form onSubmit={this.handleSubmit} className={s.SearchForm}>
                    <button type="submit" className={s.SearchFormButton}>
                        <span className={s.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        value={searchQuery}
                        onChange={this.handleChange}
                        className={s.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}
   
