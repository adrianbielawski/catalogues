import classNames from 'classnames/bind'
import styles from './dialogCloud.module.scss'

interface Props {
  message: string
}

const cx = classNames.bind(styles)

const DialogCloud = (props: Props) => {
  const dialogCloudClass = cx('dialogCloud', {
    active: props.message.length > 0,
  })

  return (
    <div className={dialogCloudClass}>
      <p>{props.message}</p>
    </div>
  )
}

export default DialogCloud
