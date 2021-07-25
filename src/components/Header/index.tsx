import styles from './styles.module.scss'
import  Image  from 'next/image'
import logoImg from '../../../public/images/logo.png'

export function Header(){
  return(
    <header className={styles.containerHeader}>
      <Image src={logoImg} alt="Logo AgroSag"
      width={70}
      height={70}/>
      <span>AgroSag - Automação e Gestão Agrícola</span>
    </header>
  )
}
