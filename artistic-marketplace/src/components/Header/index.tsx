import styles from './styles.module.css';

const Header = () => {
    return (
        <div className="p-2">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="/images/logo.svg" alt="Bejamas Logo" />
                    </a>
                    <a className="nav-link" href="#">
                        <img src="/images/cart.svg" alt="Cart Icon" />
                    </a>
                </div>
            </nav>
            <hr className={`${styles['navbar-separator']}`} />
        </div>
    );
};
export default Header;
