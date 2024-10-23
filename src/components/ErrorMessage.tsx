import { PropsWithChildren } from "react";


function ErrorMessage({children}: PropsWithChildren) {
    return (
        <p className="bg-red-400 text-center text-white p-2 ounded font-bold">{children}</p>
    )
}

export default ErrorMessage