export default function ModelsSection() {
    const models = ["/woman-portrait-1.png", "/woman-portrait-2.png", "/woman-portrait-3.jpg", "/woman-portrait-4.jpg"]

    return (
        <div className="mb-12">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Models</h2>
            <p className="text-[#737373] text-sm mb-6">Model faces you have used so far for your product design</p>
            <div className="grid grid-cols-4 gap-4">
                {models.map((model, idx) => (
                    <div
                        key={idx}
                        className="rounded-lg overflow-hidden border border-[#e6e6e6] hover:shadow-md transition-shadow"
                    >
                        <img src={model || "/placeholder.svg"} alt={`Model ${idx + 1}`} className="w-full h-24 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}
