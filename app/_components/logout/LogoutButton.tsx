'use client'
import { logout } from "../../service/authService";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    function handleLogout() {
        logout();               
        router.push("/login"); 
    }

    return (
        <button onClick={handleLogout} className=" bg-button-blue 
        text-white 
        text-3xl 
        p-2 
        rounded-lg hover:opacity-90">
            Log out
        </button>
    );
}
