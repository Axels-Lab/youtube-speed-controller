function getVideoElement() {
    return document.querySelector("video");
}

function pollForVideo() {
    const video = getVideoElement();
    if (video) {
        console.log("Video element found!");
        setupControls(video);
    } else {
        console.log("Video not yet ready. Trying again...");
        setTimeout(pollForVideo, 500); // Try every 500ms
    }
}

pollForVideo();

function setupControls() {
    // Set up your controls here
    document.addEventListener("keydown", handleKeyPress);
}

function handleKeyPress(event) {
    const video = getVideoElement(); // Get the latest reference
    if (video) {
        switch (event.key) {
            case "+":
                updateYouTubeSpeedDisplay(video.playbackRate);
            case "=":
                if (video.playbackRate < 16) {
                    video.playbackRate = Math.min(video.playbackRate + 0.25, 16);
                    showSpeedFeedback(video.playbackRate);
                    updateYouTubeSpeedDisplay(video.playbackRate);
                }
                break;
            case "-":
            case "_":
                if (video.playbackRate > 0) {
                    video.playbackRate = Math.max(video.playbackRate - 0.25, 0);
                    showSpeedFeedback(video.playbackRate);
                    updateYouTubeSpeedDisplay(video.playbackRate);
                }
                break;
        }
    }
    function updateYouTubeSpeedDisplay(speed) {
        const settingsMenu = document.querySelector(".ytp-panel-menu");
        if (settingsMenu) {
            const playbackSpeedItem = Array.from(settingsMenu.children).find((item) =>
                item.innerText.includes("Playback speed")
            );
            if (playbackSpeedItem) {
                playbackSpeedItem.children[2].innerText = `${speed.toFixed(2)}`;
            }
        }
    }

    function showSpeedFeedback(speed) {
        // Create or update the speed feedback element
        let feedbackElement = document.getElementById("speed-feedback");

        if (!feedbackElement) {
            feedbackElement = document.createElement("div");
            feedbackElement.id = "speed-feedback";
            feedbackElement.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: rgba(255, 255, 255, 0.8);
                padding: 10px;
                border-radius: 5px;
                font-size: 16px;
                z-index: 99999;
            `;
            document.body.appendChild(feedbackElement);
        }

        feedbackElement.textContent = `Speed: ${speed.toFixed(2)}x`;
        feedbackElement.style.opacity = "1";

        // Hide the feedback after 2 seconds
        setTimeout(() => {
            feedbackElement.style.opacity = "0";
            setTimeout(() => feedbackElement.remove(), 1000); // Remove after fade-out
        }, 2000);
    }
}
