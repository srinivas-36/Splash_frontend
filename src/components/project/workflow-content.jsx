"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkflowTab } from "@/components/project/tabs/workflow-tab"
import OverviewTab from "@/components/project/tabs/overview-tab"
import ResultsTab from "@/components/project/tabs/results-tab"
import CollaboratorsTab from "@/components/project/tabs/collaborators-tab"

export function WorkflowContent({ project }) {
    const [activeTab, setActiveTab] = useState("workflow")

    return (
        <div className="flex-1 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-[#e6e6e6] bg-white sticky top-0 z-10">
                    <TabsList className="w-full justify-start rounded-none bg-transparent p-0 h-auto border-b border-[#e6e6e6]">
                        <TabsTrigger
                            value="workflow"
                            className="rounded-none cursor-pointer border-b-2 border-transparent px-6 py-4 data-[state=active]:border-[#884cff] data-[state=active]:bg-[#f0e6ff]"
                        >
                            Workflow
                        </TabsTrigger>
                        <TabsTrigger
                            value="overview"
                            className="rounded-none cursor-pointer border-b-2 border-transparent px-6 py-4 data-[state=active]:border-[#884cff] data-[state=active]:bg-[#f0e6ff]"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="results"
                            className="rounded-none cursor-pointer border-b-2 border-transparent px-6 py-4 data-[state=active]:border-[#884cff] data-[state=active]:bg-[#f0e6ff]"
                        >
                            Results
                        </TabsTrigger>
                        <TabsTrigger
                            value="collaborators"
                            className="rounded-none cursor-pointer border-b-2 border-transparent px-6 py-4 data-[state=active]:border-[#884cff] data-[state=active]:bg-[#f0e6ff]"
                        >
                            Collaborators
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="workflow" className="p-8 m-0">
                    <WorkflowTab project={project} />
                </TabsContent>

                <TabsContent value="overview" className="p-8 m-0">
                    <OverviewTab project={project} />
                </TabsContent>

                <TabsContent value="results" className="p-8 m-0">
                    <ResultsTab project={project} />
                </TabsContent>

                <TabsContent value="collaborators" className="m-0">
                    <CollaboratorsTab projectId={project.id} projectData={project} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
