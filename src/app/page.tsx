'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const target = new Date(2025, 7, 12, 0, 0, 0); // Año, mes (agosto = 7), día
        const interval = setInterval(() => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                setCountdown('¡Ya llegó!');
                clearInterval(interval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setCountdown(`${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="h-screen w-screen flex flex-col md:flex-row">
            <div
                className="w-full md:w-1/2 h-1/2 md:h-full bg-pink-200 hover:bg-pink-300 active:bg-pink-400 transition-all flex items-center justify-center cursor-pointer"
                onClick={() => router.push('/vicky')}
            >
                <div className="text-center px-6 py-12 max-w-md space-y-4">
                    <p className="text-pink-900 text-2xl md:text-3xl font-semibold italic tracking-wide leading-snug font-serif">
                        No estás sola en esa sensación...
                    </p>
                    <p className="text-pink-800 text-base md:text-lg leading-relaxed font-light">
                        Todos nos sentimos perdidos a veces.
                    </p>
                    <p className="text-pink-800 text-base md:text-lg leading-relaxed font-light">
                        Hay otros como tú, cruzando caminos invisibles.<br className="hidden md:block" />
                        Y eso también es compañía.
                    </p>
                </div>

            </div>

            <div
                className="w-full md:w-1/2 h-1/2 md:h-full bg-black hover:bg-gray-900 active:bg-gray-800 transition-all flex items-center justify-center cursor-pointer"
                onClick={() => router.push('/david')}
            >
                <div className="text-center px-6 py-10 max-w-md space-y-4">
                    <p className="text-white text-2xl md:text-3xl italic font-semibold tracking-wide leading-snug font-serif">
                        Si sientes que la magia se apagó...
                    </p>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed font-light">
                        ...recupera ese aliento característico tuyo aquí.
                    </p>
                    <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">
                        Los problemas son pequeños como hormigas.<br className="hidden md:block" />
                    </p>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="w-52 h-52 md:w-64 md:h-64 bg-white/90 rounded-full shadow-xl flex items-center justify-center relative overflow-hidden">
                    {/* Semiborde izquierdo rosa */}
                    <div className="absolute left-0 top-0 h-full w-1/2 border-l-[5px] border-pink-400 rounded-l-full" />
                    {/* Semiborde derecho negro */}
                    <div className="absolute right-0 top-0 h-full w-1/2 border-r-[5px] border-black rounded-r-full" />

                    <div className="text-center px-3 z-10">
                        <p className="text-pink-800 text-xs md:text-sm font-semibold">
                            Falta poco para algo especial...
                        </p>
                        <p className="text-black font-bold text-sm md:text-base font-mono mt-1">
                            {countdown}
                        </p>
                    </div>
                </div>
            </div>


        </main>
    );
}
