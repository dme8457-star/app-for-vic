'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

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

        </main>
    );
}
