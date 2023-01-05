import { Component } from 'react';

import * as API from './service/Api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    gallery: [],
    page: 0,
    loading: false,
    query: '',
  };

  handleSubmit = async submitQuery => {
    if (this.state.query === submitQuery) {
      return;
    }
    this.toggleLoading();
    const response = await API.addGallery(submitQuery);

    setTimeout(() => {
      this.setState({ gallery: response, page: 1, query: submitQuery });
      this.toggleLoading();
    }, 1000);
  };
  handleLoadMoreClick = async () => {
    this.toggleLoading();
    const response = await API.addGallery(
      this.state.query,
      (this.state.page += 1)
    );
    setTimeout(() => {
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...response],
        page: (prevState.page += 1),
      }));
      this.toggleLoading();
    }, 500);

    // (() => {
    //   window.scrollBy({
    //     top: 480,
    //     behavior: 'smooth',
    //   });
    // })();

    setTimeout(() => {
      window.scrollBy({
        top: 480,
        behavior: 'smooth',
      });
    }, 600);
  };

  toggleLoading = () => {
    this.setState(prevState => ({ loading: !prevState.loading }));
  };

  render() {
    const { gallery, loading } = this.state;
    return (
      <div>
        <SearchBar onSubmiting={this.handleSubmit} />
        {loading && <Loader />}
        {gallery.length !== 0 && (
          <>
            <ImageGallery gallery={gallery} />
            <Button handleLoadMore={this.handleLoadMoreClick} />
          </>
        )}
      </div>
    );
  }
}
