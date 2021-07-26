import { bottom } from '@popperjs/core'
import styles from './styles.module.scss'
import { BiTransferAlt} from'react-icons/bi'
import { api} from '../../services/api'

export function UpdateStock(){
  async function handleTransmitData(){
    const storageStock =  localStorage.getItem('@AgroSag:stock')

    const dataStock = JSON.parse(storageStock)

    const dataFormatted = dataStock.map(insumo => {
      return {
        ID_INSUMO: insumo.id,
        DATA: new Intl.DateTimeFormat('pt-BR',
        ).format(new Date(new Date())),
        QT: insumo.stock
      }
    })



   const response = await api.post('/contagemestoque',
      dataFormatted
    )

    console.log(response);


  }

  return(
    <footer className={styles.footerContainer}>
        <button type="button" onClick={handleTransmitData}>
          Transmitir estoque
          <BiTransferAlt/>
        </button>
    </footer>
  )
}
