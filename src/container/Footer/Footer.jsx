import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import { AppWrap } from '../../wrapper';
import { client } from '../../client'
import './Footer.scss';


function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setSubmitted(true);
      })
  }



  return (
      <motion.div
        whileInView={{ opacity: [0, 1], y: [150, 100, 0] }}
        transition={{ duration: 0.5 }}
        className="app__flex app__footer"
      >
        <h2 className='head-text'>Take a coffe & <span>Chat with me</span></h2>

        <div className='app__footer-cards'>
          <div className='app__footer-card'>
            <img src={images.email} alt="email" />
            <a href="https://www.facebook.com/mohamed.abdalslam.75" className='p-text'>
              Mohamed@facebook.com
            </a>
          </div>
          <div className="app__footer-card">
            <img src={images.mobile} alt="mobile" />
            <span className='p-text'>
              01223136906
            </span>
          </div>
        </div>

        {!submitted ? (
          <div className="app__footer-form app__flex">
            <div className="app__flex">
              <input className='p-text' type="text" placeholder='Type Your Name' name="name" value={name} onChange={handleChangeInput} />
            </div>
            <div className="app__flex">
              <input className='p-text' type="email" placeholder='Type Your Email' name="email" value={email} onChange={handleChangeInput} />
            </div>
            <div>
              <textarea
                className='p-text'
                placeholder='Type Your Message'
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <button type='button' className='p-text' onClick={handleSubmit}>{loading ? "Sending...." : 'Send Message'}</button>
          </div>
        )
          : (<div>
            <h3 className='head-text'>Thank you for getting in touch!</h3>
          </div>
          )}
      </motion.div>
  );
}

export default AppWrap(Footer, 'contact', 'app__whitebg');