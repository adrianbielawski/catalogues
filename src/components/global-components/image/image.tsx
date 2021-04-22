import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './image.scss'
//Constants
import { BASE_URL } from 'src/constants'
//Hooks
import { useImageLoader } from 'src/hooks/useImageLoader'
//Custom components
import Loader from '../loader/loader'

type Props = {
    url?: string,
    placeHolder?: ReactNode,
    loading?: boolean,
    onLoading?: 'loader' | 'placeholder' | 'none',
    className?: string,
} & React.HTMLProps<HTMLDivElement>

const cx = classNames.bind(styles)

const Image = (props: Props) => {
    const { url, placeHolder, loading, onLoading, className, ...rest } = props
    const image = url ? useImageLoader(`${BASE_URL}${url}`) : null

    const placeholder = (onLoading === 'placeholder' && !image) || (!url && placeHolder)
        ? placeHolder
        : null

    const loader = url && onLoading === 'loader' && (!image || loading)

    const imageClass = cx(
        'image',
        className,
        {
            loaded: image,
        },
    )

    return (
        <div className={imageClass} {...rest}>
            {loader && <Loader className={styles.loader} />}
            {url && <img src={image || ''} />}
            {placeholder}
        </div>
    )
}

Image.defaultProps = {
    url: undefined,
    placeHolder: undefined,
    loading: false,
    onLoading: 'loader',
    className: undefined,
}

export default Image