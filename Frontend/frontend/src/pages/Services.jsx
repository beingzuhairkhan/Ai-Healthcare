
import { services } from '../assets/data/services.js'
import ServiceCard  from "../components/services/ServiceCard.jsx"
const Services = () => {
  return (
   <section className="">
    <div className="container">
    <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] text-left ">
    {services.map((item,index)=><ServiceCard item={item} index={index} key={index}/>)}

  </div>
    </div>
   </section>
  )
}

export default Services
