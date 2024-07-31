document.addEventListener('DOMContentLoaded', (event)=>{

    button_origin_color = window.getComputedStyle(document.getElementsByClassName('btn')[0]).backgroundColor;

});

    function hexToRgb(hex) {
        // Remove the hash at the start if it's there
        hex = hex.replace(/^#/, '');

        // Parse the hex color into its red, green, and blue components
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return { r: r, g: g, b: b };
    }

    function rgbToHex(r, g, b) {
        return '#' + 
            r.toString(16).padStart(2, '0') + 
            g.toString(16).padStart(2, '0') + 
            b.toString(16).padStart(2, '0');
    }

    function lightenColor(hex, percent) {
        let rgb = hexToRgb(hex);

        // Calculate the new values, ensuring they are within 0-255
        let r = Math.max(0, Math.min(255, Math.floor(rgb.r * (1 + percent / 100))));
        let g = Math.max(0, Math.min(255, Math.floor(rgb.g * (1 + percent / 100))));
        let b = Math.max(0, Math.min(255, Math.floor(rgb.b * (1 + percent / 100))));

        return rgbToHex(r, g, b);
    }

    function lightness_adjust(elem, percent) {
        const currentColor = window.getComputedStyle(elem).backgroundColor;
        const rgbMatch = currentColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        const hexColor = rgbMatch
            ? rgbToHex(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]))
            : currentColor;

        elem.style.backgroundColor = lightenColor(hexColor, percent);
    }

    function lighten(elem){
        elem.style.fontWeight='bold';
        console.log("lighten");
        lightness_adjust(elem, 20);
    }

    function darken(elem){
        console.log("darken");
        lightness_adjust(elem, -20);
    }
    function origin(elem){
        elem.style.fontWeight='normal';
        console.log("origin");
        elem.style.backgroundColor = button_origin_color;
    }




console.log("script successfully load!")