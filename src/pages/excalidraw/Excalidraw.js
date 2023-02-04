import { useState, useEffect } from "react";
import Header from '../../common/header/Header';
import "excalidraw/dist/excalidraw.min.css";

import { useSearchParams, useNavigate } from "react-router-dom";

export default function Excalidraw2(props) {
    const [Comp, setComp] = useState(null);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [iframeUrl, setIframeUrl] = useState('https://draw.sieloapp.com/editor-app');
    // const [iframeUrl, setIframeUrl] = useState('http://localhost:3000/');
    async function copySessionUrlToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text || "");
        } catch (err) {
            console.error('Async: Could not copy text: ', err);
        }
        // navigator.clipboard.writeText(text).then(function() {
        //   console.log('Async: Copying to clipboard was successful!');
        // }, function(err) {
        //   console.error('Async: Could not copy text: ', err);
        // });
    }

    const probablySupportsClipboardWriteText =
        "clipboard" in navigator && "writeText" in navigator.clipboard;

    const copyTextViaExecCommand = (text) => {
        const isRTL = document.documentElement.getAttribute("dir") === "rtl";

        const textarea = document.createElement("textarea");

        textarea.style.border = "0";
        textarea.style.padding = "0";
        textarea.style.margin = "0";
        textarea.style.position = "absolute";
        textarea.style[isRTL ? "right" : "left"] = "-9999px";
        const yPosition = window.pageYOffset || document.documentElement.scrollTop;
        textarea.style.top = `${yPosition}px`;
        // Prevent zooming on iOS
        textarea.style.fontSize = "12pt";

        textarea.setAttribute("readonly", "");
        textarea.value = text;

        document.body.appendChild(textarea);

        let success = false;

        try {
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            success = document.execCommand("copy");
        } catch (error) {
            console.error(error);
        }

        textarea.remove();

        return success;
    };
    const copyTextToSystemClipboard = async (text) => {
        let copied = false;
        if (probablySupportsClipboardWriteText) {
            try {
                // NOTE: doesn't work on FF on non-HTTPS domains, or when document
                // not focused
                await navigator.clipboard.writeText(text || "");
                copied = true;
            } catch (error) {
                console.error(error);
            }
        }

        // Note that execCommand doesn't allow copying empty strings, so if we're
        // clearing clipboard using this API, we must copy at least an empty char
        if (!copied && !copyTextViaExecCommand(text || " ")) {
            throw new Error("couldn't copy");
        }
    };

    useEffect(() => {
        console.log(searchParams.get('room'));
        const storageData=localStorage.getItem('draw_anything_app');
        const token=JSON.parse(storageData || '{}').token || '';
        console.log(storageData);
        const iframe = document.querySelector("iframe");
        iframe.contentWindow.postMessage({token,type:'token'},'*');
        // setSessionId('room=',searchParams.get('room'));
        if (searchParams.get('room')) {
            setIframeUrl('https://draw.sieloapp.com/editor-app' + '#room=' + searchParams.get('room'));
            // setIframeUrl('http://localhost:3000/' + '#room=' + searchParams.get('room'));

        }
        const handler = async (ev) => {
            if (typeof ev.data === 'object' && ev.data.message === 'excalidraw') {
                console.log(ev.data.link);//https://draw.sieloapp.com/#room=ca61ccfedbdfb9bcde54,dfc0VFmVKtNnIGC3BU6_7A
                if (ev.data.link.includes('room')) {
                    await copyTextToSystemClipboard('https://draw.sieloapp.com/#/draw' + '?room=' + ev.data.link.split("room=")[1]);
                    navigate({
                        pathname: '/draw',
                        search: '?' + 'room=' + ev.data.link.split("room=")[1]
                    })

                    // // setTimeout(()=>{
                    setIframeUrl('https://draw.sieloapp.com/editor-app' + '#room=' + ev.data.link.split("room=")[1])
                    // },2000)
                }

            }
            return;
            // if (typeof ev.data !== 'object') return
            // if (!ev.data.type) return
            // if (ev.data.type !== 'button-click') return
            // if (!ev.data.message) return

            // setMessage(ev.data.message)
        }

        window.addEventListener('message', handler)
        //   document.getElementsByClassName('RoomDialog-link').addEventListener('click',()=>{
        //     console.log('Hiiii')
        //   })

        // Don't forget to remove addEventListener
        return () => window.removeEventListener('message', handler)
    }, [])

    // const onChange = (elements, state) => {
    //     console.log("Elements :", elements, "State : ", state);
    // };

    // const onUsernameChange = username => {
    //     console.log("current username", username);
    // };
    // const [dimensions, setDimensions] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight
    // });

    // const onResize = () => {
    //     setDimensions({
    //         width: window.innerWidth,
    //         height: window.innerHeight
    //     });
    // };
    // const { width, height } = dimensions;
    // const options = { zenModeEnabled: true, viewBackgroundColor: "#b2dfdb" };

    // useEffect(() => {
    //     import("@excalidraw/excalidraw").then((comp) => setComp(comp.Excalidraw));
    // }, []);



    return <>
        <Header notificationArr={[]}></Header>
        <div className="excalidraw-component p-4">
            {/* {Comp && <Comp />}
            <Excalidraw
                width={width}
                height={height}
                onResize={onResize}
                initialData={InitialData}
                onChange={onChange}
                user={{ name: "Excalidraw User" }}
                onUsernameChange={onUsernameChange}
                options={options}
            >
            </Excalidraw> */}
            <iframe id="myFrame" src={iframeUrl} allow="clipboard-read self full" height="100%" width="100%" className="excalidraw-container" title="Iframe Example"></iframe>
        </div>
    </>
}