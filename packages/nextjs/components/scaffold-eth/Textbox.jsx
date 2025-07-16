import { isTextBowVisibleAtom, textBoxContentAtom } from "~~/app/store/store.js";
import { useAtomValue, useAtom } from "jotai";
import "~~/styles/textbox.css"
import { useEffect, useState } from "react";
import {motion, scale} from "framer-motion";

const variants = {
    open : {opacity: 1, scale: 1},
    closed: { opacity: 0, scale: 0.5},
};

export default function TextBox(){
    const [isVisible, setIsVisible] = useAtom(isTextBowVisibleAtom)
    const content = useAtomValue(textBoxContentAtom);

    const [isCloseRequest, setIsCloseRequest] = useState(false);

    const handleAnimationComplete = () => {
        if (isCloseRequest) {
            setIsVisible(false);
            setIsCloseRequest(false);
        }
    }

    useEffect(() => {
        const closeHandler = (e) => {
            if (!isVisible) return;
            if(e.code === "Space"){
                setIsCloseRequest(true)
            }
        };

        window.addEventListener("keydown", closeHandler);

        return () => {
            window.removeEventListener("keydown", closeHandler);
        }
    }, [isVisible]);

    return (
        isVisible && (
        <>
          <motion.img
            className="speaker-img"
            src="/omino.png"
            alt="Speaker"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isCloseRequest ? "closed" : "open"}
            variants={variants}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="text-box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isCloseRequest ? "closed" : "open"}
            variants={variants}
            transition={{ duration: 0.2 }}
            onAnimationComplete={handleAnimationComplete}
          >
            <p>{content}</p>
          </motion.div>
        </>
        )
    );
}
