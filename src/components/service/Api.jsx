import axios from 'axios';

const API_KEY = '31515137-b1768032f7676aa2d663b226f';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const addGallery = async (query, page = 1) => {
  try {
    const {
      data: { hits },
    } = await axios.get(
      `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    const galleryArray = hits.map(({ id, webformatURL, largeImageURL }) => ({
      id: id,
      image: webformatURL,
      large: largeImageURL,
    }));

    return galleryArray;
  } catch (error) {
    console.log(error);
    alert('Something wrong');
  }
};
