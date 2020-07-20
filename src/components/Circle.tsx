import React from 'react';

interface CircleProps {
    x: number,
    y: number,
    color: string,
    selected: boolean,
}

function Circle({
    x, y, color, selected,
}: CircleProps) {
    return (
        <div
            className={selected ? 'circle selected' : 'circle'}
            style={{ top: y - 80, left: x - 75 }}
        >
            <svg style={{ width: '100%', height: '100%' }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="32" strokeWidth="8" stroke={color} strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round" transform="rotate(112.395 50 50)" />
                <circle cx="50" cy="50" r="24" fill={color} />
            </svg>
        </div>
    );
}

export default Circle;
