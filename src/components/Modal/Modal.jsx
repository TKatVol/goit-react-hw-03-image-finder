import { Component } from 'react';
import { createPortal } from 'react-dom';

import s from '../Modal/Modal.module.css'; 

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydownEsc);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydownEsc);
    }

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

    handleKeydownEsc =  event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <div className={s.Overlay} onClick={this.handleBackdropClick}>
                <div className={s.Modal}>
                    {this.props.children}
                </div>
            </div>,
            modalRoot,
        )
    }
}
