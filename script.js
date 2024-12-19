const totalBlocks = 500; // Number of blocks in the grid
    const grid = document.getElementById("progress-grid");

    // Initialize the grid
    for (let i = 0; i < totalBlocks; i++) {
      const block = document.createElement("div");
      grid.appendChild(block);
    }

    // Function to display countdown
    function countdown() {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const totalDuration = endOfDay - startOfDay;
      const elapsed = now - startOfDay;
      const remaining = endOfDay - now;

      // Fill the grid based on elapsed time
      const filledBlocks = Math.floor((elapsed / totalDuration) * totalBlocks);
      const blocks = document.querySelectorAll(".grid div");
      blocks.forEach((block, index) => {
        if (index < filledBlocks) {
          block.classList.add("filled");
        } else {
          block.classList.remove("filled");
        }
      });

      if (remaining <= 0) {
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      const milliseconds = Math.floor((remaining % 1000));

      document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
      document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
      document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
      document.getElementById("milliseconds").textContent = milliseconds.toString().padStart(2, "0");
    }

    // Function to get and display greeting
    function displayGreeting() {
      let userName = localStorage.getItem("userName");
      if (!userName) {
        userName = prompt("Please enter your name:");
        if (userName) {
          localStorage.setItem("userName", userName);
        }
      }

      const now = new Date();
      const hours = now.getHours();
      let greeting = "";

      if (hours >= 5 && hours < 12) {
        greeting = `Good Morning, ${userName}!`;
      } else if (hours >= 12 && hours < 17) {
        greeting = `Good Afternoon, ${userName}!`;
      } else if (hours >= 17 && hours < 21) {
        greeting = `Good Evening, ${userName}!`;
      } else {
        greeting = `It's time to sleep, ${userName}!`;
      }

      document.getElementById("greeting-display").textContent = greeting;
    }

    // Show greeting on page load
    displayGreeting();

    // Update greeting at midnight
    setInterval(displayGreeting, 1000 * 60 * 60);

    const timer = setInterval(countdown, 100);