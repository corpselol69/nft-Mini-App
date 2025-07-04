import React, { useEffect, useState } from "react"
import { IIconProps } from "./Icon.d"
import styles from "./Icon.module.scss"

const Icon: React.FC<IIconProps> = ({
  src,
  color = "default",
  opacity,
  pathColor,
  ...rest
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetch(src)
      .then(response => {
        if (!response.ok)
          throw new Error(`Failed to load SVG: ${response.status}`)
        return response.text()
      })
      .then(text => {
        if (!isMounted) return

        let modifiedText = text

        if (pathColor) {
          modifiedText = modifiedText.replace(
            /<path([^>]*)\/?>/gi,
            (_, attrs) => {
              if (/fill=/.test(attrs)) {
                const newAttrs = attrs.replace(
                  /fill=('|")[^"']*\1/i,
                  `fill="${pathColor}"`
                )
                return `<path${newAttrs}/>`
              } else {
                return `<path${attrs} fill="${pathColor}"/>`
              }
            }
          )
        }

        if (opacity) {
          modifiedText = modifiedText.replace(
            /<path([^>]*?)\/?>/g,
            (_, attrs) => {
              if (/opacity=/.test(attrs)) {
                const newAttrs = attrs.replace(
                  /opacity="[^"]*"/,
                  `opacity="${opacity}"`
                )
                return `<path${newAttrs}/>`
              } else {
                return `<path${attrs} opacity="${opacity}"/>`
              }
            }
          )
        }

        setSvgContent(modifiedText)
      })
      .catch(err => console.error(err))

    return () => {
      isMounted = false
    }
  }, [src, opacity])

  return svgContent ? (
    <span
      className={`${styles.icon} ${styles[color]}`}
      {...rest}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  ) : null
}

export default Icon
