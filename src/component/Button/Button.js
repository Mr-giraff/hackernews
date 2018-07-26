import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee, faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';

const Button = ({onClick, className = '', children}) => {
    return (
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>
    );
};

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

// 使用全局icon
// const Loading = () =>
//     <FontAwesomeIcon icon="spinner" />

// 局部icon对象
const Loading = () =>
    <FontAwesomeIcon icon={faCoffee}/>

const WithLoading = (Component) => ({isLoading, ...rest}) => {
    return (
        isLoading
            ? <Loading/>
            : <Component {...rest}/>

    )
}

export const ButtonWithLoading = WithLoading(Button);

// 局部icon对象
const AngleUp = () =>
    <FontAwesomeIcon icon={faAngleUp}/>
const AngleDown = () =>
    <FontAwesomeIcon icon={faAngleDown}/>

const WithSortReverse = (Component) => ({isSortReverse, children, ...rest}) => {
    return (
        isSortReverse
            ? <Component {...rest}>{children}<AngleUp/></Component>
            : <Component {...rest}>{children}<AngleDown/></Component>

    )
}

const WithActive = (Component) => ({activeKey, sortKey, className, ...rest}) => {
    const sortClass = classNames(
        className,
        'button-inline',
        {'button-active': sortKey === activeKey}
    );
    return (
        sortKey === activeKey
            ? <Component className={sortClass} {...rest}/>
            : <Button className={sortClass} {...rest}/>
    )
}

export const ButtonWithSortReverse = WithActive(WithSortReverse(Button));

