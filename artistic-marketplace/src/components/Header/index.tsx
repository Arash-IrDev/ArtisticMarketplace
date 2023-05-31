const Header = () => {
    return (
        <div className="my-4">
            <nav className="navbar navbar-expand-lg navbar-light mb-3">
                <div className="container-fluid p-0">
                    <a className="navbar-brand" href="/">
                        <img src="/images/logo.svg" alt="Bejamas Logo" />
                    </a>
                    <a className="nav-link" href="#">
                        <img src="/images/cart.svg" alt="Cart Icon" />
                    </a>
                </div>
            </nav>
            <hr />
        </div>
    );
};
export default Header;
