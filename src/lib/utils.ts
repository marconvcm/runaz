export function shuffle (input) {
  var j, x, i;
  for (i = input.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = input[i]; 
    input[i] = input[j]; 
    input[j] = x;
  }
  return input;
}

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
        }`.trim();

      css += template;
    }
  }

  return css;
}
