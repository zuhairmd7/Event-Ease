import Link from "next/link";
export default function NextLogo() {
    return (
        <>
            <div className="text-center flex  items-center">
                <Link href="/">
                    <span className="bg-[#dc8277] text-white px-1 pb-0.5 font-bold text-xl">EVENT</span>
                    <span className="text-black font-bold ps-1 text-2xl">Now</span>
                </Link>
            </div>
        </>
    );
}
