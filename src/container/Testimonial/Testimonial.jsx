import React from 'react';
import { useState, useEffect } from 'react';
import './Testimonial.scss';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AppWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
function Testimonial() {
  const [brands, setBrands] = useState([]);
  const [testimony, setTestimony] = useState({ scale: [0,0.5,1] })
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
    setTestimony({ scale: 0})
    setTimeout(() => {
      setTestimony([{ scale: 1}])
    }, 200);
  }

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query)
      .then((data) => {
        setTestimonials(data);
      })
    client.fetch(brandsQuery)
      .then((data) => {
        setBrands(data);
      })
  }, [])

  const test = testimonials[currentIndex];

  return (
    <motion.div
      whileInView={{ y: [100, 50, 0], opacity: [0, 1], scale: [0, 1] }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className='father'
    >
      {testimonials.length && (
        <>
          <motion.div
            animate={testimony}
            transition={{ duration: 0.5 }}
            className='app__testimonial-item app__flex'
          >
            <img src={urlFor(test.imgurl)} alt="testimonial" />
            <div className='app__testimonial-content'>
              <p className='p-text'>{test.feedback}</p>
              <div>
                <h4 className='bold-text'>{test.name}</h4>
                <h5 className='p-text'>{test.company}</h5>
              </div>
            </div>
          </motion.div>

          <div className='app__testimonial-btns app__flex'>
            <div className='left app__flex' onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>

            <div className='right app__flex' onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
      <div className='app__testimonial-brands app__flex'>
        {brands.map((brand, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1], scale: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={index}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default AppWrap(Testimonial, 'testimonials', "app__primarybg");