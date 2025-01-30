import react from "react";

const OurBranches = () => {
    return(
        <div className='branchesSec bg-[rgba(51,51,51,0.79)] px-4 md:px-10 py-7 rounded-2xl flex flex-col mt-6 md:mt-12'>
                    <p className="text-white text-2xl md:text-3xl font-bold text-center mb-10">Our Branches</p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded-md">
                                1
                            </div>
                            <div className="text-white">
                                <p className="font-bold text-lg">New York: <span className="font-normal"> 123 Broadway Avenue, Manhattan, NY 10001</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded-md">
                                2
                            </div>
                            <div className="text-white">
                                <p className="font-bold text-lg">London: <span className="font-normal"> 45 Oxford Street, Soho, London W1D 2HT</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded-md">
                                3
                            </div>
                            <div className="text-white">
                                <p className="font-bold text-lg">Dubai: <span className="font-normal"> Sheikh Zayed Road, Trade Center Area, Dubai</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded-md">
                                4
                            </div>
                            <div className="text-white">
                                <p className="font-bold text-lg">Sydney: <span className="font-normal"> 200 George Street, Sydney, NSW 2000</span></p>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default OurBranches