import { usePage } from '@inertiajs/react';
import React from 'react'

const AdminLayout = ({children}) => {
    const { component } = usePage();
    const { auth } = usePage().props;
    
  return (
    <>
    <header className='bg-black text-white py-8'>
        <div className="container mx-auto">
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl'>Todo</h2>
                <nav className='flex justify-beetwen items-center grow ml-36' >
                    <div className='flex gap-6 items-center justify-start'>
                        <a href="/dashboard" className={`${component == 'Dashboard' ? "font-semibold text-indigo-500" : "" }`}>Dashboard</a>
                        <a href="/todo" className={`${component == 'Todo' ? "font-semibold text-indigo-500" : "" }`}>Todo</a>
                    </div>
                </nav>
                    <div>{auth.user.name}</div>
            </div>
        </div>
    </header>
    <main className='mt-10'>
        <div className="container mx-auto">
            {children}
        </div>
    </main>

    </>
  );
}

export default AdminLayout