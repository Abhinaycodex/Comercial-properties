import './Home.css';
import  {Carousel } from "react-bootstrap";

const HomeSection = () => {
  return (
    <>
      <article>
      <Carousel>
      <Carousel.Item>
      <img src='https://www.resmanagement.in/img/blog/commercial-properties-in-ahemedabad-res-management.webp' alt="img1" height={500} width={1000}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://www.resmanagement.in/img/blog/commercial-properties-in-ahemedabad-res-management.webp' alt="img2" height={500} width={1000}/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://www.resmanagement.in/img/blog/commercial-properties-in-ahemedabad-res-management.webp' alt="img3" height={500} width={1000}/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://www.resmanagement.in/img/blog/commercial-properties-in-ahemedabad-res-management.webp' alt="img4" height={500} width={1000}/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </article>
    </>
  );
};

export default HomeSection;
