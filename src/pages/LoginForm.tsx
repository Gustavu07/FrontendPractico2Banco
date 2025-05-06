import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/constants";
import { LoginRequest } from "../models/dto/LoginRequest";
import { AuthService } from "../services/AuthService";

type Inputs = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        register, 
        handleSubmit, 
        formState: { errors }, 
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Form data submitted:", data);
        setLoginError(null); 
        const login: LoginRequest = {
            username: data.email,
            password: data.password,
        };

        new AuthService()
            .login(login.username, login.password)
            .then((response) => {
                console.log("Login successful", response);
                navigate(URLS.Cuentas.LIST);
            })
            .catch((error) => {
                console.error("Login failed", error);
                setLoginError("Credenciales inválidas. Por favor, inténtelo de nuevo.");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md shadow-lg bg-white p-8 rounded-lg">
                <h2 className="text-center text-2xl font-semibold mb-6">Iniciar sesión</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "El email es requerido" })}
                            className={`mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-500" : ""}`}
                            placeholder="nombre@ejemplo.com"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "La contraseña es requerida" })}
                            className={`mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? "border-red-500" : ""}`}
                            placeholder="Contraseña"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs">{errors.password.message}</span>
                        )}
                    </div>
                    {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Iniciar sesión
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta? <a href="/register" className="text-blue-500">Regístrate</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
