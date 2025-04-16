import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import FlashSales from '../components/FlashSales'
import PackCardProduct from '../components/PackCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <FlashSales category={"camera"} heading={"Flash Sales"}/>
      <PackCardProduct saleType={"topProduct"} heading={"Top Products"}/>
      <VerticalCardProduct category={"camera"} heading={"Cameras"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"airpods"} heading={"Airpodes"}/>
      <VerticalCardProduct category={"watches"} heading={"Watches"}/>
      <VerticalCardProduct category={"earphones"} heading={"Earphones"}/>
      <VerticalCardProduct category={"processor"} heading={"ProcessorS"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>




      
    </div>
  )
}



const productCategory = [
  { id : 1, label : "Airpodes", value : "airpodes"},
  { id : 2, label : "Camera", value : "camera"},
  { id : 3, label : "Earphones", value : "earphones"},
  { id : 4, label : "Mobiles", value : "mobiles"},
  { id : 5, label : "Mouse", value : "Mouse"},
  { id : 6, label : "Printers", value : "printers"},
  { id : 7, label : "Processor", value : "processor"},
  { id : 8, label : "Refrigerator", value : "refrigerator"},
  { id : 9, label : "Speakers", value : "speakers"},
  { id : 10, label : "Trimmers", value : "trimmers"},
  { id : 11, label : "Televisions", value : "televisions"},
  { id : 12, label : "Watches", value : "watches"},
]

export default Home