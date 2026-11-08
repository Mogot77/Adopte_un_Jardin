/** Illustration du haut de page : soleil, collines et jeunes pousses (couleurs du thème, donc claire et sombre). */
const GardenArt = () => (
  <svg viewBox="0 0 360 260" role="img" aria-label="Un potager au soleil" className="h-auto w-full max-w-sm">
    <circle cx="285" cy="62" r="30" className="fill-warn-soft" />
    <circle cx="285" cy="62" r="18" className="fill-warn" />
    <path d="M0 190 C60 150 120 160 180 180 S300 170 360 150 V260 H0Z" className="fill-brand-soft" />
    <path d="M0 215 C80 185 150 205 220 200 S320 190 360 200 V260 H0Z" className="fill-brand-line" />
    <g className="stroke-brand" strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M70 240 V205" /><path d="M150 244 V196" /><path d="M230 240 V200" /><path d="M300 244 V210" />
    </g>
    <g className="fill-brand">
      <path d="M70 212 C70 196 56 190 44 192 C44 206 54 214 70 212Z" /><path d="M70 220 C70 206 82 200 94 202 C94 214 84 222 70 220Z" />
      <path d="M150 204 C150 186 134 178 118 182 C118 198 132 208 150 204Z" /><path d="M150 214 C150 198 166 192 180 196 C180 210 166 218 150 214Z" />
      <path d="M230 208 C230 194 218 188 206 190 C206 204 216 212 230 208Z" /><path d="M230 218 C230 204 242 198 254 200 C254 212 244 220 230 218Z" />
      <path d="M300 218 C300 206 290 200 280 202 C280 214 288 220 300 218Z" /><path d="M300 226 C300 214 310 210 320 212 C320 222 312 228 300 226Z" />
    </g>
    <circle cx="52" cy="120" r="5" className="fill-warn" /><circle cx="64" cy="108" r="4" className="fill-brand" /><circle cx="40" cy="104" r="3" className="fill-brand-line" />
  </svg>
)

export default GardenArt
