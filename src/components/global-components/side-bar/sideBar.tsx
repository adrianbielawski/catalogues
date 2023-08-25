import { PropsWithChildren, CSSProperties, MouseEvent } from 'react'
import classNames from 'classnames/bind'
import styles from './sideBar.module.scss'
import { useTypedSelector } from 'store/storeConfig'
import { useDisableScroll } from 'src/hooks/useDisableScroll'

type SlideDirection = 'right' | 'left'

interface Props extends PropsWithChildren<any> {
  active: boolean
  mobile: boolean
  slideDirection?: SlideDirection
  className?: string
  childrenWrapperClassName?: string
  onBackgroundClick: (e: MouseEvent) => void
}

const defaultProps: Props = {
  active: false,
  mobile: false,
  slideDirection: 'left',
  className: '',
  childrenWrapperClassName: '',
  onBackgroundClick: () => null,
}

const cx = classNames.bind(styles)

const SideBar = (props: Props) => {
  const screenHeight = useTypedSelector(
    (state) => state.modules.app.screenHeight,
  )
  useDisableScroll(props.active)

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    if (props.mobile) {
      e.stopPropagation()
    }
  }

  const onBackgroundClick = (e: MouseEvent) => {
    e.stopPropagation()
    props.onBackgroundClick(e)
  }

  const sideBarClass = cx('sideBar', props.className, {
    active: props.active,
    rightSlide: props.slideDirection === 'right',
    leftSlide: props.slideDirection === 'left',
  })

  const childrenWrapperClass = cx(
    'childrenWrapper',
    props.childrenWrapperClassName,
  )

  return (
    <div
      className={sideBarClass}
      style={
        {
          '--height': `${screenHeight}px`,
        } as CSSProperties
      }
    >
      <div className={childrenWrapperClass} onClick={stopPropagation}>
        {props.children}
      </div>
      {props.mobile && (
        <div className={styles.background} onClick={onBackgroundClick}></div>
      )}
    </div>
  )
}

SideBar.defaultProps = defaultProps

export default SideBar
