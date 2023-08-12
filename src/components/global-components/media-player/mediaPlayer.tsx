import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './mediaPlayer.module.scss'
// Components
import ReactPlayer from 'react-player'
import Loader from '../loader/loader'

interface Props {
  url: string
  thumbnailUrl?: string
  className?: string
}

const cx = classNames.bind(styles)

const MediaPlayer = (props: Props) => {
  const [showLoader, setShowLodaer] = useState(false)

  const handlePreviewClick = () => {
    setShowLodaer(true)
  }

  const handlePlayerReady = () => {
    setShowLodaer(false)
  }

  const playerClass = cx('mediaPlayer', props.className)

  return (
    <div className={playerClass}>
      {showLoader && <Loader className={styles.loader} />}
      <ReactPlayer
        url={props.url}
        controls={true}
        light={props.thumbnailUrl}
        playing={true}
        width="100%"
        height="100%"
        onReady={handlePlayerReady}
        onClickPreview={handlePreviewClick}
      />
    </div>
  )
}

export default MediaPlayer
