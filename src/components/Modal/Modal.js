import React from 'react';
import './Modal.scss';
export default function Modal({ children, click }) {
  const findByKey = (name) =>
    children.map((child) => {
      if (child.key === name) {
        return child;
      }
    });
  const closeModal = (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('modal-close')) {
      click();
    }
  };

  return (
    <div className="modal-mask modal-close" onClick={closeModal}>
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="modal-header">{findByKey('header')}</div>
          <div className="modal-body">{findByKey('body')}</div>
          <div className="modal-footer">
            <button className="modal-close" onClick={closeModal}>
              Close
            </button>
            {findByKey('footer')}
          </div>
        </div>
      </div>
    </div>
  );
}
