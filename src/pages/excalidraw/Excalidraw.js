import { useState, useEffect } from "react";
import Header from '../../common/header/Header';
export default function Excalidraw(props) {
    const [Comp, setComp] = useState(null);
    useEffect(() => {
        import("@excalidraw/excalidraw").then((comp) => setComp(comp.Excalidraw));
    }, []);

    return <>
    <Header notificationArr={[]}></Header>
    <div className="excalidraw-component">
     {Comp && <Comp />}
    </div>
    </>
}