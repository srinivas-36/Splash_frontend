export default function LoginImage() {
    return (
        <div className="relative w-full h-full min-h-96">
            {/* Top left - Small jewelry image */}
            <div className="absolute top-0 left-0 w-48 h-48 rounded-2xl overflow-hidden shadow-lg z-10">
                <img src="/luxury-diamond-heart-necklace-pendant-on-dark-back.jpg" alt="Diamond heart pendant" className="w-full h-full object-cover" />
            </div>

            {/* Bottom right - Large jewelry image */}
            <div className="absolute bottom-0 right-0 w-80 h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                    src="/woman-wearing-luxury-diamond-heart-necklace-jewelr.jpg"
                    alt="Woman wearing luxury jewelry"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}
