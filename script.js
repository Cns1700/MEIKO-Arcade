// Wait for the HTML structure to fully boot up in the browser
document.addEventListener("DOMContentLoaded", () => {

    // --- 🎵 Track Selection Logic Hub ---
    const trackRows = document.querySelectorAll(".track-row");
    const artworkPlaceholder = document.querySelector(".artwork-placeholder");
    const imageViewport = document.querySelector(".image-viewport");

    // Pre-mapping track data details for easy data-binding swaps
    const trackDatabase = {
        "01": {
            title: "Nostalogic",
            imageSrc: "MEIKO-images/nostalogic_cover.jpg",
            altText: "MEIKO Nostalogic Module Art"
        },
        "02": {
            title: "Piano×Forte×Scandal",
            imageSrc: "MEIKO-images/pianoforte_cover.jpg",
            altText: "MEIKO Phantom Thief Module Art"
        },
        "03": {
            title: "Change me",
            imageSrc: "MEIKO-images/changeme_cover.jpg",
            altText: "MEIKO Module Art"
        }
    };

    // Shared function to cleanly inject images with proper fluid sizing constraints
    const switchArcadeTrack = (trackNum) => {
        const activeTrack = trackDatabase[trackNum];
        
        if (activeTrack) {
            // Flash the screen container quickly to simulate an arcade monitor loading state ⚡
            imageViewport.style.opacity = "0.3";
            
            setTimeout(() => {
                // Update content string inside the placeholder box slot with forced absolute sizing
                artworkPlaceholder.innerHTML = `
                    <img src="${activeTrack.imageSrc}" 
                         alt="${activeTrack.altText}" 
                         style="width: 100%; height: 100%; object-fit: cover; display: block; animation: fadeIn 0.3s ease;">
                `;
                imageViewport.style.opacity = "1";
            }, 150);
        }
    };

    // Bind click events to all the track rows
    trackRows.forEach(row => {
        row.addEventListener("click", () => {
            // 1. Clear out old active selector states
            trackRows.forEach(r => r.classList.remove("active"));
            
            // 2. Snap active styling focus to the row that was just clicked
            row.classList.add("active");

            // 3. Extract the track index number to reference our asset mapping
            const trackNum = row.querySelector(".track-number").textContent;
            switchArcadeTrack(trackNum);
        });
    });

    // --- 🔴 Rhythm Controller Node Interactivity ---
    const arcadeButtons = document.querySelectorAll(".arcade-btn-node");

    arcadeButtons.forEach(button => {
        button.addEventListener("mousedown", () => {
            // Simulate a physical deep button sink
            button.style.transform = "scale(0.9) translateY(2px)";
        });

        button.addEventListener("mouseup", () => {
            // Instantly snap back up on finger release
            button.style.transform = "scale(1) translateY(0)";
        });

        button.addEventListener("mouseleave", () => {
            // Backup boundary trigger in case mouse glides off compressed state
            button.style.transform = "scale(1) translateY(0)";
        });
    });

    // --- 🚀 AUTOMATIC INITIAL LOAD TRIGGER ---
    // Instantly loads track 01's cover art using our clean image rendering logic!
    const defaultActiveRow = document.querySelector(".track-row.active");
    if (defaultActiveRow) {
        const defaultTrackNum = defaultActiveRow.querySelector(".track-number").textContent;
        switchArcadeTrack(defaultTrackNum);
    }
});