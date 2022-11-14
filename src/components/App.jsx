import React from "react";
import { Blocks } from "react-loader-spinner";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { ImageGallery } from "../components/ImageGallery/ImageGallery";
import { Button } from "../components/Button/Button";
import { Modal } from "../components/Modal/Modal";

import styles from "../components/App.module.css";

import { galleryApiService } from "./services/gallery-api";

export class App extends React.Component {
  state = {
    query: '',
    gallery: [],
    totalImages: 0,
    page: 1,
    loading: false,
    showModal: false,
    largeImageSrc: '',
    imageAlt: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });

      galleryApiService(query, page)
        .then(gallery => {
          if (gallery.total === 0) {
            return alert("Oops.. Not found! :(");
          };

          this.setState({ totalImages: gallery.total });
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...gallery.hits]
          }));
        })
        .finally(() => this.setState({ loading: false }));
    };
  };

  handleSubmitForm = (query) => {
    this.setState({
      query,
      gallery: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = event => {
    if (event.target.nodeName !== "IMG") {
      return;
    };

    this.setState({
      showModal: true,
      largeImageSrc: event.target.getAttribute("data-large-img-src"),
      imageAlt: event.target.getAttribute("alt"),
    });
  };

  closeModal = () => {
    this.setState({ showModal: false })
  };
 
  render() {
    const { gallery, totalImages, loading, showModal, largeImageSrc, alt } = this.state;
    
    return (
      <div className={styles.app} >

        <Searchbar onSubmit={this.handleSubmitForm} />
        
        {gallery.length > 0 && <ImageGallery gallery={gallery} onClick={this.handleImageClick} />}

        {loading && <Blocks
          visible={this.state.loading}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{ display: "block", margin: "0 auto" }} />
        }
        
        {gallery.length > 0 && gallery.length < totalImages && <Button onClick={this.loadMore} />}
        
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageSrc} alt={alt} />
          </Modal>
        )}
       
      </div>
    );
  };
};
