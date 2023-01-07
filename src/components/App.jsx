import { useEffect, useState } from 'react';

import * as API from './service/Api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export function App() {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    toggleLoading();

    if (page > 1) {
      async function fetchMore() {
        const response = await API.addGallery(query, page);
        setTimeout(() => {
          setGallery(prevGallery => [...prevGallery, ...response]);
          toggleLoading();
        }, 500);

        setTimeout(() => {
          window.scrollBy({
            top: 480,
            behavior: 'smooth',
          });
        }, 600);
      }
      fetchMore();
      return;
    }

    async function fetchData() {
      const response = await API.addGallery(query);
      setTimeout(() => {
        setGallery(response);
        toggleLoading();
      }, 1000);
    }

    fetchData();
  }, [query, page]);

  const handleSubmit = submitQuery => {
    if (query === submitQuery) {
      return;
    } else {
      setQuery(submitQuery);
      setPage(1);
    }
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);

    // (() => {
    //   window.scrollBy({
    //     top: 480,
    //     behavior: 'smooth',
    //   });
    // })();
  };

  const toggleLoading = () => {
    setLoading(prevLoading => !prevLoading);
  };

  return (
    <div>
      <SearchBar onSubmiting={handleSubmit} />
      {loading && <Loader />}
      {gallery.length !== 0 && (
        <>
          <ImageGallery gallery={gallery} />
          <Button handleLoadMore={handleLoadMoreClick} />
        </>
      )}
    </div>
  );
}

// export class App extends Component {
//   state = {
//     gallery: [],
//     page: 0,
//     loading: false,
//     query: '',
//   };

//   handleSubmit = async submitQuery => {
//     if (this.state.query === submitQuery) {
//       return;
//     }
//     this.toggleLoading();
//     const response = await API.addGallery(submitQuery);

//     setTimeout(() => {
//       this.setState({ gallery: response, page: 1, query: submitQuery });
//       this.toggleLoading();
//     }, 1000);
//   };
//   handleLoadMoreClick = async () => {
//     this.toggleLoading();
//     const response = await API.addGallery(
//       this.state.query,
//       (this.state.page += 1)
//     );
//     setTimeout(() => {
//       this.setState(prevState => ({
//         gallery: [...prevState.gallery, ...response],
//         page: (prevState.page += 1),
//       }));
//       this.toggleLoading();
//     }, 500);

//     // (() => {
//     //   window.scrollBy({
//     //     top: 480,
//     //     behavior: 'smooth',
//     //   });
//     // })();

//     setTimeout(() => {
//       window.scrollBy({
//         top: 480,
//         behavior: 'smooth',
//       });
//     }, 600);
//   };

//   toggleLoading = () => {
//     this.setState(prevState => ({ loading: !prevState.loading }));
//   };

//   render() {
//     const { gallery, loading } = this.state;
//     return (
//       <div>
//         <SearchBar onSubmiting={this.handleSubmit} />
//         {loading && <Loader />}
//         {gallery.length !== 0 && (
//           <>
//             <ImageGallery gallery={gallery} />
//             <Button handleLoadMore={this.handleLoadMoreClick} />
//           </>
//         )}
//       </div>
//     );
//   }
// }
