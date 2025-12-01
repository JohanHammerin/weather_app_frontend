const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL!;

export async function login(payload: {username: string, password: string}) {

    const response = await fetch (`${AUTH_BASE_URL}/auth/login`,{
        method: "POST",
        headers: {"Content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error ("Login failed");
    return response.json().catch(()=>null);

}

export async function logout(){
    const response = await fetch(`${AUTH_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        credentials: "include",
    })

    if(!response.ok) throw new Error("Logout failed")
}

export async function register(payload: {username: string, password: string}) {
    const response = await fetch(`${AUTH_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify(payload),
    })

    if(!response.ok) throw new Error("Logout failed")
}