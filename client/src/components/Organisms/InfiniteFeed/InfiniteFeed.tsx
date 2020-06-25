import React, { useState, useEffect } from 'react';

function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    console.log('Fetch more list items!');
}

const InfiniteFeed = (callback: (...args: any) => any) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        callback(() => {
            console.log('called back');
        });
    }, [isFetching]);

    return [isFetching, setIsFetching];
};

export default InfiniteFeed;
