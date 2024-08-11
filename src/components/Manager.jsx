import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({
        site: "",
        username: "",
        password: "",
    })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
            setPasswordArray(passwords)
            // console.log(passwords)
    }
    

    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        // passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
    }
    const savePassword = async () => {
       if(form.site.length>3 && form.username.length>3 && form.password.length>3){
        console.log(form.id)
        //If any such id exists in the db, delete it
        await fetch("http://localhost:3000/",{method:"DELETE", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id:form.id})})

        console.log(form.id)
            const id = uuidv4()
           setPasswordArray([...passwordArray, { ...form, id: id }])
           await fetch("http://localhost:3000/",{method:"POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...form, id: id})})

        //    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
           setForm({
               site: "",
               username: "",
               password: "",
            })
        }
        else{
            toast("Error: Password not saved")
        } 

    }
    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password")
        if (c) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id))
            let res = await fetch("http://localhost:3000/",{method:"DELETE", headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id:id})})
            //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))

        }
    }

    const editPassword = (id) => {
        console.log("editing passwordwith id" + id)
        setForm({...passwordArray.filter(item => item.id === id)[0], id: id})
        console.log({...passwordArray.filter(item => item.id === id)[0], id: id})
        console.log(form)
        setPasswordArray(passwordArray.filter((item) => item.id !== id))
    }

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    }

    const copyText = (text) => {
        toast('🦄 Copied To clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text)
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className=' md:mycontainer md:p-0 p-2 min-h-[88.2vh]'>
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg  text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">

                    <input value={form.site} onChange={handleChange} placeholder="Enter Website URL" className='rounded-full border border-green-500 w-full focus:ring focus:ring-green-400 focus:outline-none focus:border-none px-4 py-1' type="text" name="site" id="site" />

                    <div className="flex md:flex-row flex-col w-full gap-8 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" type="text" name="username" id="username" className='rounded-full border border-green-500 w-full focus:ring focus:ring-green-400 focus:outline-none focus:border-none px-4 py-1' />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" type="password" name="password" id="password" className='rounded-full border border-green-500 w-full focus:ring focus:ring-green-400 focus:outline-none focus:border-none px-4 py-1' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer'
                                onClick={showPassword}>
                                <img ref={ref} className="p-1" width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button className='flex items-center justify-center gap-2 bg-green-400 rounded-full
                    px-8 py-2 w-fit text-center hover:bg-green-300 border border-green-900'
                        onClick={savePassword}
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        <span>Save</span>
                    </button>
                </div>
                <div className="password">
                    <h2 className='font-bold text-2xl py-4 '>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((pass, index) => (
                                    <tr key={index} >
                                        <td className='py-2 border border-white text-center '>
                                            <div className='flex items-center justify-center'>
                                                <a href={pass.site} target='_blank'>{pass.site}</a>
                                                <span onClick={() => { copyText(pass.site) }}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    className="hover:scale-125 material-symbols-outlined size-7 cursor-pointer">
                                                    content_copy
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className='flex items-center justify-center'>
                                                <span>{pass.username}</span>
                                                <span onClick={() => { copyText(pass.username) }}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    className="hover:scale-125 material-symbols-outlined size-7 cursor-pointer">
                                                    content_copy
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className='flex items-center justify-center'>
                                                <span>{"*".repeat(pass.password.length)}</span>
                                                <span onClick={() => { copyText(pass.password) }}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    className="hover:scale-125 material-symbols-outlined size-7 cursor-pointer">
                                                    content_copy
                                                </span>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <span
                                                onClick={() => { editPassword(pass.id) }}
                                                className="material-symbols-outlined cursor-pointer hover:scale-[1.25]">
                                                edit
                                            </span>
                                            <span className='cursor-pointer mx-2' onClick={() => { deletePassword(pass.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
