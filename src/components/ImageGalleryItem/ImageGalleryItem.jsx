import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ image, large }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    toggleModal();
    window.addEventListener('keydown', handleKeyPress);
  };

  const handleKeyPress = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', handleKeyPress);
      toggleModal();
    }
  };

  // EventListener
  const handleBackdropClick = e => {
    if (e.target.className === 'Overlay') {
      toggleModal();
      window.removeEventListener('keydown', handleKeyPress);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={image}
        alt={large}
        onClick={handleModalOpen}
      />
      {isModalOpen && (
        <Modal modalLarge={large} onModalClose={handleBackdropClick} />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
};
