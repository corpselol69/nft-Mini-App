import pako from "pako"
import { useEffect, useState } from "react"
import Lottie from "lottie-react"

export default function StickerAnimation({ file }: { file: string }) {
  const [anim, setAnim] = useState(null)

  useEffect(() => {
    fetch(file)
      .then(res => res.arrayBuffer())
      .then(buf => {
        const jsonStr = pako.inflate(new Uint8Array(buf), { to: "string" })
        setAnim(JSON.parse(jsonStr))
      })
  }, [file])

  return anim ? <Lottie animationData={anim} loop={false} autoplay /> : null
}
