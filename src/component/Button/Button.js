import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

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
    <FontAwesomeIcon icon={faCoffee} />

const WithLoading = (Component) => ({isLoading, ...rest}) => {
    return (
        isLoading
            ? <Loading/>
            : <Component {...rest}/>

    )
}

export const ButtonWithLoading = WithLoading(Button);