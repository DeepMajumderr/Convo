import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emptydp from '../assets/emptydp.jpg';
import { IoSearchSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { RiLogoutCircleLine } from 'react-icons/ri';
import axios from 'axios';
import { serverUrl } from '../main';
import {
    setOtherUsers,
    setSearchData,
    setSelectedUser,
    setUserData
} from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const {
        userData,
        otherUsers,
        selectedUser,
        onlineUsers,
        searchData
    } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setinput] = useState('');
    const [search, setsearch] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, {
                withCredentials: true
            });
            dispatch(setUserData(null));
            dispatch(setOtherUsers(null));
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/user/search?query=${input}`,
                { withCredentials: true }
            );
            dispatch(setSearchData(result.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (input) handleSearch();
    }, [input]);

    const displayedUsers = input ? searchData : otherUsers;

    return (
        <div
            className={`lg:w-[30%] w-full h-screen bg-slate-200 relative flex-col ${
                !selectedUser ? 'flex' : 'hidden'
            } lg:flex`}
        >
            {/* Logout Button */}
            <div className="absolute bottom-[20px] left-[10px] w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] bg-[#20c7ff] rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                <RiLogoutCircleLine
                    onClick={handleLogout}
                    className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]"
                />
            </div>

            {/* Header */}
            <div className="w-full h-[200px] lg:h-[240px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex flex-col justify-center px-4 lg:px-5">
                <h1 className="text-white font-bold text-xl lg:text-2xl">Convo</h1>
                <div className="flex justify-between items-center mt-2">
                    <h1 className="text-gray-800 font-bold text-lg lg:text-xl">
                        Hi, {userData.name || 'User'}
                    </h1>
                    <div
                        className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-lg cursor-pointer"
                        onClick={() => navigate('/profile')}
                    >
                        <img
                            src={userData.image || emptydp}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Search */}
                <div className="w-full flex items-center gap-2 lg:gap-3 mt-4">
                    {!search ? (
                        <div
                            className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer"
                            onClick={() => setsearch(true)}
                        >
                            <IoSearchSharp className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]" />
                        </div>
                    ) : (
                        <form className="w-full h-[50px] lg:h-[60px] bg-white shadow-lg flex items-center gap-2 px-3 lg:px-4 rounded-full relative">
                            <IoSearchSharp className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]" />
                            <input
                                type="text"
                                placeholder="search users..."
                                className="flex-1 text-[15px] lg:text-[17px] outline-none border-none"
                                onChange={e => setinput(e.target.value)}
                                value={input}
                            />
                            <RxCross2
                                className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px] cursor-pointer"
                                onClick={() => {
                                    setinput('');
                                    setsearch(false);
                                }}
                            />
                        </form>
                    )}

                    {/* Avatars (only show if not searching) */}
                    {!search &&
                        otherUsers?.map(
                            user =>
                                onlineUsers?.includes(user._id) && (
                                    <div
                                        key={user._id}
                                        className="relative w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] rounded-full shadow-lg cursor-pointer"
                                        onClick={() => dispatch(setSelectedUser(user))}
                                    >
                                        <img
                                            src={user.image || emptydp}
                                            alt={user.name}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                        <span className="w-[12px] h-[12px] lg:w-[14px] lg:h-[14px] rounded-full bg-[#3aff20] absolute bottom-0 right-0 border-2 border-white" />
                                    </div>
                                )
                        )}
                </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-auto flex flex-col items-center gap-3 px-2 pt-4">
                {displayedUsers?.map(user => (
                    <div
                        key={user._id}
                        className="w-[95%] h-[50px] lg:h-[60px] flex items-center bg-white shadow-md rounded-full hover:bg-[#b2ccdf] gap-3 lg:gap-4 px-3 cursor-pointer"
                        onClick={() => dispatch(setSelectedUser(user))}
                    >
                        <div className="relative min-w-[40px] min-h-[40px] w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full shadow-md flex justify-center items-center">
                            <img
                                src={user.image || emptydp}
                                alt={user.name}
                                className="w-full h-full object-cover rounded-full overflow-hidden"
                            />
                            {onlineUsers?.includes(user._id) && (
                                <span className="w-[10px] h-[10px] lg:w-[12px] lg:h-[12px] rounded-full bg-[#3aff20] absolute bottom-0 right-0 border-2 border-white" />
                            )}
                        </div>

                        <h1 className="text-gray-800 font-semibold text-[16px] lg:text-[18px]">
                            {user.name || user.userName}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;