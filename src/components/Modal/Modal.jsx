import PropTypes from 'prop-types';

export default function Modal({ modalLarge, onModalClose }) {
  return (
    <div className="Overlay" onClick={onModalClose}>
      <div className="Modal">
        <img className="ModalImage" src={modalLarge} alt="modal large view" />
      </div>
    </div>
  );
}
Modal.propTypes = {
  modalLarge: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
