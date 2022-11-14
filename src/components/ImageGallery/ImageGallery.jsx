import PropTypes from "prop-types";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import styles from "../ImageGallery/ImageGallery.module.css";

export const ImageGallery = ({ gallery, onClick }) => {
    
    return (
        <div>
            <ul className={styles.galleryList} onClick={onClick}>
                {gallery.map(hits => {
                    return (
                        <ImageGalleryItem key={hits.id} gallery={hits} />
                    )
                })}
            </ul>
        </div>
    );
};

ImageGallery.propTypes = {
    gallery: PropTypes.array,
    onClick: PropTypes.func,
};