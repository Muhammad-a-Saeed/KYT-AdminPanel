import React from 'react'

const PagesFooter = ({ tab, setTab, array, handleSubmit }) => {
    const handleNextPage = () => {
        const currentIndex = array.indexOf(tab);
        if (currentIndex < array.length - 1) {
            setTab(array[currentIndex + 1]);
        }
    };

    const handlePreviousPage = () => {
        const currentIndex = array.indexOf(tab);
        if (currentIndex > 0) {
            setTab(array[currentIndex - 1]);
        }
    };
    return (
        <footer className={`${tab === array[0] && "mb-7"} flex justify-between w-full`}>
            <button disabled={""} onClick={handlePreviousPage} className={`bg-primary  text-sm font-medium text-white min-w-20 py-1 px-2 rounded-md`}>
                Previous
            </button>
            <button onClick={() => {
                if (tab === array[array.length - 1]) handleSubmit();
                handleNextPage();
            }} className='bg-primary text-sm font-medium text-white py-1 min-w-20 px-2 rounded-md'>
                {tab === array[array.length - 1] ? 'Save' : 'Next'}
            </button>
        </footer>
    )
}

export default PagesFooter
