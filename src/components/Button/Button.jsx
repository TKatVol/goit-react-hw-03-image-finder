import PropTypes from 'prop-types';
import s from '../Button/Button.module.css';

export function Button({ title, onClick }) {
    return <button className={s.Button} onClick={onClick}>{title}</button>
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}