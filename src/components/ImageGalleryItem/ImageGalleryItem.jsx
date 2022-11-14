import PropTypes from "prop-types";
import styles from "../ImageGalleryItem/ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ gallery }) => {
    const { webformatURL, largeImageURL, tags } = gallery;
    return (
        <li className={styles.imageGalleryItem}>
            <img src={webformatURL} data-large-img-src={largeImageURL} alt={tags} className={styles.imageGalleryItemImage} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    gallery: PropTypes.object,
};