export function makeSymbolScatterSvg(
  symbolHref: string,
  opts: {
    idPrefix?: string
    viewBox?: { w: number; h: number }
    symbolSize?: { w: number; h: number } // реальный размер исходника (по умолчанию 100x100)
    tintColor?: string // цвет «тинта» слоя
    gradStops?: [string, string] // градиент центра и края
  } = {}
): string {
  const {
    idPrefix = `sym${Math.random().toString(36).slice(2, 8)}`,
    viewBox = { w: 420, h: 420 },
    symbolSize = { w: 100, h: 100 },
    tintColor = "#470c47",
    gradStops = ["#ae6cae", "#844784"],
  } = opts

  const ids = {
    grad: `${idPrefix}-grad`,
    filt: `${idPrefix}-tint`,
    group: `${idPrefix}-group`,
    img: `${idPrefix}-img`,
  }

  const placements = [
    { o: 0.212890625, tx: 140.5761, ty: 50, s: 0.3 },
    { o: 0.212890625, tx: 249.465, ty: 50, s: 0.3 },
    { o: 0.223865327, tx: 291.8539, ty: 150, s: 0.3 },
    { o: 0.223865327, tx: 98.1872, ty: 150, s: 0.3 },
    { o: 0.221633185, tx: 276.2551, ty: 250, s: 0.277 },
    { o: 0.123046875, tx: 196.144, ty: 270, s: 0.277 },
    { o: 0.221633185, tx: 116.0329, ty: 250, s: 0.277 },
    { o: 0.189569382, tx: 355.0988, ty: 120, s: 0.2247 },
    { o: 0.260904948, tx: 292.0988, ty: 80, s: 0.2247 },
    { o: 0.146437872, tx: 334.0988, ty: 30, s: 0.2247 },
    { o: 0.153087798, tx: 198.7654, ty: 10, s: 0.2247 },
    { o: 0.145321801, tx: 63.4321, ty: 30, s: 0.2247 },
    { o: 0.260904948, tx: 105.4321, ty: 80, s: 0.2247 },
    { o: 0.165899368, tx: 42.4321, ty: 120, s: 0.2247 },
    { o: 0.165899368, tx: 72.7654, ty: 220, s: 0.2247 },
    { o: 0.10500372, tx: 49.4321, ty: 300, s: 0.2247 },
    { o: 0.10500372, tx: 344.2099, ty: 300, s: 0.2247 },
    { o: 0.152669271, tx: 337.2099, ty: 220, s: 0.2247 },
  ]

  const uses = placements
    .map(
      p => `
      <g opacity="${p.o}" transform="translate(${p.tx}, ${p.ty})">
        <use href="#${ids.img}" xlink:href="#${ids.img}" transform="scale(${p.s})"></use>
      </g>`
    )
    .join("")

  return `
<svg width="100%" height="100%" viewBox="0 0 ${viewBox.w} ${viewBox.h}" version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="${ids.grad}" cx="50%" cy="50%" fx="50%" fy="50%" r="69.65%"
      gradientTransform="translate(0.5 0.5) scale(0.6667 1) rotate(90) translate(-0.5 -0.5)">
      <stop stop-color="${gradStops[0]}" offset="0%"></stop>
      <stop stop-color="${gradStops[1]}" offset="100%"></stop>
    </radialGradient>

    <filter id="${ids.filt}" color-interpolation-filters="sRGB">
      <feFlood flood-color="${tintColor}"></feFlood>
      <feComposite in2="SourceGraphic" operator="in"></feComposite>
    </filter>

    <g id="${ids.group}" transform="translate(-40) scale(1.2 1.2)">
      ${uses}
    </g>

    <image id="${ids.img}" x="0" y="0" width="${symbolSize.w}" height="${symbolSize.h}"
           href="${symbolHref}" xlink:href="${symbolHref}"></image>
  </defs>

  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <rect x="0" y="0" width="${viewBox.w}" height="${viewBox.h}" fill="url(#${ids.grad})"></rect>
    <use href="#${ids.group}" xlink:href="#${ids.group}" filter="url(#${ids.filt})"></use>
  </g>
</svg>`.trim()
}
