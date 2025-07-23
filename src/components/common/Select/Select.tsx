import { FC, useEffect, useRef, useState } from "react"
import { ISelectProps } from "./Select.d"
import clsx from "classnames"
import styles from "./Select.module.scss"
import unionIcon from "@/static/icons/union.svg"
import expandIcon from "@/static/icons/expand_all.svg"
import Icon from "../Icon/Icon"

export const Select: FC<ISelectProps> = ({
  options,
  placeholder,
  value,
  className,
  onChange,
  defaultValue,
}) => {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(
    value || defaultValue || ""
  )
  const selectRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find(opt => opt.value === internalValue)

  const handleSelect = (selected: string) => {
    setInternalValue(selected)
    onChange(selected)
    setOpen(false)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener("mousedown", handler)
    return () => window.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    setInternalValue(value || defaultValue || "")
  }, [value, defaultValue])

  return (
    <div
      ref={selectRef}
      className={clsx(styles.wrapper, className)}
      onClick={() => setOpen(o => !o)}
      onBlur={() => setOpen(false)}
    >
      <div
        className={clsx(styles.select, {
          [styles.selectOpen]: open,
        })}
      >
        <span
          className={clsx(styles.selected, {
            [styles.placeholder]: !selectedOption,
          })}
        >
          {selectedOption?.label || placeholder}
        </span>

        <Icon src={expandIcon} className={clsx(styles.arrow)} />
      </div>
      {open && (
        <div className={styles.dropdown}>
          {options.length === 0 && (
            <div className={styles.noOptions}>Нет опций</div>
          )}
          {options.map(opt => (
            <div
              key={opt.value}
              className={clsx(
                styles.option,
                internalValue === opt.value && styles.optionSelected
              )}
              onClick={e => {
                e.stopPropagation()
                handleSelect(opt.value)
              }}
            >
              {opt.label}
              {internalValue === opt.value && (
                <Icon src={unionIcon} className={styles.unionIcon}></Icon>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
