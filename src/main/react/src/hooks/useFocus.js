import {useRef} from "react";

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus()
    }
    return [htmlElRef, setFocus]
}
// Usage: const [inputRef, setInputFocus] = useFocus();