import logo from '../../assets/rocket.svg'

import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="" />
      <strong>
        to<span>do</span>
      </strong>
    </header>
  )
}
