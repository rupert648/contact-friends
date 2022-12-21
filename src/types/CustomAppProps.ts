import type { AppProps } from "next/app"

interface CustomAppProps extends Omit<AppProps, "Component">  {
    Component: AppProps["Component"] & { requireAuth: boolean}
}

export default CustomAppProps;