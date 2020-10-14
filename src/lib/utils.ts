
function generateSprites() {

    let css = "";

    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {

            const x = i * 32;
            const y = j * 32;

            const template = `
            .sprite-rune-${i}-${j} {
                background: url("runes.png") ${x}px -${y}px;
                width: 32px;
                height: 32px;
                display: inline-block;
            }`;

            css += template;
        }    
    }

    return css;
}

console.log(generateSprites());