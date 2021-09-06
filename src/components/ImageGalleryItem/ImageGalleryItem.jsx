import PropTypes, { string } from 'prop-types';
import s from '../ImageGalleryItem/ImageGalleryItem.module.css';

function ImageGalleryItem({ imageItem }) {
    
    const { webformatURL, largeImageURL, tags } = imageItem;
    return (
        <li className={s.ImageGalleryItem} >
            <img src={webformatURL} alt={tags} data-large-img-src={largeImageURL} data-large-img-alt={tags} className={s.ImageGalleryItemImage} />
        </li>
    )
}

ImageGalleryItem.propType = {
    imageItem: PropTypes.arrayOf(string).isRequired,
}

export { ImageGalleryItem };
