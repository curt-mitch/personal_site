import React from 'react';
import Typography from '@mui/material/Typography';

import styles from './posts.module.scss';

function ConcludingSpringboard() {
    return <>
        <div className={styles.root}>
            <Typography variant='h3' className={styles.title} >
                Concluding my Springboard Journey, and Starting my Next Adventure
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                During this week of Thanksgiving I’m incredibly thankful to the staff and my fellow students at Springboard, as I finally completed the requirements for the machine learning engineering program. When I was included in a COVID-19-related layoff in May I was very fortunate in that just the week before I had been accepted to the ML engineering program, so I knew right away where to do with my newly open schedule. I’m also incredibly thankful to my wife for her support and grateful for the ability to spend several months focusing on completing the Springboard program and working on significant related side projects such as this website.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Through the ML engineering program I covered a huge range of topics from reviewing how linear regression works to methods for deploying full-scale ML applications in a production environment. I also completed my end-to-end capstone project that I deployed on <a className={styles.link} color="secondary" href="/posts/jp-en-translator">this site</a>, and met several other Springboard students and mentors across multiple disciplines.  I’m especially grateful to my mentor <a className={styles.link} color="secondary" target="_blank" rel="noopener noreferrer" href="https://dhirajkumarblog.medium.com/">Dhiraj Kumar</a>, who assisted me through our weekly 1:1 calls by answering all of my questions about the ML engineering curriculum and providing guidance at several stages of my capstone project.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Now that I’ve completed the program my search for a full-time ML engineering role begins in earnest. If you’re looking to hire or know a team that is, I’d be extremely grateful if you could let me know! My email is curtis.l.mitchell AT gmail.com.
            </Typography>
        </div>
    </>;
}

export default ConcludingSpringboard;
