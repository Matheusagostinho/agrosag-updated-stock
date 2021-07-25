import { GetStaticProps } from "next";
import { Header } from "../components/Header";
import { UpdateStock } from "../components/UpdateStock";
import { api } from "../services/api";
import styles from './home.module.scss'
import { useEffect, useState } from "react";
import Modal from "react-modal"
import {GrFormClose} from 'react-icons/gr'
type Insumo ={
    id:number
      description: string
      unity: string
      stock:  number,
      description_group: string
}

interface HomeProps{
  insumos: Insumo[]

}

Modal.setAppElement('#__next')

export function isMobile(): boolean {
  return / Safari|iOS Safari|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent);
}
export default function Home({insumos}:HomeProps) {

  const [isNewModalOpen, setIsNewModalOpen] = useState(false)



  const [amountNewStock, setAmountNewStock] = useState(0)
  const [idStock, setIdStock] = useState(0)
  const [stocks, setStocks] = useState(insumos)

  useEffect(() => {
    localStorage.setItem('@AgroSag:stock', JSON.stringify(
      stocks.map(stock => {
        return {
          id: stock.id,
          stock: stock.stock
        }
      })
    ) )

  }, []);

 function handleUpdatedStock(id:number, newStock: number){
    const updateStock = stocks.map( insumo => insumo.id === id ? {
        ...insumo,
        stock: newStock
    } : insumo   )
    setStocks(updateStock)
    localStorage.setItem('@AgroSag:stock', JSON.stringify(
      updateStock.map(stock => {
        return {
          id: stock.id,
          stock: stock.stock
        }
      })
    ) )
    setAmountNewStock(0)
    setIdStock(0)
    setIsNewModalOpen(false)
 }



  return (
    <div className={styles.containerHome}>
     <Header/>
     <main className={styles.table}>
     <table >
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th> </th>
          </tr>
          </thead>
          <tbody>
            {
              stocks.map(insumo =>
                (
                <tr key={insumo.id}>
                  <td>{insumo.description}</td>
                  <td>{`${insumo.stock} - ${insumo.unity}`}</td>
                  <td><button onClick={() => (setIsNewModalOpen(true), setIdStock(insumo.id), setAmountNewStock(insumo.stock))}> Atualizar</button></td>
                </tr>
              ))
            }
            </tbody>
      </table>
      </main>
     <UpdateStock/>
          <Modal
            overlayClassName="react-modal-overlay"
            isOpen={isNewModalOpen}
            onRequestClose={ ()=>  setIsNewModalOpen(false)}
            className="react-modal-content"
          >
          <button type="button" onClick={()=>  setIsNewModalOpen(false)} className="react-modal-close">
            <GrFormClose size={25}/>
          </button>
                <div className={styles.modalHome}>
                  <span> Novo valor do estoque</span>
                  <input
                  type="number"
                  placeholder='Estoque'
                  value={amountNewStock}
                  onChange={(e) => setAmountNewStock(Number(e.target.value))}
                  />
                  <button onClick={()=> handleUpdatedStock(idStock, amountNewStock)}>Atualizar Estoque</button>
                </div>
           </Modal>
    </div>
  )
}
export const getStaticProps: GetStaticProps = async ()=>{
  const response = await api.get('/retornainsumosativos')
  console.log(response.data);

  const insumos = response.data.map(insumo => {
    return {
      id: insumo.ID_INSUMO,
      description: insumo.DESCRICAOINSUMO,
      unity: insumo.UN,
      stock:  insumo.ESTOQUEMIN,
      description_group: insumo.DESCRICAOGRUPO
    }
  })



  return{
    props:{
      insumos,
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }

}
