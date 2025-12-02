import { logout } from "../../service/authService";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    function handleLogout() {
        logout();               
        router.push("/login"); 
    }

    return (
        <button onClick={handleLogout} className="btn">
            Log out
        </button>
    );
}
