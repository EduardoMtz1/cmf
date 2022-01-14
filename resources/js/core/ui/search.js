import React from 'react';
import Icon from "./icon";

class Search extends React.Component {

    static defaultProps = {
        modifiers: ['negative'],
        placeholder: 'Type to search...',
        onSearch: keyword => {},
        debounce: 1000
    };

    constructor(props) {

        super(props);

        this.state = {
            value: ''
        };

        this.searchTimeout = null;
    }

    handleChange(event) {

        clearTimeout(this.searchTimeout);

        this.setState({
            value: event.target.value
        });

        this.searchTimeout = setTimeout(this.search.bind(this), this.props.debounce);
    }

    handleSubmit(e) {
        this.search();
        e.preventDefault();
    }

    search() {
        this.props.onSearch(this.state.value);
    }

    render() {

        return (
            <div className={'search'}>
                <div className="search__icon">
                    <Icon name={'search'} />
                </div>
                <input
                    autoComplete={'off'}
                    className={'search__input'}
                    name="search"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Search"
                />
            </div>
        );
    }
}

export default Search;
