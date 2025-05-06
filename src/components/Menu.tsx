import { Link } from "react-router";
import { URLS } from "../navigation/constants";

export const Menu = () => {
    const toggleMenu = () => {
        const menu = document.getElementById("mobile-menu");
        if (menu) {
            menu.classList.toggle("hidden");
        }
    }

    const toggleSubMenu = (id: string) => {
        const subMenu = document.getElementById(id);
        const shownSubMenus = document.getElementsByClassName("submenu-shown");
        if (shownSubMenus.length > 0) {
            for (let i = 0; i < shownSubMenus.length; i++) {
                const element = shownSubMenus[i] as HTMLElement;
                if (element.id !== id) {
                    element.classList.toggle("hidden");
                    element.classList.toggle("submenu-shown");
                }
            }
        }
        if (subMenu) {
            subMenu.classList.toggle("hidden");
            subMenu.classList.toggle("submenu-shown");
        }
    }

    return (
        <nav className="bg-black shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-white">MiLogo</span>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none cursor-pointer">
                            <span className="inline-block">☰</span>
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to={URLS.HOME} className="text-white hover:text-blue-600">Inicio</Link>

                        <div className="relative group">
                            <button onClick={() => toggleSubMenu('materias')} className="cursor-pointer text-white hover:text-blue-600">
                                Materias
                            </button>
                            <div id="materias" className="absolute hidden bg-white shadow-md mt-2 rounded-md z-10">
                                <Link to={URLS.Beneficiarios.LIST} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Lista de materias</Link>
                                <Link to={URLS.Beneficiarios.CREATE} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Crear Materia</Link>
                            </div>
                        </div>

                        <div className="relative group">
                            <button onClick={() => toggleSubMenu('alumnos')} className="cursor-pointer text-white hover:text-blue-600">
                                Alumnos
                            </button>
                        </div>

                        <div className="relative group">
                            <button onClick={() => toggleSubMenu('authMenu')} className="cursor-pointer text-white hover:text-blue-600">
                                Usuario
                            </button>
                            <div id="authMenu" className="absolute hidden bg-white shadow-md mt-2 rounded-md z-10">
                                <button className="cursor-pointer block px-4 py-2 text-gray-800 hover:bg-gray-100">Cerrar sesión</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="mobile-menu" className="hidden md:hidden px-4 pb-4">
                <a href="#" className="block text-white py-2">Inicio</a>
                <a href="#" className="block text-white py-2">Servicios</a>
                <a href="#" className="block text-white py-2">Contacto</a>
            </div>
        </nav>
    );
}
