import Link from "next/link";
export default function NextLogo() {
    return (
        <>
            <div className="text-center flex  items-center">
                <Link href="/">
                <span className="bg-purple-950 text-white px-1 font-bold text-xl">EVENT</span>
                <span className="text-black font-bold ps-1 text-2xl">Ease</span>
                </Link>
            </div>
        </>
    );
}
