import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ gallery }) {
  return (
    <ul className="ImageGallery">
      {gallery.map(({ id, image, large }) => (
        <ImageGalleryItem key={id} image={image} large={large} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      large: PropTypes.string.isRequired,
    })
  ).isRequired,
};
