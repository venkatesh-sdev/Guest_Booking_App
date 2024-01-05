export const colourStyles = {
    control: (styles) => ({
        ...styles,
        width: "100%",
        maxWidth: "14rem",
        minWidth: "12rem",
        borderRadius: "5px",
        color: "#fff",
        fontSize: "0.8rem",
        lineHeight: "1.75rem",
        backgroundColor: "#ffffff20",
        cursor: "pointer",
        border: "2px solid #000000",
        ":hover": {
            border: "2px solid #000000",
            boxShadow: "none",
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            color: "#fff",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
            width: "100%",
            background: "#373948",
            ":hover": {
                backgroundColor: "#ffffff20",
                cursor: "pointer",
            },
        };
    },
    menu: (styles) => {
        return {
            ...styles,
            backgroundColor: "#373948",
            maxWidth: "14rem",
            border: "2px solid #000000",
            borderRadius: "5px",
            
        };
    },

    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#000",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
        };
    },
    singleValue: (styles) => ({ ...styles,  color: '#fff' }),
};