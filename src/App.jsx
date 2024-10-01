import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn';
import ImageModal from './ImageModal';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=YOUR_ACCESS_KEY`
        );
        const data = await response.json();

        if (data.errors) {
          setError(data.errors[0]);
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
        }
      } catch (error) {
        setError('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onSelectImage={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMoreImages} />}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default
