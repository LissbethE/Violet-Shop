import { useTimeout } from '../hooks/useTimeout';
import Card from './Card';

////////////////////////
const data = [
  {
    trending: 'Sale Offer!',
    title: 'New Fashion Summer Sale',
    offer: '$19.99',
    img: 'hero--1.jpg',
  },

  {
    trending: 'New Arrival!',
    title: 'Violet Collection',
    offer: '',
    img: 'hero--2.jpg',
  },

  {
    trending: 'Trending Item',
    title: 'Women`s Latest Fashion Sale',
    offer: '$15.99',
    img: 'hero--3.jpg',
  },
];

////////////////////////
function Hero() {
  const { index, setIndex } = useTimeout(data);

  ////////////////////////
  return (
    <div className="hero">
      {/* Image Slide */}
      <div
        className="hero__card-box"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {data.map((data, idx) => (
          <Card data={data} key={idx} />
        ))}
      </div>

      {/* slides dots */}
      <div className="hero__dots-box ">
        {data.map((_, idx) => (
          <div
            key={idx}
            className={`hero__dot ${index === idx ? 'active' : ''}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
