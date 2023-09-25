import Link from 'next/link';

export default function Navigation() {
    return (
        <nav>
            <Link href ='/'>Home</Link>
            <Link href ='/integrations'>Integrations</Link>
            <Link href ='/roles'>Roles</Link>
        </nav>
    )
}