import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleModalOpen = () => {
    this.toggleModal();
    window.addEventListener('keydown', this.handleKeyPress);
    // document.body.style.overflow = 'hidden';
    // document.body.style.height = '100vh';
  };

  handleBackdropClick = e => {
    if (e.target.className === 'Overlay') {
      this.toggleModal();
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  };

  handleKeyPress = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', this.handleKeyPress);
      this.toggleModal();
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { image, large } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={image}
          alt={large}
          onClick={this.handleModalOpen}
        />
        {this.state.isModalOpen && (
          <Modal modalLarge={large} onModalClose={this.handleBackdropClick} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
};
