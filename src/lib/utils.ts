
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


export function uniqueString(length = 6): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export const range = (n) => Array.from(Array(n).keys());

export const rnd = (min, max) => Math.round(Math.random() * (max - min) + min);

export const buildCard = () => `[${rnd(0, 10)},${rnd(0, 10)},${rnd(0, 10)},${rnd(0, 10)}]`;

export const buildDeck = (amount = 10) => range(amount).map (() => buildCard());
