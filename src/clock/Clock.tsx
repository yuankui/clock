import React, {FunctionComponent, useEffect, useState} from 'react';
import {range} from "rxjs";
import {map, toArray} from "rxjs/operators";

interface Props {
    hour: number,
    minute: number,
}

const Clock: FunctionComponent<Props> = (props) => {
    const [width, setWidth] = useState(400);
    const r = width / 2;

    const [minutes, setMinutes] = useState<any>(null);
    const [seconds, setSeconds] = useState<any>(null);
    const [miniSeconds, setMiniSeconds] = useState<any>(null);
    const [numbers, setNumbers] = useState<any>(null);
    useEffect(() => {
        // 分针
        range(0, 12)
            .pipe(
                map(i => {
                    const len = 10;
                    const polar = 2 * Math.PI * i / 12;

                    const startR = r;
                    const endR = r - len;
                    const y = Math.sin(polar);
                    const x = Math.cos(polar);
                    return <path key={i}
                                 strokeWidth={1}
                                 stroke='black'
                                 d={`M ${x * startR} ${y * startR} L ${x * endR} ${y * endR}`}/>;
                }),
                toArray(),
            )
            .subscribe(list => {
                setMinutes(list);
            })

        // 秒针
        range(0, 60)
            .pipe(
                map(i => {
                    const len = 6;
                    const polar = 2 * Math.PI * i / 60;

                    const startR = r;
                    const endR = r - len;
                    const y = Math.sin(polar);
                    const x = Math.cos(polar);
                    return <path key={i}
                                 strokeWidth={1}
                                 stroke='gray'
                                 d={`M ${x * startR} ${y * startR} L ${x * endR} ${y * endR}`}/>;
                }),
                toArray(),
            )
            .subscribe(list => {
                setSeconds(list);
            })

        // 迷你秒针
        range(0, 300)
            .pipe(
                map(i => {
                    const len = 4;
                    const polar = 2 * Math.PI * i / 300;

                    const startR = r;
                    const endR = r - len;
                    const y = Math.sin(polar);
                    const x = Math.cos(polar);
                    return <path key={i}
                                 strokeWidth={1}
                                 stroke='gray'
                                 d={`M ${x * startR} ${y * startR} L ${x * endR} ${y * endR}`}/>;
                }),
                toArray(),
            )
            .subscribe(list => {
                setMiniSeconds(list);
            })

        // numbers
        range(1, 12)
            .pipe(
                map(i => {
                    const polar = 2 * Math.PI * i / 12 - Math.PI / 2;
                    const rr = r - 30;
                    const y = Math.sin(polar) * rr;
                    const x = Math.cos(polar) * rr - 9;
                    return <text key={i}
                                 x={x}
                                 alignmentBaseline={'central'}
                                 y={y}>
                        {i * 5}
                    </text>
                }),
                toArray(),
            )
            .subscribe(list => {
                setNumbers(list);
            })


    }, []);


    // 分针
    const minuteAngle = (props.minute / 60) * Math.PI * 2 - Math.PI / 2;
    const minutePointer = <path
        d={`M ${Math.cos(minuteAngle) * r} ${Math.sin(minuteAngle) * r}  L ${-Math.cos(minuteAngle) * 15} ${-Math.sin(minuteAngle) * 15}`}
        stroke={'red'} strokeWidth={1.5}/>;

    // 时针
    const hourAngle = (props.hour / 12) * Math.PI * 2 - Math.PI / 2;
    const len = r / 2;
    const hourPointer = <>
        <path
            d={`M ${Math.cos(hourAngle) * len} ${Math.sin(hourAngle) * len}  L 0 0 `}
            stroke={'black'} strokeWidth={4} strokeLinecap={'round'}/>

        <path
            d={`M ${Math.cos(hourAngle) * (len - 1)} ${Math.sin(hourAngle) * (len - 1)}  L ${Math.cos(hourAngle) * (len - 20)} ${Math.sin(hourAngle) * (len - 20)} `}
            stroke={'white'} strokeWidth={2} strokeLinecap={'round'}/>
    </>;


    // 圆圈
    const circle = <circle strokeWidth={2} stroke={'red'} fill={'white'} r={5}/>

    return <div className='clock'>
        <svg width={400} height={400} viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}>
            {seconds}
            {miniSeconds}
            {minutes}
            {numbers}
            {minutePointer}
            {hourPointer}
            {circle}
        </svg>
    </div>;
};

export default Clock;
