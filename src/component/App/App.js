import React, {
    Component
} from 'react';
import './App.css';
import Search from '../Search/Search'
import Table from '../Table/Table'
import {ButtonWithLoading} from '../Button/Button'

import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
} from '../../constants/';

import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel,faSpinner } from '@fortawesome/free-solid-svg-icons'
// 全局绑定
library.add(faStroopwafel,faSpinner)


class App extends Component {

    constructor() {
        super();
        this.state = {
            list,
            result: null,
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        }
        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('hello')
        return true;
    }

    setSearchTopStories(result) {
        const {hits, page} = result;
        const {searchKey, results} = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            },
            isLoading: false,
        });
    }

    fetchSearchTopStories(searchTerm, page = 0) {
        this.setState({isLoading: true});
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => this.setState({error: e}));
        ;
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;

        this.setState({searchKey: searchTerm});
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm);
        }
        event.preventDefault();
    }

    onDismiss(id) {
        const {searchKey, results} = this.state;
        const {hits, page} = results[searchKey];
        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);
        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            }
        });
    }

    render() {
        const {searchTerm, results, searchKey, error, isLoading} = this.state;
        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page
        ) || 0;

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
        ) || [];

        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                </div>
                {error
                    ? <div className="interactions">
                        <p>Something went wrong.</p>
                    </div>
                    : <Table
                        list={list}
                        onDismiss={this.onDismiss}
                    />
                }
                <div className="interactions">
                    <ButtonWithLoading
                        isLoading={isLoading}
                        onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
                    >
                        More
                    </ButtonWithLoading>
                </div>
            </div>
        );
    }
}

export default App;

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Rdux',
        url: 'https://facebook.github.io/Rdux/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 1,
    },
];


