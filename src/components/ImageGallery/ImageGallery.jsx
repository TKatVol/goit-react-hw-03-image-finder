import { Component } from 'react';
import Loader from "react-loader-spinner";

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { imagesApi } from '../../services/images-api';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

import s from '../ImageGallery/ImageGallery.module.css';

export class ImageGallery extends Component {
    state = {
        page: 1,
        gallery: [],
        totalImages: 0,
        loading: false,
        showModal: false,
        largeImageSrc: '',
        largeImageAlt:'',
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.searchImages !== this.props.searchImages) {
             const { searchImages } = this.props;

            this.setState({
                page: 1,
                gallery: [],
                totalImages: 0,
            })
            
            this.fetchImages(searchImages);
        }
    }

    handleLoadMoreButtonClick = () => {
        const { page } = this.state;
        const { searchImages } = this.props;
       
        this.fetchImages(searchImages, page);
    }

    fetchImages = (searchImages, page) => {
        
        this.setState({ loading: true });
        
        imagesApi.fetchImages(searchImages, page)
            .then(data => {   
                
                if (data.total === 0) {
                    alert('Oops.. Not found 😟');
                    return;
                }

                this.setState(prevState => (
                    {
                        page: prevState.page + 1,
                        gallery: [...prevState.gallery, ...data.hits],
                    }));
                this.setState({ totalImages: data.total - ((this.state.page - 1) * 12) + 12 });
            
                this.scrollToBottom();
                })
           .finally(() => this.setState({ loading: false }))        
    }
    
    scrollToBottom = () => {
        window.scrollTo({
           top: document.documentElement.scrollHeight,
           behavior: 'smooth',
        });
    }

    handleImageClick = event => {
        if (event.target.nodeName !== 'IMG') {
            return;
        }

        this.setState({
            showModal: true,
            largeImageSrc: event.target.getAttribute('data-large-img-src'),
            largeImageAlt: event.target.getAttribute('data-large-img-alt'),
            });
    }

    closeModal = () =>{
        this.setState({
                showModal: false,
                largeImageSrc: '',
                largeImageAlt:'',
            });
    }

    render() {

        const {gallery, totalImages, loading, showModal, largeImageSrc, largeImageAlt } = this.state;
     
        return (
            <div className={s.container}>
                
                
                <ul className={s.ImageGallery}  onClick={this.handleImageClick}>
                    {gallery && gallery.map(hits => {
                        return <ImageGalleryItem key={hits.id} imageItem={hits}/>
                        })
                    }
                </ul>

                {loading && <Loader type="Hearts" color="#3f51b5" height={80} width={80} className={s.loader} />}

                {totalImages > 12 && <Button title="Load more" onClick={this.handleLoadMoreButtonClick} />}
                
                {showModal &&
                    <Modal onClose={this.closeModal}>
                        <img src={largeImageSrc} alt={largeImageAlt} />
                    </Modal>
                }
        
            </div>
        )
    }
}
