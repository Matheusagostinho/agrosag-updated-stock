import styles from './styles.module.scss'

export function Header(){
  return(
    <header className={styles.containerHeader}>
      <img src="/images/logo.png" alt="Logo AgroSag"  />
      <span>AgroSag - Automação e Gestão Agrícola</span>
    </header>
  )
}
