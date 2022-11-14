import PropTypes from "prop-types";
import styles from "../Searchbar/Searchbar.module.css";

export const Searchbar = ({ onSubmit }) => {
    const handleSubmit = event => {
        event.preventDefault();
        const query = event.target.elements.query.value.trim();

        if (query === '') {
            return alert("What are you looking for? Type something :)")
        };

        onSubmit(query);
        event.target.reset();
    };
   
    return (
        <header className={styles.searchbar}>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={styles.searchFormButton}>
                    <span className={styles.searchFormButtonLabel} />
                </button>

                <input
                    name="query"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    className={styles.searchFormInput}
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};
