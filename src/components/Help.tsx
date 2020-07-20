import React, { useEffect, useState } from 'react';

function Help() {
    const maxTouchPoints : number = window?.navigator?.maxTouchPoints;
    const [isHide, setIsHide] = useState<boolean>(false);

    useEffect(() => {
        setInterval(() => {
            setIsHide(true);
        }, 1000 * 5);
    }, []);

    if (!maxTouchPoints || maxTouchPoints <= 1) {
        return (
            <article className="help">
                <span className="text">모바일 기기를 사용해 주세요</span>
            </article>
        );
    }

    return (
        <article className={`help${isHide ? ' hide' : ''}`}>
            <span className="text">여러 명이 함께</span>
            <br />
            <span className="text">화면을 터치하고 기다리세요</span>
            <br />
            <span className="text description">{`(최대 유저 : ${maxTouchPoints})`}</span>
        </article>
    );
}

export default Help;
