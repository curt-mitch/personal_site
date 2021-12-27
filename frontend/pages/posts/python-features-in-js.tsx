import React from 'react';
import Typography from '@mui/material/Typography';

import styles from './python-features-in-js.module.scss';
import PrismCode from '../../components/PrismCode';

const pyCode1 = `
example_list = [1, 2, 3, 4]
example_list[:1] # -> [1]
example_list[1:] # -> [2, 3, 4]
example_list[1:3] # -> [2, 3]
`.trim();
const pyCode2 = `
example_list[0:4:2] # -> [1, 3]
`.trim();
const pyCode3 = `
[expression for value in iterable]
`.trim();
const pyCode4 = `
doubled_list = [i * 2 for i in [1,2,3]]
doubled_list # [2, 4, 6]
`.trim();
const pyCode5 = `
original_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transposed_matrix = [[row[i] for row in original_matrix] for i in range(3)]
transposed_matrix # [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
`.trim();
const pyCode6 = `
def rectangle_area(width=0, height=0):
    return width * height
`.trim();
const pyCode7 = `
rectangle_area(5, 7)
rectangle_area(width=5, height=7)
rectangle_area(height=7, width=5)
`.trim();
const jsCode = `
function rectangleArea(rectangleObj) {
    return rectangleObj.width * rectangleObj.height;
}
rectangleArea({ width: w, height: h });
rectangleArea({ height: h, width: w });
`.trim();

function PythonFeaturesInJS() {
    return <>
        <div className={styles.root}>
        <Typography variant='h3' className={styles.title} >
            Three Python Features I Would Love To Have In JavaScript
        </Typography>
        <Typography variant='body1' className={styles.paragraph} >
            As someone who primarily learned to code using JavaScript, reading languages like C and Java wasn’t too much of a struggle once I learned to read the typing-related code (something that became all the more easy after adopting TypeScript). But once I started digging deeper into machine learning and data science it became clear I would not be able to avoid learning Python. I was reluctant to learn it primarily because its syntax is so different from that of JavaScript (whitespace?!), and I was unmoved by people and <a className={styles.link} target="_blank" href="https://xkcd.com/353/" rel="noopener noreferrer">comics</a> singing the language’s praises (well, maybe I was slightly moved by the comics).
        </Typography>
        <Typography variant='body1' className={styles.paragraph} >
            But I eventually acquiesced and once I got comfortable reading and writing Python I discovered some things I actually enjoyed about the language. In fact these were things I wish I could adopt into my JavaScript code. Below is a short list of these features:
        </Typography>
        <Typography variant='h5' className={styles.title} >
            1. Slicing Notation
        </Typography>
        <Typography variant='body1' className={styles.paragraph} >
            This was probably the first part of Python’s syntax that made me react with “Okay, that’s a pretty nice feature.” Python’s slicing syntax gives you the ability to easily get multiple subsections of any list (i.e., “array” in JavaScript). It looks like the following:
        </Typography>
        <PrismCode
            pageClass={styles.codeHighlight}
            language='python'
            codeSnippet={pyCode1}
        />
        <Typography variant='body1' className={styles.paragraph} >
            As you can see, the slice notation syntax can be thought of as consisting of optional "start" and "stop" values like so <span className={styles.codeSample}>[start:stop]</span> (Technically both the "start" and "stop" values can be optional because using <span className={styles.codeSample}>[:]</span> will return a complete copy of the original list), but you can also use a "step" property to skip values within the sliced subsets like so:
        </Typography>
        <PrismCode
            pageClass={styles.codeHighlight}
            language='python'
            codeSnippet={pyCode2}
        />
        <Typography variant='h5' className={styles.title} >
            2. List Comprehensions
        </Typography>
        <Typography variant='body1' className={styles.paragraph} >
            List comprehensions are a prime example of one of the original goals of Python: to make code read more like a human language (at least if you’re an English speaker!). Comprehensions give you a simple way to create new lists using this basic syntax:
        </Typography>
        <PrismCode
            pageClass={styles.codeHighlight}
            language='python'
            codeSnippet={pyCode3}
        />
        <Typography variant='body1' className={styles.paragraph} >
            Here is a simple example:
        </Typography>
        <PrismCode
            pageClass={styles.codeHighlight}
            language='python'
            codeSnippet={pyCode4}
        />
        <Typography variant='body1' className={styles.paragraph} >
            You can even create nested comprehensions, which are especially useful when dealing with nested data structures such as matrices:
        </Typography>
        <PrismCode
            pageClass={styles.codeHighlight}
            language='python'
            codeSnippet={pyCode5}
        />
        <Typography variant='body1' className={styles.paragraph} >
            Unfortunately, although list comprehensions were actually on the roadmap for ECMAScript 2015 and even implemented in some versions of Firefox, the feature was later removed: <a className={styles.link} target="_blank" href="http://www-lia.deis.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions.html" rel="noopener noreferrer">Array comprehensions | MDN</a> (12/2021 update: comprehensions are being reconsidered for ECMAScript 7!).
        </Typography>
        <Typography variant='h5' className={styles.title} >
            3. Named Parameters
        </Typography>
        <Typography variant='body1' className={styles.paragraph} >
            Python gives you the ability to both pass arguments to a method in a set order, just like you would in JavaScript, or create named parameters that are defined with a default value and that can then be passed in any order. Let’s look at an example:
        </Typography>
        <PrismCode
            pageClass={styles.codeHighlight}
            language='python'
            codeSnippet={pyCode6}
        />
        <Typography variant='body1' className={styles.paragraph} >
            I could call this method in any of the following ways:
        </Typography>
        <PrismCode
            pageClass={styles.codeHighlight}
            language='python'
            codeSnippet={pyCode7}
        />
        <Typography variant='body1' className={styles.paragraph} >
            You can sort of adopt this pattern in JavaScript methods using objects:
        </Typography>
        <PrismCode
            pageClass={styles.codeHighlight}
            language='javascript'
            codeSnippet={jsCode}
        />
        <Typography variant='body1' className={styles.paragraph} >
            But I personally find the Python pattern easier to read at a glance, especially for methods with more than three or four arguments which are common in several data science and machine learning libraries.
        </Typography>
        <Typography variant='body1' className={styles.paragraph} >
            If you’re a developer who has worked with JavaScript but never with Python, hopefully this gives you a small taste of some of the things Python does well. Some features such as the mandatory whitespace and lack of keywords for variable declarations still look a little strange when I step back into Python after working in JavaScript for a while, but I am enjoying working with these features and many other methods in the standard library on a daily basis.
        </Typography>
    </div>
    </>;
}

export default PythonFeaturesInJS;