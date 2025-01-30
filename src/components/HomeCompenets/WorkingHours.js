
const WorkingHours = () => {
    return(
        <div className='workingHoursSec bg-[rgba(51,51,51,0.79)] px-4 md:px-10 py-7 rounded-2xl flex flex-col mt-6 md:mt-12 mb-12'>
            <p className="text-white text-2xl md:text-2xl font-bold text-center mb-10">Working Hours</p>
                <div className="text-white text-center">
                    <p className="text-lg font-semibold">Monday to Thursday & Saturday to Sunday: <span className='font-extrabold text-orange-500'> 7:00 AM - 2:00 PM</span> </p>
                    <p className="text-lg font-semibold">Friday: <span className='font-extrabold text-orange-500'> 9:00 AM - 5:00 AM</span> </p>
                </div>
        </div>
    )
}

export default WorkingHours