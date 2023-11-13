import React from "react";


const CardContainer = ({children}) =>{
    
    return (

        <div >
            <h2 className="text-2xl my-4">Menu List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children}

            </div>
        </div>
    )
}

export default CardContainer;