import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} EatUp Burger. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
