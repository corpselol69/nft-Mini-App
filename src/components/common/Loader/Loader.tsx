import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"

interface LoaderProps {
  size?: "small" | "default" | "large"
}

export const Loader = ({ size = "default" }: LoaderProps) => {
  return <Spin indicator={<LoadingOutlined spin />} size={size} />
}
