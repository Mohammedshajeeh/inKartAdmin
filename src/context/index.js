import { createContext, useContext, useEffect, useState } from "react";
import { useWindowDimensions, Dimensions as RNDimensions } from "react-native";

export const DimensionContext = createContext();
export const useDimensionContext = () => useContext(DimensionContext);

export const DimensionContextProvider = ({ children }) => {
    const dimension = useWindowDimensions();
    const initHeight = RNDimensions.get('window').height;
    const initWidth = RNDimensions.get('window').width;

    const [windowWidth, setWindowWidth] = useState(initWidth);
    const [windowHeight, setWindowHeight] = useState(initHeight);

    useEffect(() => {
        const { height, width } = dimension;
        setWindowHeight(height);
        setWindowWidth(width);
    }, [dimension]);

    return (
        <DimensionContext.Provider value={{ windowHeight, windowWidth }}>
            {children}
        </DimensionContext.Provider>
    );
};
