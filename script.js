// Wait for the HTML structure to fully boot up in the browser
document.addEventListener("DOMContentLoaded", () => {

    // --- 🎵 Track Selection Logic Hub ---
    const trackRows = document.querySelectorAll(".track-row");
    const artworkPlaceholder = document.querySelector(".artwork-placeholder");
    const imageViewport = document.querySelector(".image-viewport");
    const difficultyChips = document.querySelectorAll(".difficulty");

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
            imageViewport.style.opacity = "0.3";
            
            setTimeout(() => {
                artworkPlaceholder.innerHTML = `
                    <img src="${activeTrack.imageSrc}" 
                         alt="${activeTrack.altText}">
                `;
                imageViewport.style.opacity = "1";
            }, 150);
        }
    };

    // Bind click events to all the track rows for song switching
    trackRows.forEach(row => {
        row.addEventListener("click", (e) => {
            // Stop track change trigger if clicking on a difficulty badge inside the row
            if (e.target.classList.contains("difficulty")) return;

            // 1. Clear out old active selector states for rows
            trackRows.forEach(r => r.classList.remove("active"));
            row.classList.add("active");

            // 🌟 FIX: Instantly wipe out all active difficulty flashes across all tracks when switching rows!
            difficultyChips.forEach(c => c.classList.remove("flashing-active"));

            const trackNum = row.querySelector(".track-number").textContent;
            switchArcadeTrack(trackNum);
        });
    });

    // --- 🎯 Persistent Difficulty Selection Engine ---
    difficultyChips.forEach(chip => {
        chip.addEventListener("click", () => {
            // Find the track row this difficulty belongs to
            const parentRow = chip.closest(".track-row");
            
            // BOUNDARY CHECK: Only allow difficulty updates if this specific row is selected/active
            if (!parentRow.classList.contains("active")) return;
            
            // Clear flashing classes ONLY from the difficulty chips inside this specific active track row
            const siblingChips = parentRow.querySelectorAll(".difficulty");
            siblingChips.forEach(c => c.classList.remove("flashing-active"));
            
            // Add continuous loop toggle onto the clicked button
            chip.classList.add("flashing-active");
        });
    });

    // --- 🔴 Rhythm Controller Node Interactivity ---
    const arcadeButtons = document.querySelectorAll(".arcade-btn-node");

    arcadeButtons.forEach(button => {
        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.9) translateY(2px)";
        });
        button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1) translateY(0)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1) translateY(0)";
        });
    });

    // --- 🚀 AUTOMATIC INITIAL LOAD TRIGGER ---
    const defaultActiveRow = document.querySelector(".track-row.active");
    if (defaultActiveRow) {
        const defaultTrackNum = defaultActiveRow.querySelector(".track-number").textContent;
        switchArcadeTrack(defaultTrackNum);
    }
});