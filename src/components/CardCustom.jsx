import { Link } from "react-router-dom";

const CustomCard = ({menuId, title, description, imageUrl}) => {
    return (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/menu/${menuId}`}>
                <img className="rounded-t-lg h-[200px] object-cover w-full" src={imageUrl} alt="" />
            
            </Link>
            <div class="p-5">
                <Link to={`/menu/${menuId}`}>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </Link>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                
            </div>
        </div>      
    )
}

export default CustomCard;