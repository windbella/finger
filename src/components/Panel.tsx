/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import Circle from './Circle';

interface TouchData {
    x: number,
    y: number,
    id: number,
}

interface ColorMap {
    [id: number]: string,
}

interface SelectData {
    touchDatas: TouchData[],
    colorMap: ColorMap,
    lastChangeTime: number,
    selectedId: number|undefined,
}

function Panel() {
    const [selectData, setSelectData] = useState<SelectData>({
        touchDatas: [],
        colorMap: {},
        lastChangeTime: Date.now(),
        selectedId: undefined,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            if (selectData.touchDatas.length > 1
                && selectData.selectedId === undefined
                && (Date.now() - selectData.lastChangeTime) > 2000) {
                setSelectData({
                    ...selectData,
                    selectedId: selectData.touchDatas[Math.floor(Math.random() * selectData.touchDatas.length)].id,
                });
            }
        }, 100);
        return () => {
            clearInterval(timer);
        };
    });

    const handleTouch = (e: React.TouchEvent<HTMLElement>) => {
        const { x: originX, y: originY } = e.currentTarget.getBoundingClientRect();
        const touchDatas = Array.from<React.Touch>(e.touches)
            .map((touch: React.Touch): TouchData => ({
                x: touch.clientX - originX,
                y: touch.clientY - originY,
                id: touch.identifier,
            }));
        const newSelectData = {
            ...selectData,
            touchDatas,
        };
        if (selectData.touchDatas.length !== touchDatas.length) {
            newSelectData.lastChangeTime = Date.now();
            if (touchDatas.length <= 1) {
                newSelectData.selectedId = undefined;
                newSelectData.colorMap = {};
            }
        }
        setSelectData(newSelectData);
    };

    const getColor = (id: number): string => {
        if (!selectData.colorMap[id]) {
            selectData.colorMap[id] = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        }
        return selectData.colorMap[id];
    };

    return (
        <article
            className="panel"
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onTouchEnd={handleTouch}
            onTouchCancel={handleTouch}
        >
            {
                selectData.touchDatas
                    .filter((touchData) => selectData.selectedId === undefined || touchData.id === selectData.selectedId)
                    .map((touchData) => (
                        <Circle
                            key={touchData.id}
                            x={touchData.x}
                            y={touchData.y}
                            color={getColor(touchData.id)}
                            selected={touchData.id === selectData.selectedId}
                        />
                    ))
            }
        </article>
    );
}

export default Panel;
