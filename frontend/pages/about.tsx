import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

import styles from './about.module.scss';


function About() {
  return (
    <React.Fragment>
      <div className={styles.root}>
        <div className={styles.pictureIntroDoubleColumn}>
          <div className={styles.imageContainer}>
            <Image
              layout="responsive"
              src="/images/profile.jpg"
              alt="Picture of the author"
              height={336}
              width={317}
              priority
            />
          </div>
          <Typography variant='body1' className={styles.IntroParagraph} >
            I’m a machine learning and full-stack engineer based in the San Francisco Bay Area. I currently work for NASA at the <a className={styles.link} target="_blank" href="https://www.nasa.gov/ames" rel="noopener noreferrer">Ames Research Center</a> in Mountain View where I am contributing to a variety of aerospace projects as part of the <a className={styles.link} target="_blank" href="https://www.nasa.gov/simlabs" rel="noopener noreferrer">Simulation Laboratories</a> (SimLabs) organization. In my free time I am also a volunteer open-source developer for <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.openmined.org/">OpenMined</a>, which is building tools to enable privacy-preserving machine learning and data science.
          </Typography>
        </div>
        <Typography variant='h5' className={styles.BackgroundTitle} >
          Background
        </Typography>
        <div className={styles.columnsContainer}>
          <div className={styles.mainTextColumnLeft}>
            <Typography variant='body1' className={styles.paragraph} >
              Prior to joining NASA I worked at several analytics and machine learning startups. Most recently I was at <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://mode.com/">Mode Analytics</a> where I was the lead engineer on a full-stack project to create sharable versions of analytics reports. I also took on several opportunities to present and teach technical topics, including conducting a JavaScript workshop to help Mode’s support engineers provide better assistance to customers. Prior to that I worked at <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.ayasdi.com/">Ayasdi</a>, where as a frontend developer I helped implement new features to empower data scientists combining techniques from machine learning and topological data analysis.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
              I’ve made a few pivots in my career via coding bootcamps and online learning. I picked up my machine learning and data science skills thanks to Springboard’s <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.springboard.com/courses/ai-machine-learning-career-track/">machine learning engineering program</a>. Several years before that I was in one of the first cohorts of the coding bootcamp <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.hackreactor.com/">Hack Reactor</a>, which enabled my transition into web development. Prior to Hack Reactor I worked as a data analyst and field engineer for the energy consulting firm <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.dnvgl.com/">DNV GL</a> for several years. I originally moved to Northern California after completing undergraduate degrees in physics and math from the <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.unt.edu/">University of North Texas</a>. As a born-and-raised Texan in the Bay Area I like to refer to myself as a NorCal Texpat.🤠
            </Typography>
          </div>
          <div className={styles.mainTextColumnRight}>
            <Typography variant='body1' className={styles.paragraph} >
              Outside of regular working hours I enjoy writing posts for this website, playing with different <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.raspberrypi.org/">Raspberry Pi</a> projects, as well as learning all I can about cryptography and how to preserve privacy when it comes to the web and machine learning processes. My interest in these topics is what led me to join the OpenMined community and contribute to its various open source projects.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
              In the non-digital realm my hobbies include reading all categories of books, especially fiction and history (recent favorites include <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/book/show/49985946-homegoing">Homegoing</a>, <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/series/56399-the-expanse">The Expanse Series</a>, and <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/book/show/76401.Bury_My_Heart_at_Wounded_Knee">Bury My Heart at Wounded Knee</a>), cooking, meditation, martial arts and personal fitness, and studying languages (previously: German and Spanish, recently: Urdu, continually: Japanese). I also enjoy traveling and my favorite travel experience so far was getting to live in a dojo in rural Japan for a summer while training in Aikido.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
              For more information on my work or to just say hello, feel free to get in touch at curtis.l.mitchell AT gmail.com.
            </Typography>
          </div>
        </div>
        <Typography variant='h5' className={styles.title} >
          Documents
        </Typography>
        <Typography variant='body1' className={styles.documentLink} >
          <a className={styles.linkText} color="secondary" target="_blank" rel="noopener noreferrer" href="/documents/cmitchell-website-resume.pdf">Resume</a>
        </Typography>
        <Typography variant='body1' className={styles.documentLink} >
          <a className={styles.linkText} color="secondary" target="_blank" rel="noopener noreferrer" href="/documents/springboard-certificate.pdf">Springboard Certificate</a>
        </Typography>
        <Typography variant='h5' className={styles.title} >
          External Links
        </Typography>
        <a color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.github.com/curt-mitch">
          <Typography variant='body1' className={styles.externalLink} >
            <FontAwesomeIcon icon={faGithub} />
            <span className={styles.linkText}>Github</span>
          </Typography>
        </a>
        <a color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/curtislmitchell/">
          <Typography variant='body1' className={styles.externalLink} >
            <FontAwesomeIcon icon={faLinkedin} />
            <span className={styles.linkText}>LinkedIn</span>
          </Typography>
        </a>
        <a color="secondary" target="_blank" rel="noopener noreferrer" href="https://twitter.com/Curt_Mitch">
          <Typography variant='body1' className={styles.externalLink} >
            <FontAwesomeIcon icon={faTwitter} />
            <span className={styles.linkText}>Twitter</span>
          </Typography>
        </a>
        <Typography variant='h5' className={styles.talkTitle} >
          Public Talks
        </Typography>
        <Typography variant='body1' className={styles.publicTalkLink} >
          <a className={styles.linkText} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=Fb1za8ZWhYw">A Pseudorandom Walkthrough of d3-random</a>
        </Typography>
        <Typography variant='body1' className={styles.talkDescription} >
          A deep-dive of the <a color="secondary" target="_blank" rel="noopener noreferrer" href="https://github.com/d3/d3-random">d3-random module</a> from the <a color="secondary" target="_blank" rel="noopener noreferrer" href="https://d3js.org/">d3.js</a> ecosystem. Hosted by the <a color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.meetup.com/Bay-Area-d3-User-Group/">Bay Area d3 User Group</a> and <a color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.opendoor.com/">Opendoor</a> on August 14th, 2018.
        </Typography>
      </div>
    </React.Fragment>
  );
}

export default About;
