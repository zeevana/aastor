import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { paymentMethods } from "../data/index";

const FooterComponent = () => {
  return (
    <div className="footer py-5">
      <Container>
        <Row>
          <Col>
            <h3 className="fw-bold">AaStore</h3>
            <p className="desc">Jl. Drs Esau Sesa Makobrimob, Sowi, Distrik Manokwari, Kabupaten Manokwari, Papua Barat, 98315</p>
            <div className="no mb-1 mt-4">
              <Link to="https://wa.me/6285269512024" className="text-decoration-none">
                <i className="fab fa-whatsapp"></i>
                <p className="m-0">0852-6951-2024</p>
              </Link>
            </div>
            <div className="mail">
              <Link to="mailto:airdp1112@gmail.com" className="text-decoration-none">
                <i className="fa-regular fa-envelope"></i>
                <p className="m-0">airdp1112@gmail.com</p>
              </Link>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col">
            <h5 className="fw-bold">Menu</h5>
            <Link to="/">Home</Link>
            <Link to="/kelas">List Game</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/terms-and-conditions">Syarat & Ketentuan</Link>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col">
            <h5 className="fw-bold">Payments</h5>
            <div className="payment-methods">
              {paymentMethods.map((method, index) => (
                <img key={index} src={method.imgSrc} alt={method.altText} />
              ))}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="text-center px-md-0 px-3">&copy; Copyright {new Date().getFullYear()} by <span className="fw-bold">Xxvana</span> , All Right Reserved</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FooterComponent;
