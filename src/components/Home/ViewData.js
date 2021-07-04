import React from 'react'

const ViewData = (props) =>{
    console.log(props)
    return (
        <div>
            {props.data.category && props.data.category.map((value) => {
                console.log(value)
                return(
                    <>
                        <div key={value.id} className="mx-auto my-2">
                            <div className="flex border w-1/6 border-gray-300 shadow p-2 m-2">
                                {value.name}
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default ViewData
