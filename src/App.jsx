import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMeassage';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=TWdKIGMVXHIV-GQuhHkNrPV0U2cY1GwSUUokCvSx0-E`
        );
        if (!response.ok) {
          throw new Error('Что-то пошло не так');
        }
        const data = await response.json();
        setImages((prevImages) => [...prevImages, ...data.results]);
      } catch (error) {
        setError(error.message); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]); 
    setPage(1); 
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleRequestClose = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />} {}
      {!error && images.length > 0 && (
        <>
          <ImageGallery images={images} onSelectImage={handleSelectImage} />
          <LoadMoreBtn onClick={handleLoadMore} />
        </>
      )}
      {isOpen && (
        <ImageModal
          isOpen={isOpen}
          onRequestClose={handleRequestClose}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
