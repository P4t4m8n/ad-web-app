import Link, { LinkProps } from "next/link";
import { JSX } from "react";

interface Props extends LinkProps {
  styleMode?:
    | "full"
    | "coloredBorder"
    | "whiteBorder"
    | "borderB"
    | "arrow"
    | "center"
    | "none";
  styleSize?: "small" | "medium" | "large" | "long" | "none";
  isHighLighted?: boolean;
  children?: React.ReactNode;
  className?: string;
  target?: "_blank";
}

export const STYLES = {
  full: {
    style:
      "bg-mainOrange-700 text-mainWhite-0 hover:bg-mainOrange-800 rounded-base flex justify-center items-center font-bold  font-bold leading-21",
    loading: "bg-mainOrange-800",
  },
  coloredBorder: {
    style:
      "bg-inherit border-2 border-mainOrange-700 text-mainOrange-700 hover:border-mainOrange-800 hover:text-mainOrange-800 rounded-base flex  justify-center items-center",
    loading: "shadow-mainOrange-600 text-mainOrange-600",
  },
  whiteBorder: {
    style:
      "border-2 bg-inherit border-mainWhite-0 text-mainWhite-0 hover:border-mainGray-300  hover:text-mainGray-300 rounded-base flex justify-center items-center  font-bold leading-21",
    loading: "shadow-mainGray-800 text-mainGray-800",
  },
  borderB: {
    style:
      "font-bold border-b-2 border-mainOrange-700 text-mainOrange-700 hover:text-mainOrange-800 hover:border-mainOrange-800 flex justify-center items-center ",
    loading: "border-mainOrange-600 text-mainOrange-600",
  },
  arrow: {
    style:
      "font-bold border-b-2 text-normal leading-21 border-mainGray-800 text-mainGray-800 hover:text-mainGray-700 hover:border-mainGray-700 flex items-center gap-1 w-fit",
    loading: "border-mainGray-800 text-mainGray-800",
  },
  center: {
    style: "flex justify-center items-center",
    loading: "",
  },
  none: {
    style: "",
    loading: "",
  },
} as const;

export const SIZES = {
  extraSmall: "h-8 w-48",
  small: "h-8 w-32",
  medium: "h-12 w-[18.25rem]",
  large: "h-12 md:w-60 w-[min(18rem,100%)]",
  long: "h-[2.625rem]  leading-21 max-w-[min(18rem,100%)] sm:max-w-[20rem] w-full ",
  none: "",
} as const;

/**
 * A custom Link component that applies various styles based on the provided props.
 * @param {
 * @param {string} [props.styleMode] - The style mode to apply. Defaults to "none".
 * @param {string} [props.styleSize] - The size style to apply. Defaults to "none".
 * @param {boolean} props.isHighLighted - Whether the link should be highlighted with bold text.
 * @param {React.ReactNode} props.children - The content to be displayed inside the link.
 * @param {string} props.className - Additional class names to apply to the link.} props - The props object.
 * @returns {JSX.Element} The styled Link component.
 */
export default function LinkCmp({
  styleMode = "none",
  styleSize = "none",
  isHighLighted,
  target,
  children,
  className,
  ...props
}: Props): JSX.Element {
  const style = ` ${STYLES[styleMode].style} ${SIZES[styleSize]} ${
    isHighLighted ? "font-bold" : ""
  } disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer sm:text-18 text-16 ${className}`;
  return (
    <Link aria-disabled {...props} className={style} target={target} >
      {children}
    </Link>
  );
}
