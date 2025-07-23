import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { LoaderProps } from "./Loader.d"

export const Loader = ({ size = "default" }: LoaderProps) => {
  return <Spin indicator={<LoadingOutlined spin />} size={size} />
}
