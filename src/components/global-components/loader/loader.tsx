import React from 'react'
import classNames from 'classnames/bind'
import styles from './loader.module.scss'

type Props = {
    className?: string,
    size?: number,
    color?: string,
}

const cx = classNames.bind(styles)

const Loader = (props: Props) => {
    const getDivs = () => {
        let divs: JSX.Element[] = []
        for (let i = 0; i < 12; i++) {
            divs.push(<div style={{ background: props.color }} key={i}></div>)
        }
        return divs
    }

    const loaderClass = cx(
        'loader',
        props.className,
    )

    return (
        <div
            className={loaderClass}
            style={{
                width: props.size,
                height: props.size,
            }}
        >
            {getDivs()}
        </div>
    )
}

export default Loader