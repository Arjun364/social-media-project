import React, { useState } from 'react'
// flowbite
import { Button, Modal } from "flowbite-react";
// icons
import { IoIosArrowForward } from "react-icons/io";
const Account = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleEmailUpdation = () => {
        setOpenModal(!openModal)
    }
    return (
        <div className='w-full h-[40rem] overflow-x-hidden overflow-y-scroll flex flex-col gap-3'>
            {/* <!-- Section Title --> */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">General</h2>

            {/* <!-- Settings Items --> */}
            <div className="divide-y divide-gray-200 bg-white rounded-lg shadow">
                {/* <!-- Email Address --> */}
                <div className="group flex justify-between items-center py-4 px-6">
                    <div>
                        <p className="text-gray-800 font-medium">Email address</p>
                        <p className="text-gray-500 text-sm">avarjun360@gmail.com</p>
                    </div>
                    <button type="button" onClick={handleEmailUpdation} className="group-hover:text-red-400">
                        <IoIosArrowForward className="text-[1.3rem] text-slate-500" />
                    </button>
                </div>

                {/* <!-- Gender --> */}
                <div className="flex justify-between items-center py-4 px-6">
                    <div>
                        <p className="text-gray-800 font-medium">Gender</p>
                        <p className="text-gray-500 text-sm">Man</p>
                    </div>
                    <button>
                        <IoIosArrowForward className='text-[1.3rem] text-slate-500' />
                    </button>
                </div>

                {/* <!-- Location Customization --> */}
                <div class="flex justify-between items-center py-4 px-6">
                    <div>
                        <p class="text-gray-800 font-medium">Location customization</p>
                        <p class="text-gray-500 text-sm">Use approximate location (based on IP)</p>
                    </div>
                    <button>
                        <IoIosArrowForward className='text-[1.3rem] text-slate-500' />
                    </button>
                </div>
                {/* modal body */}
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Terms of Service</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                                companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                                to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                                soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='text-right'>
                        <Button onClick={() => setOpenModal(false)}>I accept</Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            {/* <!-- Section Title --> */}
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Advanced</h2>
            {/* <!-- Location Customization --> */}
            <div class="flex justify-between items-center py-4 px-6">
                <div>
                    <p class="text-gray-800 font-medium">Delete account</p>
                </div>
                <button>
                    <IoIosArrowForward className='text-[1.3rem] text-slate-500' />
                </button>
            </div>
        </div>
    )
}

export default Account