import "./Snackbar.scss" ; 

const Snackbar = () => {
    return ( 
        <div className="Snackbar border border-green-400 overflow-hidden  fixed top-4 right-4 bg-green-50 text-green-800 flex justify-center items-center rounded">
            <div className="relative w-full h-full  px-8 py-3">
                <div className="Snackbar-line bg-green-500 w-full h-1 absolute right-0 top-0"></div>
                <span>
                    اطلاعات با موفقیت ثبت شد 
                </span>
            </div>
        </div>
     );
}
 
export default Snackbar;