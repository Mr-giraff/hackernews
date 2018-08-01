import React from 'react';
import PropTypes from 'prop-types';
import {sortBy} from 'lodash';

import Button, {ButtonWithSortReverse} from '../Button/Button';

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};

const isItem = onDismiss => item =>
    (
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
            <Button className="button-inline" onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
          </span>
        </div>
    )

const Sort = ({sortKey, onSort, isSortReverse, ...rest}) =>
    (
        <ButtonWithSortReverse
            sortKey={sortKey}
            isSortReverse={isSortReverse}
            onClick={() => onSort(sortKey, isSortReverse)}
            {...rest}
        />
    )

class Table extends React.Component {

    constructor() {
        super();
        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        }
        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({sortKey, isSortReverse});
    }

    render() {
        const {sortKey, isSortReverse} = this.state;
        const {list, onDismiss} = this.props;
        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;

        return (
            <div className="table">
                <div className="table-header">
              <span style={{width: '40%'}}>
                <Sort
                    activeKey={sortKey}
                    sortKey={'TITLE'}
                    isSortReverse={isSortReverse}
                    onSort={this.onSort}
                >
                  Title
                </Sort>
              </span>
                    <span style={{width: '30%'}}>
                <Sort
                    activeKey={sortKey}
                    sortKey={'AUTHOR'}
                    isSortReverse={isSortReverse}
                    onSort={this.onSort}
                >
                  Author
                </Sort>
              </span>
                    <span style={{width: '10%'}}>
                <Sort
                    activeKey={sortKey}
                    sortKey={'COMMENTS'}
                    isSortReverse={isSortReverse}
                    onSort={this.onSort}
                >
                  Comments
                </Sort>
              </span>
                    <span style={{width: '10%'}}>
                <Sort
                    activeKey={sortKey}
                    sortKey={'POINTS'}
                    isSortReverse={isSortReverse}
                    onSort={this.onSort}
                >
                  Points
                </Sort>
              </span>
                    <span style={{width: '10%'}}>
                Archive
              </span>
                </div>
                {reverseSortedList.map(isItem(onDismiss))}
            </div>
        );
    }
}

// const Table = ({list, pattern, onDismiss}) => {
//     const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());
//
//     return (
//         <div className="table">
//             {list.filter(isSearched(pattern)).map(isItem(onDismiss))}
//         </div>
//     );
//
// }

export default Table


const largeColumn = {
    width: '40%',
};

const midColumn = {
    width: '30%',
};

const smallColumn = {
    width: '10%',
};

Table.propTypes = {
    list: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
};