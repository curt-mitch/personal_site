import React from 'react';
import Typography from '@mui/material/Typography';

import styles from './posts.module.scss';
import Topbar from '../../components/Topbar';

function WebsiteWalkthrough() {
    return <>
        <Topbar />
        <div className={styles.root}>
          <Typography variant='h3' className={styles.title} >
            Curt-Mitch.com
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            I initially started work on this project to test out website and web development ideas, to have a place to tinker with various frameworks and UI libraries, and to have a place to write articles with more control over the appearance and layout. It&apos;s also a showcase of articles and projects to share with recruiters, hiring managers, and colleagues. <span role="img" aria-label="grinning face">😄</span>
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The frontend portion of the site was bootstrapped using the <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://create-react-app.dev/">Create React App</a> tool and uses <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React</a>, <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://reactrouter.com/">React Router</a>, and several components from <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://material-ui.com/">Material-UI</a>. This does mean that a user must have JavaScript enabled for their browser, and much of the site could certainly be a more lightweight, progressive web application. But building something using React was a primary goal for me and I have nonetheless added <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/docs/code-splitting.html#route-based-code-splitting">router-based code splitting</a> to reduce the loading time by about 30% to 50% across the site.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The backend of the website is a <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.djangoproject.com/">Django</a> application with a <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.sqlite.org/index.html">SQLite</a> database. I built this backend in order to learn the Django framework itself and to have an environment for deploying my Python-based machine learning projects. Additionally, I’m using the <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.django-rest-framework.org/">Django REST framework</a> for API endpoints rather than utilizing the default Django template layer (the “view” layer in standard MVC architectures).
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The entire project is hosted on <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.digitalocean.com/">DigitalOcean</a> and served via <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.docker.com/">Docker</a> containers. The site&apos;s web server is <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.nginx.com/">NGINX</a> with HTTPS enabled thanks to TLS certificates issued by <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://letsencrypt.org/">Let&apos;s Encrypt</a>. I&apos;ve made additional NGINX customizations to enable more efficient features such as gzip text compression and HTTP/2, as well as ensure that I have an A+ SSL rating from <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.ssllabs.com/ssltest/analyze.html?d=curt-mitch.com">Qualys</a>. The site currently has a performance score of roughly 96 for desktop and 78 for mobile using Google&apos;s <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://developers.google.com/speed/pagespeed/insights/">PageSpeed Insights</a>, and I’m hoping to increase those scores in future rounds of refactoring by using techniques and features such as images with more efficient compression.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The fractal design on the homepage was generated using this tool: <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="http://rectangleworld.com/blog/archives/462">Generative Art in HTML5 Canvas – Sweeping Fractal Lines</a>. I also owe my friend and experienced creative director <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="http://www.mbarnesdesigns.com/">Mathew Barnes</a> my gratitude for his wireframes and design suggestions to give this site a wonderful esthetic boost.
          </Typography>
        </div>
    </>;
}

export default WebsiteWalkthrough;
