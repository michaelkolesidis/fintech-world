export default function styledLog(
  text,
  color = "rgb(0, 0, 0)",
  background,
  size = "12px",
  weight = "600"
) {
  // Style
  const style = [
    `color: ${color}`,
    `background: ${background}`,
    `font-size: ${size}; font-weight: ${weight}; `,
  ].join(";");

  // Output
  console.log(`%c${text}`, style);
}
