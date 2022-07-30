import React from 'react';
import Typography from '@mui/material/Typography';

import styles from './posts.module.scss';

function FrontendMigrationNote() {
    return <>
        <div className={styles.root}>
            <Typography variant='h3' className={styles.title} >
                Upcoming Website Updates
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                I&apos;m closing in on one year since I&apos;ve written a new piece for this site, but I wanted to leave one now to avoid the impression I&apos;m no longer maintaining this project. Part of the reason has been a recent move and starting my current role at <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.nasa.gov/ames/">NASA Ames</a> back in May. More recently I’ve been busy working on refactoring parts of the site, primarily on the frontend. When I first created the site I didn’t spend much of my effort on the client-side code. At the time I was enrolled in Springboard’s <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.springboard.com/courses/ai-machine-learning-career-track/">machine learning engineering program</a>, and since I was spending a lot of my time working through that curriculum I wanted to focus on this site’s content and to a lesser extent getting the backend up and running (the backend is built on <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.djangoproject.com/">Django</a>, which I hadn’t previously worked with).
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                In any case it&apos;s now time for an upgrade. There&apos;s nothing obviously wrong with the site as it is, but there are some additional optimizations I could make and newer React patterns and best practices I’m keen on incorporating. First and foremost, I’m migrating the frontend framework I’m using from <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://create-react-app.dev/">Create React App</a> to <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://nextjs.org/">Next.js</a>. Next is also a React-based framework, but it incorporates several new features I haven’t previously used such as server-side rendering and asset optimizations that should improve loading and rendering performance. Additionally, I’ll be switching from standard JavaScript to <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/">TypeScript</a> for better type safety, updating <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://mui.com/">Material-UI</a> to utilize server-side rendering, and incorporating modern React patterns like hooks and functional components. I have been attempting to perform this migration more directly, but after several cumulative hours of troubleshooting, reading documentation and Stackoverflow, and banging my head against the wall I’ve decided instead to wholly rebuild the frontend as a new Next app. Dealing with various build and undefined errors got frustrating and since this is a side-project I feel it should be a mostly enjoyable experience! Once the transition is complete the content should all be the same, but the final UI might look slightly different. And once that’s completed (hopefully by New Year’s!) I have a lot of interesting posts planned such as finally writing a walkthrough of the <a className={styles.link} color="secondary" href="/project/urdu-number-classifier">Urdu number classifier</a> and a post about the history of cryptography.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Stay tuned!
            </Typography>
        </div>
    </>;
}

export default FrontendMigrationNote;
