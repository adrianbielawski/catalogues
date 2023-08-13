import styles from './imagesCounter.module.scss'

interface Props {
  current: number
  total: number
}

const ImagesCounter = (props: Props) => (
  <p className={styles.imagesCounter}>
    {props.current} / {props.total}
  </p>
)

export default ImagesCounter
