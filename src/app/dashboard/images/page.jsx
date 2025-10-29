
import { Header } from "@/components/images/header"
import { StatsCards } from "@/components/images/stats-cards"
import { PopularTools } from "@/components/images/popular-tools"
import { AllTools } from "@/components/images/all-tools"

export default function Home() {
    return (
        <div className="flex min-h-screen">
            <main className="flex-1">
                <Header />
                <div className="p-8 space-y-10">
                    <StatsCards />
                    <PopularTools />
                    <AllTools />
                </div>
            </main>
        </div>
    )
}
