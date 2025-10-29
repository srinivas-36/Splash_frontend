export default function ResultsSection() {
    const resultGroups = [{ id: 1 }, { id: 2 }, { id: 3 }]

    const resultImages = [
        "/woman-portrait-result.jpg",
        "/woman-portrait-result.jpg",
        "/woman-portrait-result.jpg",
        "/woman-portrait-result.jpg",
        "/woman-portrait-result.jpg",
    ]

    return (
        <div>
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Results</h2>
            <p className="text-[#737373] text-sm mb-8">Upload product image with white or transparent background</p>

            {resultGroups.map((group) => (
                <div key={group.id} className="mb-10">
                    <div className="grid grid-cols-6 gap-4">
                        {/* Original Image */}
                        <div>
                            <p className="text-sm font-semibold text-[#1a1a1a] mb-3">Original Image</p>
                            <div className="rounded-lg overflow-hidden border border-[#e6e6e6]">
                                <img src="/woman-portrait-original.jpg" alt="Original" className="w-full h-24 object-cover" />
                            </div>
                        </div>

                        {/* Results Label */}
                        <div className="col-span-5">
                            <p className="text-sm font-semibold text-[#1a1a1a] mb-3">Results</p>
                            <div className="grid grid-cols-5 gap-4">
                                {resultImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-lg overflow-hidden border border-[#e6e6e6] hover:shadow-md transition-shadow"
                                    >
                                        <img
                                            src={img || "/placeholder.svg"}
                                            alt={`Result ${idx + 1}`}
                                            className="w-full h-24 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
