import React from 'react';

import Button from './Button';

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

const Table = ({list, pattern, onDismiss}) => {

    return (
        <div className="table">
            {list.map(isItem(onDismiss))}
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