export const heading = (title: string) => {
  const heading = document.createElement("h3");
  heading.classList.add('heading-title')
  heading.innerText = title;
  return heading;
}