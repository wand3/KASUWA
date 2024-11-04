import useFlash from "../hooks/UseFlash";
import { FlashContextType } from "../context/FlashProvider";
import FlashContext from "../context/FlashProvider";
import { useContext } from "react";



export const FlashMessage = () => {
    const { flashMessage, hideFlash, visible } = useContext(FlashContext) as FlashContextType;
    // const { hideFlash, flashMessage, visible } = useContext(FlashContext);

    const baseStyles = "fixed top-0 right-0 p-4 rounded shadow-md text-white w-fit";

    const typeStyle: Record<string, string> = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
        info: "bg-blue-500"
    }

    // Determine the style based on the flash message type
    const alertType = flashMessage?.type || "info"; // Default to 'info' if type is missing

    return (
            visible && (
                <div className={`${baseStyles} ${typeStyle[alertType]}`}>
                    <div className="flex items-center justify-between">
                        <p className="text-black">{flashMessage.message}</p>
                        <button className="close" onClick={hideFlash}>&times;</button>
                    </div>
                </div>
            )
        );
          
}

export default FlashMessage;