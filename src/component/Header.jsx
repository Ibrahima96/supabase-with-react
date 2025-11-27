import React from 'react'

const Header = ({totalGlobal}) => {
    return (
        <>
            <div className="btn btn-primary p-4 rounded-md w-full mx-auto flex items-center justify-between h-20">
                <div>
                    <span className="text-4xl font-bold mr-3">Dashboard</span>
                    <div className="text-sm">Total global : {totalGlobal}</div>
                </div>
                <img src="https://supabase.com/docs/supabase-dark.svg" alt="supabase" className="h-10" />
            </div>
        </>
    )
}

export default Header