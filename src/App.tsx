import Leaflet from "leaflet";
import "leaflet-rastercoords";
import { useCallback, useEffect, useRef, useState } from "react";
import "./dnd.min.css";

const App = () => {
    const img = [7016, 4960];

    const [mapEl, setMapEl] = useState(null);

    useEffect(() => {
        if (mapEl !== null) {
            console.log(mapEl);
            const map = Leaflet.map("map", {
                crs: Leaflet.CRS.Simple,
            });

            const rc = new Leaflet.RasterCoords(map, img);
            map.setMaxZoom(rc.zoomLevel());
            map.setView(rc.unproject([img[0], img[1]]), 2);

            Leaflet.tileLayer("tiles/{z}/{x}/{y}.png", {
                noWrap: true,
                bounds: rc.getMaxBounds(),
                maxNativeZoom: rc.zoomLevel(),
            }).addTo(map);
            return () => {
                map.remove()
            }
        }

    }, [mapEl]);

    const measuredRef = useCallback((node) => {
        if (node !== null) {
            setMapEl(node);
        }
    }, []);

    return (
        <div>
            <h1>Baylok D</h1>
            <div id="map" ref={measuredRef} style={{ height: "80vh" }}></div>
        </div>
    );
};
export default App;
