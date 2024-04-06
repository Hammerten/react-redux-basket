import { MouseEventHandler } from "react";

export const ButtonVariant = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DANGER: "danger",
} as const;

type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];

const VARIANT_MAP: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]: "bg-blue-500 text-white",
  [ButtonVariant.SECONDARY]: "bg-gray-500 text-white",
  [ButtonVariant.DANGER]: "bg-red-500 text-white",
};

type ButtonComponentProps = {
  variant: ButtonVariant;
  children?: React.ReactNode;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function ButtonComponent(props: ButtonComponentProps) {
  const { children, variant, onClick } = props;

  return (
    <button
      className={`px-4 py-2 text-base rounded-md font-semibold ${VARIANT_MAP[variant]}`}
      onClick={onClick}
      type={props.type ?? "button"}
      disabled={props.disabled ?? false}
    >
      {children}
    </button>
  );
}
