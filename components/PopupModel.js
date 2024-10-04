import { Cross_New_SVG } from '@/utils/svgGrabber'; import React from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#root');

const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        width: 'fit-content',
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'auto',
        padding: "10px",
        borderRadius: "10px",
        overflow: "visible",
        buttonShadow: `2px 4px 10px 0px #B4BFCD33`,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
};

const PopupModel = ({ isOpen, onRequestClose, className, children, crossClick, width = "fit-content" }) => {
    if (width) customStyles.content.width = width;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Contact"
            className={className}
            style={customStyles}
        >
            <div onClick={crossClick} className='absolute bg-white drop-shadow-xl cursor-pointer shadow-buttonShadow rounded-full p-1 -top-3 -right-3'>
                <Cross_New_SVG />
            </div>

            {children}
        </Modal>
    );
};

export default PopupModel;
