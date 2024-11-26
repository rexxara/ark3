import { useCallback, useState } from "react"

export default function useBoolean(initValue?: boolean) {
    const [boolean, setBoolean] = useState<boolean>(initValue ?? false);
    const setTrue = useCallback(() => setBoolean(true), []);
    const setFalse = useCallback(() => setBoolean(false), []);
    return [boolean, setTrue, setFalse, setBoolean] as const;
}