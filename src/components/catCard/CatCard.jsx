import "./CatCard.scss"
import { Link } from "react-router-dom"

const CatCard = ({ item }) => {
  console.log(item)
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={item.img} alt="card img" />
        <span className="desc">{item.desc}</span>
        <span className="title">{item.title}</span>
      </div>
    </Link>
  )
}

export default CatCard