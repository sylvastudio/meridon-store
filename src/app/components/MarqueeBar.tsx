export default function MarqueeBar() {
  return (
    <div className="bg-[#1f3a3a] border-b border-[#fae65f] w-full overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="mx-8 font-['Playfair_Display:Regular',sans-serif] text-[#E5E4DD] text-[16px]"
          >
            Free shipping on orders over ₦200,000
          </span>
        ))}
      </div>
    </div>
  );
}
