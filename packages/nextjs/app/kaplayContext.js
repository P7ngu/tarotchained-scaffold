//creates a context everywhere that you can pass as a parameter
import kaplay from "kaplay";

export default function initKaplay() {
    return kaplay({
        width: 2560,
        height: 1440,
        letterbox: true,
        global: false, 
        debug: true, //TODO: rimettere false in production
        debugKey: "Meta + U", // Meta = Cmd su Mac
        pixelDensity: devicePixelRatio,
    });
}