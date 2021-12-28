import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-sql';

interface prismCodeProps {
    pageClass: string;
    language: string;
    codeSnippet: string;
}

export default function PrismCode(props: prismCodeProps) {
    const { pageClass, language, codeSnippet } = props;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            Prism.highlightAll();
        }
    }, []);

    return <pre className={pageClass}>
        <code className={`language-${language}`}>
            {codeSnippet}
        </code>
    </pre>;
}