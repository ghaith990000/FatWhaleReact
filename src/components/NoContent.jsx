
const NoContent = ({message}) => {
    return (
        <div className="flex justify-center items-center border border-dashed border-gray-400 max-w-screen-lg mx-auto my-8 sm:w-full sm:p-4 md:w-2/3 lg:w-1/2 xl:w-1/3 h-[200px] bg-gray-50">
            <p className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">{message}</p>
        </div>
    )
}

export default NoContent;