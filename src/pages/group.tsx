import { GetStaticProps } from "next";
import { Header } from "../components/Header";
import { UpdateStock } from "../components/UpdateStock";
import { api } from "../services/api";
import styles from './group.module.scss'
import { useEffect, useState } from "react";
import Modal from "react-modal"
import {GrFormClose} from 'react-icons/gr'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [amountNewStock, setAmountNewStock] = useState(0)
  const [idStock, setIdStock] = useState(0)
  const [stocks, setStocks] = useState<Insumo[]>(insumos)

  useEffect(() => {
    const storageStock = JSON.parse(localStorage.getItem('@AgroSag:stock' ))
    if (storageStock) {


      const insumosdFormatted = insumos.map(insumo => {
        return {
          ...insumo,
          stock: (storageStock.find(item => item.id === insumo.id ? item: false)).stock
        }

      })
      console.log(insumosdFormatted);
      setStocks(insumosdFormatted)
    }else{
      localStorage.setItem('@AgroSag:stock', JSON.stringify(
        stocks.map(stock => {
          return {
            id: stock.id,
            stock: stock.stock
          }
        })
      ) )
    }



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
      <Button  colorScheme="green" onClick={onOpen}>
        Create user
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader  borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody  minHeight="700">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </main>
    </div>
  )
}
export const getStaticProps: GetStaticProps = async ()=>{
  const response = await api.get('/retornainsumosativos')

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
