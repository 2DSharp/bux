import {createRef} from "react";

export const useFocus = () => {
    const htmlElRef = createRef()
    const setFocus = () => {
        console.log(htmlElRef.current)
        htmlElRef.current && htmlElRef.current.focus()
    }
    return [htmlElRef, setFocus]
}
// Usage: const [inputRef, setInputFocus] = useFocus();