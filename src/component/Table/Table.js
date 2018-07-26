import React from 'react';
import PropTypes from 'prop-types';
import {sortBy} from 'lodash';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import Button,{ButtonWithSortReverse} from '../Button/Button';

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

const Sort = ({sortKey, onSort, isSortReverse, ...rest}) =>{
    return(
        <ButtonWithSortReverse
            sortKey={sortKey}
            isSortReverse={isSortReverse}
            onClick={() => onSort(sortKey,isSortReverse)}
            {...rest}
        />
    )
}


const Table = ({list, sortKey, isSortReverse, onDismiss, onSort}) => {
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
                    onSort={onSort}
                >
                  Title
                </Sort>
              </span>
                <span style={{width: '30%'}}>
                <Sort
                    activeKey={sortKey}
                    sortKey={'AUTHOR'}
                    isSortReverse={isSortReverse}
                    onSort={onSort}
                >
                  Author
                </Sort>
              </span>
                <span style={{width: '10%'}}>
                <Sort
                    activeKey={sortKey}
                    sortKey={'COMMENTS'}
                    isSortReverse={isSortReverse}
                    onSort={onSort}
                >
                  Comments
                </Sort>
              </span>
                <span style={{width: '10%'}}>
                <Sort
                    activeKey={sortKey}
                    sortKey={'POINTS'}
                    isSortReverse={isSortReverse}
                    onSort={onSort}
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