import { Link, useNavigate } from "react-router";
import { URLS } from "../navigation/constants";
import { AuthService } from "../services/AuthService";

export const Menu = () => {
    const navigate = useNavigate();

    const toggleMenu = () => {
        const menu = document.getElementById("mobile-menu");
        if (menu) {
            menu.classList.toggle("hidden");
        }
    };

    const toggleSubMenu = (id: string) => {
        const subMenu = document.getElementById(id);
        const shownSubMenus = document.getElementsByClassName("submenu-shown");
        if (shownSubMenus.length > 0) {
            for (let i = 0; i < shownSubMenus.length; i++) {
                const element = shownSubMenus[i] as HTMLElement;
                if (element.id !== id) {
                    element.classList.add("hidden");
                    element.classList.remove("submenu-shown");
                }
            }
        }
        if (subMenu) {
            subMenu.classList.toggle("hidden");
            subMenu.classList.toggle("submenu-shown");
        }
    };

    const handleLogout = () => {
        const authService = new AuthService();
        authService.logout(); // borra tokens
        navigate(URLS.LOGIN); // redirige
    };

    return (
        <nav className="bg-black shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to={URLS.HOME} className="text-xl font-bold text-white">MiLogo</Link>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <span>☰</span>
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to={URLS.Cuentas.LIST} className="text-white hover:text-blue-500">Cuentas</Link>

                        <div className="relative">
                            <button onClick={() => toggleSubMenu('materias')} className="text-white hover:text-blue-500">
                                Beneficiarios
                            </button>
                            <div id="materias" className="absolute hidden bg-white shadow-md mt-2 rounded-md z-10">
                                <Link to={URLS.Beneficiarios.LIST} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Lista</Link>
                                <Link to={URLS.Beneficiarios.CREATE} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Crear</Link>
                            </div>
                        </div>

                        <div className="relative">
                            <button onClick={() => toggleSubMenu('movimientos')} className="text-white hover:text-blue-500">
                                Movimientos
                            </button>
                            <div id="movimientos" className="absolute hidden bg-white shadow-md mt-2 rounded-md z-10">
                                <Link to={URLS.Movimientos.LIST} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Lista</Link>
                                <Link to={URLS.Movimientos.CREATE} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Crear</Link>
                            </div>
                        </div>

                        <div className="relative">
                            <button onClick={() => toggleSubMenu('authMenu')} className="text-white hover:text-blue-500">
                                Usuario
                            </button>
                            <div id="authMenu" className="absolute hidden bg-white shadow-md mt-2 rounded-md z-10">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            <div id="mobile-menu" className="hidden md:hidden px-4 pb-4">
                <Link to={URLS.Cuentas.LIST} className="block text-white py-2">Cuentas</Link>
                <Link to={URLS.Beneficiarios.LIST} className="block text-white py-2">Beneficiarios</Link>
                <Link to={URLS.Movimientos.LIST} className="block text-white py-2">Movimientos</Link>
                <button onClick={handleLogout} className="block text-white py-2">Cerrar sesión</button>
            </div>
        </nav>
    );
};
