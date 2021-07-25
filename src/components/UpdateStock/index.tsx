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
        ESTOQUEMIN: insumo.stock
      }
    })

    console.log(dataFormatted);

   await api.post('/contagemestoque',
      dataFormatted
    ).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

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
