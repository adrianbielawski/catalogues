import React, { ReactNode } from 'react'
import classNames from 'classnames/bind'
import styles from './image.scss'
//Hooks
import { useImageLoader } from 'src/hooks/useImageLoader'
//Custom components
import Loader from '../loader/loader'

type Props = {
    url?: string,
    baseUrl?: string,
    dimensions?: {
        width: number,
        height: number,
    }
    placeHolder?: ReactNode,
    loading?: boolean,
    onLoading?: 'loader' | 'placeholder' | 'none',
    className?: string,
} & React.HTMLProps<HTMLDivElement>

const cx = classNames.bind(styles)

const Image = (props: Props) => {
    const { url, baseUrl, dimensions, placeHolder, loading, onLoading, className, ...rest } = props
    const image = url && !url?.startsWith('blob')
        ? useImageLoader(`${baseUrl || ''}${url}`)
        : url

    const placeholder = image === undefined || (onLoading === 'placeholder' && !image) || (!url && placeHolder)
        ? placeHolder
        : null

    const loader = url && onLoading === 'loader' && (image === null || loading)

    const imageClass = cx(
        'image',
        className,
        {
            loaded: image,
        },
    )

    return (
        <div className={imageClass} {...rest}>
            {placeholder}
            {loader && <Loader className={styles.loader} />}
            {url &&
                <img
                    src={image || ''}
                    width={props.dimensions?.width}
                    height={props.dimensions?.height}
                />
            }
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