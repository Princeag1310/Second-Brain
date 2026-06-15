import type { ReactElement } from "react";

interface ButtonProps{
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: ()=> void;
    fullWidth?: boolean;
    loading?: boolean;

}

const variantClasses = {
    "primary": "bg-blue-700 text-white",
    "secondary": "bg-blue-200 text-blue-700"
};
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center cursor-pointer"

export function Button({variant, text, startIcon, onClick, fullWidth, loading}: ButtonProps){
    return <button onClick = {onClick} className = {variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? " opacity-45" : ""}`} disabled = {loading}>
        <div className = "pr-2">
            {startIcon}
        </div>
        {text}

    </button>
}