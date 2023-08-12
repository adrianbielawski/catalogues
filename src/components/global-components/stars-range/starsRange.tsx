import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './starsRange.module.scss'

interface Props {
  selected: number[]
  range?: number
  className?: string
  onChange: (selected: number[]) => void
}

const cx = classNames.bind(styles)

const StarsRange = (props: Props) => {
  const [selected, setSelected] = useState<number[]>(props.selected)
  const [hoveredAfterClick, setHoveredAfterClick] = useState(false)
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelected(props.selected)
  }, [props.selected])

  useEffect(() => {
    return () => {
      starsRef.current?.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  const handleMouseLeave = () => {
    setHoveredAfterClick(false)
  }

  const stars: ReactNode[] = []

  for (let i = 0; i < props.range!; i++) {
    const index = i + 1

    const handleClick = useCallback(() => {
      let newSelected = [...selected]

      newSelected.push(index)
      newSelected.shift()

      if (selected.length === 0) {
        newSelected = [props.range!, index]
      }

      if (selected.includes(index)) {
        newSelected = [index, index]
      }

      if (selected && index === selected[0] && selected[0] === selected[1]) {
        newSelected = []
      }

      if (starsRef.current != null) {
        starsRef.current.addEventListener('mouseout', handleMouseLeave)
      }

      setSelected(newSelected)
      setHoveredAfterClick(true)
      props.onChange([...newSelected].sort((a, b) => a - b))
    }, [selected, props.range, starsRef])

    const sorted = [...selected].sort((a, b) => a - b)

    const starClass = cx('star', {
      active: index >= sorted[0] && index <= sorted[1],
      last: index === selected[1],
    })

    stars.push(
      <FontAwesomeIcon
        className={starClass}
        icon={faStar}
        key={i}
        onClick={handleClick}
      />,
    )
  }

  const starsClass = cx('stars', props.className, {
    hoveredAfterClick,
  })

  return (
    <div className={starsClass} ref={starsRef}>
      {stars}
    </div>
  )
}

StarsRange.defaultProps = {
  selected: null,
  range: 5,
  className: undefined,
  onChange: () => {},
}

export default StarsRange
