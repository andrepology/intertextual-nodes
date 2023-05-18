import Link from "next/link";

export default function NodeNavigator() {

    return (
        <div>
            Table
            <div className="flex flex-col">
                <Link href="/"> Home </Link>
                <Link href="/component"> PDF </Link>
                <Link href="/component2"> Code </Link>
            </div>
        </div>
    )
}