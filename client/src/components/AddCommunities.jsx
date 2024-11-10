import React, { useState } from 'react'
// flowbite
import { Button, Modal } from "flowbite-react";
// framer motion
import { motion } from 'framer-motion';
// icons
import { MdAdd } from "react-icons/md";

const AddCommunities = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            {/* addcommunity */}
            {/* modal button  */}
            <motion.li
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={()=>setOpenModal(true)}
            >
                <div className="w-[2rem] h-[2rem] rounded-full flex items-center justify-center"><MdAdd className='text-[1.7rem]' /></div>
                Add community
            </motion.li>
            {/* modal body  */}
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
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddCommunities