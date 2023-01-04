import React from 'react';
import './Skills.scss';
import { motion } from 'framer-motion';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { AppWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import { useState, useEffect } from 'react';

function Skills() {
  const query = '*[_type == "workExperience"]';
  const skillsQuery = '*[_type == "skills"]';
  const [experiences, setexperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    client.fetch(query)
      .then((data) => {
        setexperiences(data);

      })
    client.fetch(skillsQuery)
      .then((data) => {
        setSkills(data);
      });
  }, [])

  return (
    <div className='Father'>
      <h2 className='head-text'>Skills & <span>experience</span></h2>
      <div className="app__skills-container">
        <motion.div className='app__skills-list'>
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0,0, 1], x: [-100, 0] }}
              transition={{ duration: 0.2 }}
              className="app__skills-item app__flex"
              key={index}
            >
              <div key={skill.bgColor} className='app__flex'>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p key={skill.name} className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className='app__skills-exp'>
          {experiences.map((work, index) => (
            <div key={index} className='app__skills-exp-works'>
              <motion.div
                whileInView={{opacity: [0, 1], x: [50, 0] }}
                transition={{ duration: 0.5 }}
                className="app__skills-exp-work"
                data-tip
                data-for={work.name}
              >
                <h4 className='bold-text'>{work.name}</h4>
                <p className='p-text'>{work.company}</p>
              </motion.div>
              <motion.div
                whileInView={{opacity: [0, 1], x: [50, 0] }}
                transition={{ duration: 0.5 }}
              >
                <ReactTooltip
                  id={work.name}
                  effect="solid"
                  arrowColor="fff"
                  className="skills-tooltip"
                >
                  {work.desc}
                </ReactTooltip>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AppWrap(Skills, 'skills', 'app__whitebg');