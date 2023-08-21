import { useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import {
  CLEAR_VERIFY_EMAIL_ERROR,
  VERIFY_EMAIL,
} from 'store/modules/auth-user/slice'
import { useAppDispatch, useTypedSelector } from 'store/storeConfig'
import Loader from 'components/global-components/loader/loader'
import Button from 'components/global-components/button/button'
import styles from './verifyEmail.module.scss'

type Params = Record<string, string>

const VerifyEmail = () => {
  const dispatch = useAppDispatch()

  const { key } = useParams<Params>()
  const location = useLocation()
  const navigate = useNavigate()

  const { authUser } = useTypedSelector((state) => state.modules)

  useEffect(() => {
    if (!key) {
      return
    }
    dispatch(
      VERIFY_EMAIL({
        key,
        navigate,
        location,
      }),
    )
  }, [])

  const resendEmail = () => {}

  const redirectToLogin = () => {
    dispatch(CLEAR_VERIFY_EMAIL_ERROR())
    navigate('/auth/login')
  }

  if (authUser.verifyEmailError.length) {
    return (
      <div className={styles.verifyEmail}>
        <p className={styles.title}>Email verification failed</p>
        <p>{authUser.verifyEmailError}</p>
        <div className={styles.buttons}>
          <Button onClick={resendEmail}>Resend email</Button>
          <p>or</p>
          <Button onClick={redirectToLogin}>Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.verifyEmail}>
      <p className={styles.title}>Verifying your email address</p>
      <p>Please wait ...</p>
      <Loader className={styles.loader} />
    </div>
  )
}

export default VerifyEmail
