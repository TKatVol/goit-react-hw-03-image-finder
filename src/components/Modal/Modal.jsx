import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styles from "../Modal/Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends React.Component {

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    };
    
    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    };

    handleKeyDown = event => {
        if (event.code === "Escape") {
            this.props.onClose();
        };
    };

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        };
    };
    
    render() {
    
        return createPortal(
            <div className={styles.overlay} onClick = {this.handleBackdropClick}>
                <div className={styles.modal}>
                    {this.props.children}
                </div>
            </div>,
            modalRoot,
        );
    };
};

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element,
};