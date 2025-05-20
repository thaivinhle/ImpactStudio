const scroller = document.querySelector(".scroller");
const scrollerInner = document.querySelector(".scroller__inner");
let wrappers = Array.from(document.querySelectorAll(".image-wrapper"));

const itemWidth = wrappers[0].offsetWidth + 16; // image + 1rem gap
let currentIndex = 0;

// Clone all original items and append to end
wrappers.forEach((item) => {
  const clone = item.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  scrollerInner.appendChild(clone);
});

// Refresh the wrapper list to include clones
wrappers = document.querySelectorAll(".image-wrapper");

function slideImages() {
  currentIndex++;
  scrollerInner.style.transition = "transform 0.5s ease";
  scrollerInner.style.transform = `translateX(-${itemWidth * currentIndex}px)`;

  // If we've reached the end of the *clones*, reset to start
  if (currentIndex === wrappers.length / 2) {
    setTimeout(() => {
      scrollerInner.style.transition = "none";
      scrollerInner.style.transform = "translateX(0)";
      currentIndex = 0;
    }, 500); // Wait for animation to finish
  }
}

// Start auto-scroll
let autoScroll = setInterval(slideImages, 2000);

// Pause/resume on hover
scroller.addEventListener("mouseenter", () => clearInterval(autoScroll));
scroller.addEventListener("mouseleave", () => {
  autoScroll = setInterval(slideImages, 2000);
});

// Show second page on click
document.querySelectorAll(".image-wrapper img").forEach((img) => {
  img.addEventListener("click", () => {
    document.querySelector(".scroller").style.display = "none";
    document.getElementById("detail-page").classList.remove("hidden");
  });
});

// Go back
function goBack() {
  document.querySelector(".scroller").style.display = "block";
  document.getElementById("detail-page").classList.add("hidden");
}
