import PropTypes from 'prop-types';

export default function Button({ handleLoadMore }) {
  return (
    <button className="Button" type="button" onClick={handleLoadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
