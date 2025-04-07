export function initCopyAnimation() {
  const emailLink = document.getElementById("email-link");
  const phoneLink = document.getElementById("phone-link");

  function animateCopyMessage(element, originalText) {
    const copiedText = element.classList.contains("email")
      ? "Email copied!"
      : "Phone number copied!";

    // Create a wrapper div if it doesn't exist
    let wrapper = element.parentElement;
    if (!wrapper.classList.contains("copy-wrapper")) {
      wrapper = document.createElement("div");
      wrapper.classList.add("copy-wrapper");
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
    }

    // Create or update the message element
    let messageElement = wrapper.querySelector(".copy-message");
    if (!messageElement) {
      messageElement = document.createElement("div");
      messageElement.classList.add("copy-message");
      wrapper.appendChild(messageElement);
    }

    // Set the message text
    messageElement.textContent = copiedText;

    // Animate the message
    gsap.to(messageElement, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "back.out(1.7)",
    });

    // Reset animation after a delay
    gsap.delayedCall(2, () => {
      gsap.to(messageElement, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
      });
    });
  }

  function setupLinkAnimation(element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const textToCopy = element.classList.contains("email")
        ? element.getAttribute("href").replace("mailto:", "")
        : element.textContent;

      navigator.clipboard.writeText(textToCopy);
      animateCopyMessage(element, element.textContent);
    });
  }

  if (emailLink) {
    emailLink.classList.add("email");
    setupLinkAnimation(emailLink);
  }

  if (phoneLink) {
    phoneLink.classList.add("phone");
    setupLinkAnimation(phoneLink);
  }
}
