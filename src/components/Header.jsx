import Link from "next/link"

export function Header() {
    return (
        <nav className="bg-teal-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold">React recipes</Link>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/contact" className="hover:underline">Contact</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:underline">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
