'use client'

import { NextPage } from "next";
import Link from "next/link";

import { usePathname, useSearchParams } from "next/navigation";


// a sample state object tree representing the full research component

const ResearchNode = {
    nodeName: "Capybara bathing",
    nodeDescription: "foo bar",
    nodeTags: ["#foo"],
    url: "/",
    nodeComponents: [
        {
            componentName: "manuscript",
            componentDescription: "foo bar",
            componentTags: ["#foo"],
            componentData: "anotate.pdf",
            componentType: "pdf",
            url: "/manuscript",
        },
        {
            componentName: "Code",
            componentDescription: "foo bar",
            componentTags: ["#foo"],
            url: "/code"
        },
    ]
}


export const ResearchComponent: NextPage = () => {

    const urlPath = usePathname()
    const params = useSearchParams()
    const viewMode = Boolean(params?.get("view")) || false

    return (
        <div className="border w-full h-full">

            Component metadata

            <div>
                <div> Component Name: Capybara bathing </div>
                <div> Component Description: foo bar </div>
                <div> Component Tags: #foo </div>
            </div>

            <Link href = { `${urlPath}?view=true` }> View Component </Link>

            {viewMode && <iframe src='anotate.pdf' width="100%" height="100%" />}
        </div>
    )
}

export default ResearchComponent;