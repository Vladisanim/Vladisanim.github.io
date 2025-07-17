const gamePrefix = "TileMatchGame_";
runOnStartup(runtimeInstance => {
    runtime = runtimeInstance;
    if (runtime && runtime.assets) {
        console.log("Runtime hazır.");
    } else {
        console.warn("Runtime henüz hazır değil.");
        const interval = setInterval(() => {
            if (runtime && runtime.assets) {
                clearInterval(interval);
                console.log("Runtime hazır.");
            }
        }, 1000);
    }
});



let runtime;
let currentLevel = 1;

//TUTORIAL//


//TUTORIAL//


//GAMEMECHANICS//
async function save() {
    const tileInstances = runtime.objects.Tile.getAllInstances();

    if (tileInstances.length === 0) {
        console.log("No tiles found.");
        return;
    }

    const levelNumber = prompt("Enter level number:", "1");
    if (!levelNumber || isNaN(levelNumber)) {
        console.error("Invalid level number.");
        return;
    }

    const levelNum = parseInt(levelNumber, 10);
    const tiles = [];

    // Determine which tiles are free
    tileInstances.forEach(currentTile => {
        // Use Construct's collision engine to find overlapping tiles
        const overlappingTiles = tileInstances.filter(otherTile => {
            if (currentTile === otherTile) return false; // Skip itself
            return runtime.collisions.testOverlap(currentTile, otherTile); // Check overlap
        });

        // Find tiles with a higher Z-index among the overlapping tiles
        const blockingTiles = overlappingTiles.filter(
            otherTile => otherTile.zIndex > currentTile.zIndex
        );

        // Check if the current tile is free
        const isFree = blockingTiles.length === 0;

        // Push the result for the current tile
        tiles.push({
            x: currentTile.x,
            y: currentTile.y,
            z: currentTile.zIndex,
            isFree: isFree
        });

        // Debug: Log the current tile and its status
        console.log(
            `Tile at (${currentTile.x}, ${currentTile.y}, Z:${currentTile.zIndex}): Is Free = ${isFree}, ` +
            `Overlapping Tiles: ${overlappingTiles.map(t => `(${t.x}, ${t.y}, Z:${t.zIndex})`)}, ` +
            `Blocking Tiles: ${blockingTiles.map(t => `(${t.x}, ${t.y}, Z:${t.zIndex})`)}`
        );
    });

    // **Ensure the tile count is a multiple of 3**
    if (tiles.length % 3 !== 0) {
        console.error(`Invalid tile count! Found ${tiles.length} tiles. The count must be a multiple of 3.`);
        return;
    }

    // Assign colors logically for match-3 gameplay
    const tileTypes = ["blue", "red", "black", "white"];
    const shuffledTiles = [...tiles].sort(() => Math.random() - 0.5); // Shuffle to avoid patterns
    let currentIndex = 0;

    shuffledTiles.forEach((tile, index) => {
        if (index % 3 === 0) {
            // Every group of 3 gets a new type
            currentIndex = (currentIndex + 1) % tileTypes.length;
        }
        tile.type = tileTypes[currentIndex];
    });

    // Load existing levels file
    let existingData = { levels: [] };
    try {
        const response = await fetch("tilelevels.json");
        if (response.ok) {
            existingData = await response.json();

            // Ensure levels array exists
            if (!Array.isArray(existingData.levels)) {
                console.warn("Levels array was missing, creating a new one.");
                existingData = { levels: [] }; // Reset to proper format
            }
        }
    } catch (error) {
        console.log("No existing tilelevels.json found. Creating a new one.");
    }

    // Remove any old incorrect data outside "levels"
    existingData = { levels: existingData.levels };

    // Check if the level already exists
    const existingLevelIndex = existingData.levels.findIndex(l => l.level === levelNum);
    if (existingLevelIndex !== -1) {
        // Replace existing level
        existingData.levels[existingLevelIndex] = { level: levelNum, tiles };
    } else {
        // Add new level
        existingData.levels.push({ level: levelNum, tiles });
    }

    // Save updated level data
    const jsonStr = JSON.stringify(existingData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tilelevels.json"; // Always save as tilelevels.json
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`Level ${levelNum} saved successfully.`);
}
const collectTiles = [];
// Define available tile types for each level
const levelTileTypes = {
    1: ["tile1", "tile2", "tile3", "tile4"],
    2: ["tile1", "tile2", "tile3", "tile4", "tile5"],
	3: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	4: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	5: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	6: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	7: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	8: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	9: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	10: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7"],
	11: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	12: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	13: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	14: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	15: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	16: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	17: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	18: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	19: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	20: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7"],
	21: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	22: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	23: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	24: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	25: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6", "tile7"],
	26: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	27: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	28: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	29: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	30: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	31: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	32: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	33: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	50: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	60: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	70: ["tile1", "tile2", "tile3", "tile4", "tile5", "tile6"],
	41: ["tile1", "tile2", "tile3", "tile4", "tile5"],
	42: ["tile1", "tile2", "tile3", "tile4", "tile5"],
	44: ["tile1", "tile2", "tile3", "tile4", "tile5"],
	43: ["tile1", "tile2", "tile3", "tile4", "tile5"],
	45: ["tile1", "tile2", "tile3", "tile4", "tile5"],
	46: ["tile1", "tile2", "tile3", "tile4", "tile5"],
	47: ["tile1", "tile2", "tile3", "tile4", "tile5"]
	
	
};

// Default tile types if level config is not found
const defaultTileTypes = ["tile1", "tile2", "tile3", "tile4"];

async function loadLevel() {
    try {
        // Clear the collectTiles array for the new level
        collectTiles.length = 0;
        
        const currentLevel = parseInt(localStorage.getItem(`${gamePrefix}currentLevel`)) || 1;
        console.log('Current level:', currentLevel);
        
        runtime.globalVars.currentLevel = currentLevel;
        const response = await fetch("tilelevels.json");
        if (!response.ok) throw new Error("Failed to load level data.");
        const levelData = await response.json();
        if (!levelData.levels || !Array.isArray(levelData.levels)) {
            throw new Error(`Invalid level data format. Received: ${JSON.stringify(levelData)}`);
        }

        let level = levelData.levels.find(l => l.level === currentLevel);
        
        // If level not found, pick a random one
        if (!level) {
            console.log(`Level ${currentLevel} not found, selecting random level...`);
            const randomIndex = Math.floor(Math.random() * levelData.levels.length);
            level = levelData.levels[randomIndex];
            console.log(`Selected random level: ${level.level}`);
        }

        // Update the level text display
        const levelText = runtime.objects.spriteText.getAllInstances()
            .find(text => text.instVars.w === "gamelevel");
        if (levelText) {
            levelText.text = `Level ${level.level}`;
        }

        console.log(`Loading Level ${level.level}...`);
        runtime.objects.Tile.getAllInstances().forEach(tile => tile.destroy());

        // Get tile types for current level or use default
        const tileTypes = levelTileTypes[currentLevel] || defaultTileTypes;
        console.log(`Using tile types for level ${level.level}:`, tileTypes);

        // Create tiles first
        const createdTiles = level.tiles.map(tileData => {
            const tile = runtime.objects.Tile.createInstance(
                "Level",
                tileData.x,
                tileData.y
            );
            tile.moveToTop();
            tile.instVars.free = tileData.isFree;
            return { tile, isFree: tileData.isFree };
        });

        // Assign animations to tiles
        let currentTypeIndex = 0;
        const shuffledTiles = [...createdTiles].sort(() => Math.random() - 0.5);
        shuffledTiles.forEach((tileObj, index) => {
            if (index % 3 === 0) {
                // Every group of 3 gets a new type
                currentTypeIndex = (currentTypeIndex + 1) % tileTypes.length;
            }
            const type = tileTypes[currentTypeIndex];
            tileObj.tile.setAnimation(type);
            // Set animation frame based on whether the tile is free
            tileObj.tile.animationFrame = tileObj.isFree ? 0 : 1;
        });

        console.log(`Level ${level.level} loaded with tile types:`, tileTypes);
    } catch (error) {
        console.error("Error loading level:", error.message);
    }
}


function onTileTouched() {
    const touchedTile = runtime.objects.Tile.getFirstPickedInstance();
    if (touchedTile) {
        const isFree = touchedTile.instVars.free;
        if (isFree) {
            // Check if we've already reached the tile limit
            if (collectTiles.length >= 7) {
                return; // Don't allow more tiles to be added
            }
            
            const collectTileInstances = runtime.objects.CollectTile.getAllInstances();
            if (collectTileInstances.length === 0) return;
			
            const startX = collectTileInstances[0].x;
            const startY = collectTileInstances[0].y;
            const tileWidth = touchedTile.width;
            const padding = 0;
            const offset = -8;

            const tileType = touchedTile.animationName;
            let insertIndex = collectTiles.length;

            for (let i = collectTiles.length - 1; i >= 0; i--) {
                if (collectTiles[i].animationName === tileType) {
                    insertIndex = i + 1;
                    break;
                }
            }

            if (insertIndex > collectTiles.length) {
                insertIndex = collectTiles.length;
            }

            // Set movement end time for all affected tiles
            const movementDuration = 300; // 300ms for movement animation
            const currentTime = Date.now();

            // Move existing tiles
            for (let i = collectTiles.length - 1; i >= insertIndex; i--) {
                collectTiles[i + 1] = collectTiles[i];
                const newTargetX = startX + ((i + 1) * (tileWidth + padding + offset));
                runtime.callFunction("movetile", newTargetX, startY, collectTiles[i + 1].uid);
                collectTiles[i + 1].instVars.moveEndTime = currentTime + movementDuration;
            }

            // Insert and move new tile
            collectTiles[insertIndex] = touchedTile;
            const targetX = startX + (insertIndex * (tileWidth + padding + offset));
            runtime.callFunction("movetile", targetX, startY, touchedTile.uid);

            touchedTile.instVars.collect = true;
            touchedTile.instVars.w = insertIndex;
            touchedTile.instVars.moveEndTime = currentTime + movementDuration;

            console.log(
                "CollectTiles Grid:",
                collectTiles.map((tile, index) => ({
                    animation: tile.animationName,
                    index,
                }))
            );

            for (let i = 0; i < collectTiles.length; i++) {
                collectTiles[i].instVars.w = i;
            }

            // Wait for movement to complete before checking matches
            setTimeout(() => {
                if (touchedTile.instVars.collect) {
                    checkForMatches();
                }
            }, movementDuration + 50); // Add small buffer after movement
        }
    }
}

function checkForMatches() {
    if (collectTiles.length < 3) {
        if (collectTiles.length === 7) {
            let hasMatches = false;
            for (let i = 0; i <= collectTiles.length - 3; i++) {
                if (collectTiles[i].animationName === collectTiles[i + 1].animationName &&
                    collectTiles[i].animationName === collectTiles[i + 2].animationName) {
                    hasMatches = true;
                    break;
                }
            }
            if (!hasMatches) {
                runtime.callFunction("failgame");
                return;
            }
        }
        return;
    }
    
    const now = Date.now();
    const isAnyTileMoving = collectTiles.some(tile => 
        tile.instVars.moveEndTime && now < tile.instVars.moveEndTime
    );
    
    if (isAnyTileMoving) return;

    let matchFound = false;
    let matchedIndexes = [];

    for (let i = 0; i <= collectTiles.length - 3; i++) {
        if (collectTiles[i].animationName === collectTiles[i + 1].animationName &&
            collectTiles[i].animationName === collectTiles[i + 2].animationName) {
            matchedIndexes = [i, i + 1, i + 2];
            matchFound = true;
            break;
        }
    }

    if (matchFound) {
        runtime.callFunction("playAudio", "shine", 0, 10);
        
        // Check if the matched tiles are the type needed for the current task
        const matchedType = collectTiles[matchedIndexes[0]].animationName;
        const currentTask = JSON.parse(localStorage.getItem(`${gamePrefix}currentTask`));
        
        if (currentTask && matchedType === currentTask.tileType) {
            // Call addTask for each matched tile (3 times for a match)
            addTask();
            addTask();
            addTask();
        }

        matchedIndexes.forEach(index => {
            runtime.callFunction("removetile", collectTiles[index].uid);
        });

        const newTiles = collectTiles.filter((_, index) => !matchedIndexes.includes(index));
        collectTiles.length = 0;
        newTiles.forEach(tile => collectTiles.push(tile));
        
        setTimeout(updateTilePositions, 200);
        
        const remainingTiles = runtime.objects.Tile.getAllInstances()
            .filter(tile => !tile.instVars.collect);
        if (remainingTiles.length === 0) {
            console.log("Congratulations! You've won the game!");
            runtime.callFunction("levelcompleted");
        }
    } else if (collectTiles.length === 7) {
        runtime.callFunction("failgame");
    }
}

function updateTilePositions() {
    const collectTileInstances = runtime.objects.CollectTile.getAllInstances();
    if (collectTileInstances.length === 0) return;

    const startX = collectTileInstances[0].x;
    const startY = collectTileInstances[0].y;
    const tileWidth = 120;
    const padding = 2;
    const offset = -8;

    for (let i = 0; i < collectTiles.length; i++) {
        const tile = collectTiles[i];
        const targetX = startX + (i * (tileWidth + padding + offset));
        
        // Only move if tile isn't already at target position
        if (Math.abs(tile.x - targetX) > 1) {
            runtime.callFunction("movetile", targetX, startY, tile.uid);
            tile.instVars.w = i;
        }
    }
}
function rescanTiles() {
    const tileInstances = runtime.objects.Tile.getAllInstances();
    if (tileInstances.length === 0) return;
    
    tileInstances.forEach(currentTile => {
        if (currentTile.instVars.collect) return;
        
        // Check if tile touches any others with higher z-index
        const touchingHigherZ = tileInstances.some(otherTile => {
            if (currentTile === otherTile) return false;
            if (otherTile.instVars.collect) return false;
            return runtime.collisions.testOverlap(currentTile, otherTile) && 
                   otherTile.zIndex > currentTile.zIndex;
        });
        
        // A tile is free if it either doesn't touch any tiles
        // OR only touches tiles with lower z-index
        if (!touchingHigherZ) {
            currentTile.instVars.free = true;
            currentTile.animationFrame = 0;
        }
    });
}

function shuffleBooster() {
    const BOOSTER_COST = 2000;
    const currentGold = datainfo('gold');
    
    // Check if player has enough gold
    if (currentGold < BOOSTER_COST) {
        console.log("Not enough gold for shuffle booster!");
        return false;
    }

    // Get current level's tile types
    const currentLevel = parseInt(localStorage.getItem(`${gamePrefix}currentLevel`)) || 1;
    const tileTypes = levelTileTypes[currentLevel] || defaultTileTypes;

    // Get all tiles that are in play (not in collection area)
    const playableTiles = runtime.objects.Tile.getAllInstances()
        .filter(tile => !tile.instVars.collect);

    if (playableTiles.length === 0) {
        console.log("No tiles to shuffle!");
        return false;
    }

    // Deduct gold
    const newGold = currentGold - BOOSTER_COST;
    localStorage.setItem(`${gamePrefix}gold`, newGold.toString());

    // Play booster sound if available
    runtime.callFunction("playAudio", "sparkle", 0, 10);

    // Shuffle and reassign animations
    let currentTypeIndex = 0;
    const shuffledTiles = [...playableTiles].sort(() => Math.random() - 0.5);

    shuffledTiles.forEach((tile, index) => {
        if (index % 3 === 0) {
            // Every group of 3 gets a new type
            currentTypeIndex = (currentTypeIndex + 1) % tileTypes.length;
        }
        const type = tileTypes[currentTypeIndex];
        tile.setAnimation(type);
        // Maintain the current free/non-free state
        tile.animationFrame = tile.instVars.free ? 0 : 1;
    });

    // Rescan tiles to update free status
    rescanTiles();

    console.log("Shuffle booster used! New gold balance:", newGold);
    return true;
}

function autoMatchBooster() {
    const BOOSTER_COST = 2000;
    const currentGold = datainfo('gold');
    
    console.log("Starting autoMatchBooster. Current gold:", currentGold);

    // Check if player has enough gold
    if (currentGold < BOOSTER_COST) {
        console.log("Not enough gold for auto-match booster!");
        return false;
    }

    // Check if there are any tiles in the collection array
    if (collectTiles.length === 0) {
        console.log("No tiles in collection to match with!");
        return false;
    }

    // Get the last tile's type from collection
    const lastTile = collectTiles[collectTiles.length - 1];
    const targetType = lastTile.animationName;
    console.log("Looking for matches with type:", targetType);

    // Get ALL tiles of matching type, regardless of free status
    const matchableTiles = runtime.objects.Tile.getAllInstances().filter(tile => 
        !tile.instVars.collect && // Not already collected
        tile.animationName === targetType // Same type as last collected tile
    );

    // Calculate how many more tiles we need
    const sameTypeInCollection = collectTiles.filter(tile => 
        tile.animationName === targetType
    ).length;
    const tilesNeeded = 3 - sameTypeInCollection;

    console.log("Need", tilesNeeded, "more tiles of type", targetType);
    console.log("Found", matchableTiles.length, "available matching tiles");

    if (matchableTiles.length < tilesNeeded) {
        console.log("Not enough matching tiles available!");
        return false;
    }

    // Deduct gold
    const newGold = currentGold - BOOSTER_COST;
    localStorage.setItem(`${gamePrefix}gold`, newGold.toString());

    // Play booster sound
    runtime.callFunction("playAudio", "booster", 0, 10);

    // Randomly select the required number of tiles
    const selectedTiles = matchableTiles
        .sort(() => Math.random() - 0.5)
        .slice(0, tilesNeeded);

    // Process each selected tile with a delay
    selectedTiles.forEach((tile, index) => {
        setTimeout(() => {
            console.log(`Processing tile ${index + 1}/${selectedTiles.length}`);
            
            // Make the tile free regardless of its current state
            tile.instVars.free = true;
            tile.animationFrame = 0;  // Set frame to 0 to indicate it's free

            const collectTileInstances = runtime.objects.CollectTile.getAllInstances();
            if (collectTileInstances.length === 0) return;

            const startX = collectTileInstances[0].x;
            const startY = collectTileInstances[0].y;
            const tileWidth = tile.width;
            const padding = 0;
            const offset = -8;

            let insertIndex = collectTiles.length;
            for (let i = collectTiles.length - 1; i >= 0; i--) {
                if (collectTiles[i].animationName === tile.animationName) {
                    insertIndex = i + 1;
                    break;
                }
            }

            if (insertIndex > collectTiles.length) {
                insertIndex = collectTiles.length;
            }

            const movementDuration = 300;
            const currentTime = Date.now();

            for (let i = collectTiles.length - 1; i >= insertIndex; i--) {
                collectTiles[i + 1] = collectTiles[i];
                const newTargetX = startX + ((i + 1) * (tileWidth + padding + offset));
                runtime.callFunction("movetile", newTargetX, startY, collectTiles[i + 1].uid);
                collectTiles[i + 1].instVars.moveEndTime = currentTime + movementDuration;
            }

            collectTiles[insertIndex] = tile;
            const targetX = startX + (insertIndex * (tileWidth + padding + offset));
            runtime.callFunction("movetile", targetX, startY, tile.uid);
            tile.instVars.collect = true;
            tile.instVars.w = insertIndex;
            tile.instVars.moveEndTime = currentTime + movementDuration;

            for (let i = 0; i < collectTiles.length; i++) {
                collectTiles[i].instVars.w = i;
            }

            setTimeout(() => {
                if (tile.instVars.collect) {
                    checkForMatches();
                }
            }, movementDuration + 50);
        }, index * 200); // 200ms delay between each tile
    });

    return true;
}

// Array to track removed tiles for position calculation
// Array to track removed tiles for position calculation
const removedTilesArray = [];

function removeTilesBooster() {
    const BOOSTER_COST = 2000;
    const currentGold = datainfo('gold');
    
    console.log("Starting removeTilesBooster. Current gold:", currentGold);

    // Check if player has enough gold
    if (currentGold < BOOSTER_COST) {
        console.log("Not enough gold for remove tiles booster!");
        return false;
    }

    // Get set of removed tile UIDs for faster lookup
    const removedUIDs = new Set(removedTilesArray.map(tile => tile.uid));

    // Get all free tiles that aren't already removed
    const freeTiles = runtime.objects.Tile.getAllInstances().filter(tile => 
        !tile.instVars.collect && // Not already collected
        tile.instVars.free && // Must be free
        !removedUIDs.has(tile.uid) // Not already in removed area
    );

    console.log("Found", freeTiles.length, "available free tiles");

    if (freeTiles.length < 3) {
        console.log("Not enough free tiles available!");
        return false;
    }

    // Deduct gold
    const newGold = currentGold - BOOSTER_COST;
    localStorage.setItem(`${gamePrefix}gold`, newGold.toString());

    // Play booster sound
    runtime.callFunction("playAudio", "booster", 0, 10);

    // Get CollectTile position for reference
    const collectTileInstances = runtime.objects.CollectTile.getAllInstances();
    if (collectTileInstances.length === 0) return false;
    
    const collectTile = collectTileInstances[0];
    const tileWidth = freeTiles[0].width;
    const offset = -8; // Same offset as in collectTiles
    const heightOffset = collectTile.height * 0.8; // Slightly above CollectTile
    
    // Calculate starting position
    const baseX = collectTile.x;
    const startY = collectTile.y - heightOffset;

    // Randomly select 3 tiles
    const selectedTiles = freeTiles
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    // Process each selected tile with a delay
    selectedTiles.forEach((tile, index) => {
        setTimeout(() => {
            console.log(`Moving tile ${index + 1}/3`);

            // Add to our tracking array
            removedTilesArray.push(tile);
            
            // Calculate position based on total number of removed tiles
            const tileIndex = removedTilesArray.length - 1;
            const targetX = baseX + (tileIndex * (tileWidth + offset));
            const targetY = startY;

            // Move tile to new position
            runtime.callFunction("movetile", targetX, targetY, tile.uid);

        }, index * 200); // 200ms delay between each tile
    });

    // Rescan tiles after all movements are complete
    setTimeout(rescanTiles, 800);

    return true;
}


//GAMEMECHANICS//






//SYSTEMS//
function updateVariable(operation, key, value) {
    // Fetch the current value from localStorage
    let currentValue = parseInt(localStorage.getItem(`${gamePrefix}${key}`), 10) || 0;

    // Perform the operation
    if (operation === "add") {
        currentValue += value; // Add the value
    } else if (operation === "sub") {
        currentValue -= value; // Subtract the value
    } else if (operation === "set") {
        currentValue = value; // Set the value directly
    }

    // Ensure the value is not below 0
    if (currentValue < 0) {
        currentValue = 0;
    }


    // Save the updated value back to localStorage
    localStorage.setItem(`${gamePrefix}${key}`, currentValue);

    // Update the global Construct 3 variable
    if (runtime && runtime.globalVars[key] !== undefined) {
        runtime.globalVars[key] = currentValue; // Set the global variable
    } else {
        console.warn(`Global variable "${key}" not found in Construct 3.`);
    }

    updateText(key); // Call the function to update UI text
}
function updateText(key) {
    // Fetch the current value of the key from localStorage
    const currentValue = localStorage.getItem(`${gamePrefix}${key}`) || 0;

    // Iterate through all "spriteText" objects
    const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
    allSpriteTexts.forEach(spriteText => {
        // Check if the "w" instance variable matches the key
        if (spriteText.instVars.w === key) {
            // Update the text property of the spriteText object to display the current value
            spriteText.text = currentValue; // Metnin başına bir boşluk ekleyerek güncelle
        }
    });
}
function datainfo(key) {
    const fullKey = `${gamePrefix}${key}`; // Combine gamePrefix with key
    const value = localStorage.getItem(fullKey); // Retrieve the value from localStorage
    return value ? parseInt(value, 10) : 0; // Return the value as an integer, default to 0
}
function dropLoot() {
    const lootTable = [
        { name: "gold", range: [10, 50], dropRate: 100 },
        { name: "diamond", range: [1, 1], dropRate: 100 },
        { name: "starRewards", range: [2, 2], dropRate: 100 },
        { name: "collectionpack", range: [1, 1], dropRate: 20 },
		{ name: "wheelticket", range: [1, 1], dropRate: 5 }
    ];

    const rewards = lootTable
        .filter(item => Math.random() * 100 < item.dropRate)
        .map(item => {
            const quantity = Math.floor(
                Math.random() * (item.range[1] - item.range[0] + 1)
            ) + item.range[0];

            updateVariable("add", item.name, quantity);

            if (item.name === "collectionpack") {
                dropCard();
            }

            return { name: item.name, quantity };
        });

    const existingRewards = JSON.parse(localStorage.getItem("rewardAnimations")) || [];
    const updatedRewards = [...existingRewards, ...rewards];
    localStorage.setItem("rewardAnimations", JSON.stringify(updatedRewards));

    console.log("Loot gained:", rewards);
}
function playRewardAnimations() {
    const rewards = JSON.parse(localStorage.getItem("rewardAnimations")) || [];

    if (rewards.length === 0) {
        return;
    }

    let delay = 0;
    rewards.forEach(reward => {
        setTimeout(() => {
            runtime.callFunction("playrewardanimations", reward.name, reward.quantity);
        }, delay);
        delay += 1000;
    });

    localStorage.setItem("rewardAnimations", JSON.stringify([]));

    runtime.globalVars.lastmy = 0;
}
function addToA(name, quantity, extraData = {}) {
    // Retrieve the current animation array from localStorage
    const existingRewards = JSON.parse(localStorage.getItem("rewardAnimations")) || [];

    // Create a new reward object with extra data
    const newReward = { name, quantity, ...extraData };

    // Add the new reward to the existing array
    const updatedRewards = [...existingRewards, newReward];

    // Save the updated array back to localStorage
    localStorage.setItem("rewardAnimations", JSON.stringify(updatedRewards));

    console.log(`Added to animation array:`, newReward);
}
//SYSTEMS//

//AREAS//
function checkActiveAreaCompletion() {
    const activeAreaName = getActiveArea();
    const areas = loadAreas();
    const activeArea = areas.find(area => area.name === activeAreaName);

    if (!activeArea) {
        return false;
    }

    const totalParts = Object.keys(activeArea.parts).length;
    const completedParts = Object.values(activeArea.parts).filter(part => part.status === 1).length;

    if (totalParts === completedParts) {
       
        localStorage.setItem(`${gamePrefix}newarea`, "true");

       
        runtime.callFunction("nextarea", activeAreaName);

        return true;
    }

    return false;
}
function checkAndSetNextArea() {
    const newAreaFlag = localStorage.getItem(`${gamePrefix}newarea`);

    if (newAreaFlag === "true") {
        const activeAreaName = getActiveArea();
        const areas = loadAreas();
        const nextAreaIndex = areas.findIndex(area => area.name === activeAreaName) + 1;
        const nextArea = areas[nextAreaIndex];

        if (nextArea) {
          
            setActiveArea(nextArea.name);

           
            localStorage.setItem(`${gamePrefix}newarea`, "false");
        }
    }
}
function updateCurrentLevelText() {
if (runtime.layout.name === "Lobby") {
    const currentLevel = parseInt(localStorage.getItem(`${gamePrefix}currentLevel`), 10) || 1;
    
    // Find the spriteText instance with w = "startbutton"
    const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
    const startButtonText = allSpriteTexts.find(spriteText => spriteText.instVars.w === "startbutton");
    
    if (startButtonText) {
        // Fetch and check level data
        fetch("tilelevels.json")
            .then(response => response.json())
            .then(levelData => {
                const maxLevel = Math.max(...levelData.levels.map(level => level.level));
                startButtonText.text = currentLevel > maxLevel ? "Random Level" : `Level ${currentLevel}`;
            })
            .catch(error => {
                console.error("Error loading level data:", error);
                startButtonText.text = `Level ${currentLevel}`;
            });
    } else {
        console.error("spriteText with w = 'startbutton' not found.");
    }
    
    translation();
}
}
const defaultAreas = [
  {
    name: "Castle Garden",
    parts: {
      statue:    { status: 0, goldCost: 4, text: "Place the statue." },
      vase:      { status: 0, goldCost: 3, text: "Put the vase." },
      fountain:  { status: 0, goldCost: 1, text: "Install the fountain." },
      bench:     { status: 0, goldCost: 5, text: "Arrange the bench." },
      flower:    { status: 0, goldCost: 3, text: "Plant the flowers." }
    }
  },
  {
    name: "The Headmaster's Office",
    parts: {
      bookcase:   { status: 0, goldCost: 9, text: "Set up the bookcase." },
      chandelier: { status: 0, goldCost: 3, text: "Hang the chandelier." },
      curtain:    { status: 0, goldCost: 7, text: "Hang the curtains." },
      window:     { status: 0, goldCost: 4, text: "Open the window." },
      table:      { status: 0, goldCost: 5, text: "Set the table." },
      owl:        { status: 0, goldCost: 3, text: "Bring in the owl." },
      openbook:   { status: 0, goldCost: 3, text: "Open the book." },
      hat:        { status: 0, goldCost: 3, text: "Place the hat." },
      flower:     { status: 0, goldCost: 3, text: "Place the flower." },
      cat:        { status: 0, goldCost: 7, text: "Let the cat in." },
      carpet:     { status: 0, goldCost: 4, text: "Lay down the carpet." }
    }
  },
  {
    name: "Library",
    parts: {
      carpet:    { status: 0, goldCost: 4, text: "Lay down the carpet." },
      table:     { status: 0, goldCost: 5, text: "Arrange the table." },
      owlstatue: { status: 0, goldCost: 7, text: "Place the owl statue." },
      flower:    { status: 0, goldCost: 3, text: "Place the flower." },
      clock:     { status: 0, goldCost: 3, text: "Hang the clock." },
      books:     { status: 0, goldCost: 9, text: "Organize the books." }
    }
  },
  {
    name: "Herbology Classroom",
    parts: {
      portrait:    { status: 0, goldCost: 3, text: "Hang the portrait." },
      books:       { status: 0, goldCost: 9, text: "Place the books." },
      table:       { status: 0, goldCost: 7, text: "Set the table." },
      carpet:      { status: 0, goldCost: 6, text: "Lay down the carpet." },
      chandelier:  { status: 0, goldCost: 3, text: "Hang the chandelier." },
      clock:       { status: 0, goldCost: 3, text: "Hang the clock." }
    }
  }
];
const loadAreas = () => {
    const savedAreas = localStorage.getItem(`${gamePrefix}areas`);
    if (savedAreas) {
        return JSON.parse(savedAreas);
    } else {
        localStorage.setItem(`${gamePrefix}areas`, JSON.stringify(defaultAreas)); // Save default areas to localStorage
        return defaultAreas;
    }
};
const getActiveArea = () => {
    const activeArea = localStorage.getItem(`${gamePrefix}activeArea`);
    console.log("getActiveArea çağrıldı, aktif alan:", activeArea);
    return activeArea ? activeArea : "Castle Garden";
};
const setActiveArea = (areaName) => {
    localStorage.setItem(`${gamePrefix}activeArea`, areaName);
};
const setPartActive = (areaName, partName) => {
    console.log("Function called with:", areaName, partName);
    const areas = loadAreas(); // Load areas from localStorage
    console.log("Loaded areas:", areas);
    const area = areas.find(a => a.name === areaName); // Find the specified area

    if (area) {
        const part = area.parts[partName];
        if (part) {
            // Check if the part is already active
            if (part.status === 1) {
                console.log(`Part "${partName}" in area "${areaName}" is already active.`);
                updateAreaText(area); // Update "areatext" even if no changes were made
                return; // Exit the function
            }

            // Activate the part
            part.status = 1; // Set the part to active
            localStorage.setItem(`${gamePrefix}areas`, JSON.stringify(areas)); // Save updated areas to localStorage
            console.log(`Part "${partName}" in area "${areaName}" has been set to active.`);

            // Call the Construct 3 function with w and n
            if (runtime) {
                runtime.callFunction("upgradeParts", areaName, partName);
                console.log(`Construct 3 function 'upgradeParts' called with w = "${areaName}" and n = "${partName}".`);
            } else {
                console.error("Runtime is not defined. Cannot call 'upgradeParts'.");
            }

            // Update "areatext" to reflect the current part status
            updateAreaText(area);
        } else {
            console.warn(`Part "${partName}" not found in area "${areaName}".`);
        }
    } else {
        console.warn(`Area "${areaName}" not found.`);
    }
};
const updateAreaText = (area) => {
    const totalParts = Object.keys(area.parts).length; // Total number of parts
    const openParts = Object.values(area.parts).filter(part => part.status === 1).length; // Count of active parts
    const areatextInstance = runtime.objects.areatext.getFirstInstance(); // Get the first instance of "areatext"

    if (areatextInstance) {
        areatextInstance.text = `${openParts}/${totalParts}`; // Update the text to "open/total"
        console.log(`Updated areatext: ${openParts}/${totalParts}`);
    } else {
        console.warn("No 'areatext' instance found to update.");
    }
};
function activateAllPartsSequentially() {
    const activeAreaName = getActiveArea();
    const areas = loadAreas();
    const activeArea = areas.find(area => area.name === activeAreaName);

    if (!activeArea || !runtime) return;

    const parts = Object.keys(activeArea.parts);
    parts.forEach((partName, index) => {
        setTimeout(() => {
            runtime.callFunction("upgradeParts2", activeAreaName, partName);

            if (index === parts.length - 1) {
                setTimeout(() => {
                    runtime.callFunction("dark", false, "dark", 0, 70);

                    const newAreaObject = runtime.objects.newareaopen.createInstance("dark", runtime.layout.width / 2, runtime.layout.height / 2, 1);

                    if (newAreaObject) {
                        runtime.callFunction("playAudio", "Winning", 0, 0);
                        runtime.callFunction("particleCeleb", 1);

                        const originalWidth = newAreaObject.width;
                        const originalHeight = newAreaObject.height;

                        newAreaObject.width = 0;
                        newAreaObject.height = 0;

                        newAreaObject.behaviors.Tween.startTween("width", originalWidth, 0.1, "linear");
                        newAreaObject.behaviors.Tween.startTween("height", originalHeight, 0.1, "linear");
                    }

                    const nextAreaIndex = areas.findIndex(area => area.name === activeAreaName) + 1;
                    const nextArea = areas[nextAreaIndex];
                    if (nextArea) {
                        const areatitleSprite = runtime.objects.spriteText.getAllInstances().find(instance => instance.instVars.w === "areatitle");
                        if (areatitleSprite) {
                            areatitleSprite.text = nextArea.name;
                        }

                        const areatitle2Sprite = runtime.objects.areatitle2.getFirstInstance();
                        if (areatitle2Sprite) {
                            areatitle2Sprite.text = `Area ${nextAreaIndex + 1}`;
                        }

                        const areasObject = runtime.objects.areas.getFirstInstance();
                        if (areasObject) {
                            areasObject.setAnimation(nextArea.name);
                            areasObject.animationFrame = 1;
                        }
                    }
                }, 700);
            }
        }, index * 1000);
    });
}
function createAreaSprites() {
    try {
        const areas = loadAreas();
        console.log("Loaded Areas:", areas);

        if (!areas || areas.length === 0) {
            console.warn("Areas listesi boş veya tanımlı değil.");
            return;
        }

        const activeArea = getActiveArea();
        console.log("Aktif Alan (getActiveArea):", activeArea);

        const screenWidth = runtime.layout.width;
        const collectionGreenY = runtime.objects.collectiongreen.getFirstInstance()?.y || 0;
        const startY = collectionGreenY + 300;
        const spacingY = 80;

        const ninePatchChours = runtime.objects["9patchchours"].getFirstInstance();
        if (!ninePatchChours) {
            console.error("9patchchours objesi bulunamadı.");
            return;
        }

        runtime.objects.areas.getAllInstances().forEach(instance => instance.destroy());

        let targetAreaY = null;

        areas.slice().reverse().forEach((area, reversedIndex) => {
            const posX = screenWidth / 2;
            const posY = startY + (reversedIndex * (runtime.objects.areas.getFirstInstance()?.height + spacingY));

            const areaSprite = runtime.objects.areas?.createInstance("list", posX, posY, 1);
            if (!areaSprite) {
                console.error(`Area sprite oluşturulamadı: ${area.name}`);
                return;
            }

            areaSprite.setAnimation(area.name);

            ninePatchChours.instVars.listTotHeight += (areaSprite.height + 80);

            const allLocks = runtime.objects.collectionlock.getAllInstances();
            const lastLock = allLocks[allLocks.length - 1];

            if (area.completed === 1) {
                if (lastLock) lastLock.isVisible = false;
                areaSprite.animationFrame = 1;
            } else if (area.name === activeArea) {
                if (lastLock) lastLock.isVisible = false;
                areaSprite.animationFrame = 1;

                targetAreaY = posY;

                const allBars = runtime.objects.areasbar.getAllInstances();
                const lastBar = allBars[allBars.length - 1];
                if (lastBar) lastBar.isVisible = true;

                const allBarTexts = runtime.objects.areasbartext.getAllInstances();
                const lastBarText = allBarTexts[allBarTexts.length - 1];
                if (lastBarText) {
                    const totalParts = Object.keys(area.parts).length;
                    const openParts = Object.values(area.parts).filter(part => part.status === 1).length;
                    lastBarText.text = `${openParts}/${totalParts}`;
                }

                const allBar2s = runtime.objects.areasbar2.getAllInstances();
                const lastBar2 = allBar2s[allBar2s.length - 1];
                if (lastBar2) {
                    const totalParts = Object.keys(area.parts).length;
                    const openParts = Object.values(area.parts).filter(part => part.status === 1).length;
                    const progressWidth = (openParts / totalParts) * 240;
                    lastBar2.width = progressWidth;
                    lastBar2.isVisible = true;
                }
            } else {
                if (lastLock) lastLock.isVisible = true;

                const allBars = runtime.objects.areasbar.getAllInstances();
                const lastBar = allBars[allBars.length - 1];
                if (lastBar) lastBar.isVisible = false;

                const allBarTexts = runtime.objects.areasbartext.getAllInstances();
                const lastBarText = allBarTexts[allBarTexts.length - 1];
                if (lastBarText) lastBarText.text = "";

                const allBar2s = runtime.objects.areasbar2.getAllInstances();
                const lastBar2 = allBar2s[allBar2s.length - 1];
                if (lastBar2) lastBar2.isVisible = false;
            }

            // Alan başlıklarını güncelleme
            const areaTitle2Sprite = runtime.objects.areatitle2?.getAllInstances()?.pop();
            if (areaTitle2Sprite) {
                areaTitle2Sprite.text = `Area ${areas.length - reversedIndex}`;
                console.log(`Alan başlığı 2 ayarlandı: Area ${areas.length - reversedIndex}`);
            }
        });

        const chorusPin = runtime.objects.choruspin.getFirstInstance();
        if (chorusPin && targetAreaY !== null) {
            const originalChorusPinY = 415;
            const oran = 0.605;
            chorusPin.y = originalChorusPinY - (targetAreaY - originalChorusPinY) * oran;
        }
    } catch (error) {
        console.error("Error in createAreaSprites:", error.message);
    }
}
//AREAS//

//CHEST//
function resetChestTimer() {
    const chestTimerKey = "ChestTimer";
    localStorage.setItem(`${gamePrefix}${chestTimerKey}`, Date.now().toString());
    runtime.objects.chestRewardButton.getFirstInstance().isVisible = false; 
}
//CHEST//

//COLLECTION//
function claimReward(collectionName) {
    // Check if collections exist in localStorage
    const savedCollections = localStorage.getItem(`${gamePrefix}collections`);
    if (!savedCollections) {
        console.error("No collections found in localStorage.");
        return;
    }

    // Parse collections from localStorage
    const collectionsArray = JSON.parse(savedCollections);

    // Find the collection by name
    const collection = collectionsArray.find(c => c.name === collectionName);
    if (!collection) {
        console.error(`Collection "${collectionName}" not found.`);
        return;
    }

    // Check if the collection is completed
    const totalCards = collection.cards.length;
    const collectedCards = collection.cards.filter(card => card.collected === 1).length;

    if (collectedCards < totalCards) {
        const remainingCards = totalCards - collectedCards;
        console.log(`You need ${remainingCards} more cards to claim the reward for "${collectionName}".`);
        return;
    }

    if (collection.completed === 1) {
        console.log(`The reward for "${collectionName}" has already been claimed.`);
        return;
    }

    // Mark the collection as completed
    collection.completed = 1;

    // Save the updated collections back to localStorage
    localStorage.setItem(`${gamePrefix}collections`, JSON.stringify(collectionsArray));
    console.log(`Reward claimed for "${collectionName}".`);

    // Parse reward (e.g., "gold100" => type: "gold", amount: 100)
    const rewardType = collection.reward.replace(/[0-9]/g, "").trim().toLowerCase(); // Extract "gold"
    const rewardAmount = parseInt(collection.reward.replace(/[^\d]/g, ""), 10); // Extract "100"

    // Add the reward to animations array
   

    // Call Construct 3 RewardScreen function
    runtime.callFunction("RewardScreen", rewardType, rewardAmount);
}
function dropCard() {
    const savedCollections = localStorage.getItem(`${gamePrefix}collections`);

    if (!savedCollections) {
        fetch("collection.json")
            .then(response => response.json())
            .then(data => {
                const collectionsArray = data.collections;
                localStorage.setItem(`${gamePrefix}collections`, JSON.stringify(collectionsArray));
                executeDropCard(collectionsArray);
            });
    } else {
        const collectionsArray = JSON.parse(savedCollections);
        executeDropCard(collectionsArray);
    }

    function executeDropCard(collectionsArray) {
        const randomCards = [];
        let globalVars = {
            card1frame: 0,
            card1v: 0,
            card1cname: "",
            card1cardname: "",
            card2frame: 0,
            card2v: 0,
            card2cname: "",
            card2cardname: "",
        };

        while (randomCards.length < 2) {
            const randomCollectionIndex = Math.floor(Math.random() * collectionsArray.length);
            const randomCollection = collectionsArray[randomCollectionIndex];
            const uncollectedCards = randomCollection.cards.filter(card => card.collected === 0);

            const isAlreadyCollected = uncollectedCards.length === 0;

            const selectedCard = isAlreadyCollected
                ? randomCollection.cards[Math.floor(Math.random() * randomCollection.cards.length)]
                : uncollectedCards[Math.floor(Math.random() * uncollectedCards.length)];

            const cardIndex = randomCollection.cards.indexOf(selectedCard) + 1; // Kartın koleksiyondaki sırası
            randomCards.push(selectedCard);

            if (randomCards.length === 1) {
                globalVars.card1frame = cardIndex;
                globalVars.card1v = isAlreadyCollected ? 1 : 0;
                globalVars.card1cname = randomCollection.name;
                globalVars.card1cardname = selectedCard.name;
            } else if (randomCards.length === 2) {
                globalVars.card2frame = cardIndex;
                globalVars.card2v = isAlreadyCollected ? 1 : 0;
                globalVars.card2cname = randomCollection.name;
                globalVars.card2cardname = selectedCard.name;
            }

            if (!isAlreadyCollected) {
                selectedCard.collected = 1;
            }
        }

        localStorage.setItem(`${gamePrefix}collections`, JSON.stringify(collectionsArray));

        runtime.globalVars.card1frame = globalVars.card1frame;
        runtime.globalVars.card1v = globalVars.card1v;
        runtime.globalVars.card1cname = globalVars.card1cname;
        runtime.globalVars.card1cardname = globalVars.card1cardname;
        runtime.globalVars.card2frame = globalVars.card2frame;
        runtime.globalVars.card2v = globalVars.card2v;
        runtime.globalVars.card2cname = globalVars.card2cname;
        runtime.globalVars.card2cardname = globalVars.card2cardname;
    }
}
//COLLECTION//

//TRANSLATION//
let translations = {};
async function loadTranslations() {
    try {
        const response = await fetch("translations.json");
        if (response.ok) {
            translations = await response.json();
        }
    } catch (error) {}
}
function translation() {
    if (!translations || Object.keys(translations).length === 0) return;

    let currentLanguage = localStorage.getItem(`${gamePrefix}currentLanguage`);

    if (!currentLanguage) {
        const browserLanguage = navigator.languages
            ? navigator.languages[0].substring(0, 2)
            : navigator.language.substring(0, 2);

        currentLanguage = Object.keys(translations).includes(browserLanguage)
            ? browserLanguage
            : "en";

        localStorage.setItem(`${gamePrefix}currentLanguage`, currentLanguage);
    }

    const allObjects = runtime.objects;
    for (const objectType in allObjects) {
        const instances = allObjects[objectType]?.getAllInstances();
        if (instances && instances.length > 0) {
            instances.forEach(instance => {
                if (instance.text !== undefined) {
                    const originalText = instance.text.trim();
                    let translatedText = translations[currentLanguage]?.[originalText];
                    if (!translatedText) {
                        for (const key in translations[currentLanguage]) {
                            if (originalText.includes(key)) {
                                translatedText = originalText.replace(key, translations[currentLanguage][key]);
                                break;
                            }
                        }
                    }
                    if (translatedText) {
                        instance.text = translatedText;
                    }
                }
            });
        }
    }
}
function selectedLang(language) {
    if (translations[language]) {
        localStorage.setItem(`${gamePrefix}currentLanguage`, language);
        translation();
    }
}
//TRANSLATION//

//STARREWARDS//
function updateStarRewards() {
    const maxStarRewards = 20;
    const currentStarRewards = datainfo("starRewards"); // Get current starRewards from datainfo
    const displayText = `${currentStarRewards}/${maxStarRewards}`;

    // Find spriteText and update its text
    const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
    const starRewardsText = allSpriteTexts.find(spriteText => spriteText.instVars.w === "starRewards");
    if (starRewardsText) {
        starRewardsText.text = displayText;
    }

    // Control starRewardButton visibility
    const starRewardButton = runtime.objects.starRewardButton.getFirstInstance();
    if (starRewardButton) {
        starRewardButton.isVisible = currentStarRewards >= maxStarRewards;
    }
}
function handleStarRewards() {
    const starRewardsKey = "starRewards";
    const targetValue = 20;
    const rewards = [
        "Gold 50",
        "Gold 350",
        "Gold 500",
        "Gold 750",
        "Gold 1000",
        "Diamond 1x",
        "Diamond 3x",
        "Gold 2000",
        "Gold 5000"
    ];

    const currentStarRewards = datainfo(starRewardsKey) || 0;

    if (currentStarRewards >= targetValue) {
        // Call the starRew function
        runtime.callFunction("starRew");

        // Reset the starRewards value
        updateVariable("set", starRewardsKey, 0);

        // Shuffle the rewards array
        const shuffledRewards = [...rewards].sort(() => Math.random() - 0.5);

        // Assign rewards to starrewardicon instances and update starrewardtxt text
        const allStarRewardIcons = runtime.objects.starrewardicon.getAllInstances();
        allStarRewardIcons.forEach(icon => {
            const wIndex = icon.instVars.w - 1; // Convert "w" to 0-based index
            if (shuffledRewards[wIndex]) {
                icon.instVars.reward = shuffledRewards[wIndex]; // Assign the reward text

                // Find the corresponding starrewardtxt instance
                const allStarRewardTxts = runtime.objects.starrewardtxt.getAllInstances();
                const rewardTextObj = allStarRewardTxts.find(txt => txt.instVars.w === icon.instVars.w);

                if (rewardTextObj) {
                    rewardTextObj.text = shuffledRewards[wIndex]; // Update reward text
                }
            }
        });
    }
}
function handleStarRewardClick() {
    const openedRewardsCount = runtime.globalVars.openedstarreward || 0;

    // Check if the player can open more rewards
    if (openedRewardsCount >= 2) {
        return; // Prevent further actions
    }

    // Access the clicked "starrewardicon" instance
    const starRewardIcon = runtime.objects.starrewardicon.getFirstPickedInstance();

    if (starRewardIcon) {
        // Increment the opened star rewards count
        runtime.globalVars.openedstarreward = openedRewardsCount + 1;

        // Store the original width to restore it later
        const originalWidth = starRewardIcon.width;

        // Shrink the width to 0
        const shrinkTween = starRewardIcon.behaviors.Tween.startTween("width", 0, 0.3, "linear");

        // Wait for the tween to complete
        shrinkTween.finished.then(() => {
            // Change the animation frame to 1
            starRewardIcon.animationFrame = 1;

            // Create "starRewardsIcons" sprite below the clicked starrewardicon on the "dark" layer
            const rewardIcon = runtime.objects.starRewardsIcons.createInstance(
                "dark",
                starRewardIcon.x,
                starRewardIcon.y + 20,
                1 // Attach hierarchy to starRewardIcon
            );

            if (rewardIcon) {
                // Set the reward icon's size
                const iconOriginalWidth = rewardIcon.width; // Capture the original width
                const iconOriginalHeight = rewardIcon.height; // Capture the original height

                // Set the initial dimensions to 0
                rewardIcon.width = 0;
                rewardIcon.height = 0;

                // Set the animation for the reward icon dynamically
                const reward = starRewardIcon.instVars.reward;
                const rewardName = reward.split(" ")[0].toLowerCase();

                try {
                    rewardIcon.setAnimation(rewardName);
                } catch (e) {
                    console.warn(`Animation "${rewardName}" not found. Using default animation.`);
                    rewardIcon.setAnimation("default");
                }

                // Access the child text object (starrewardtxt) within the rewardIcon and update its value
                const rewardAmount = parseInt(reward.match(/\d+/)[0], 10);
                for (const child of rewardIcon.children()) {
                    if (child.objectType.name === "starrewardtxt") {
                        child.text = rewardAmount.toString();
                        break;
                    }
                }

                // Extract reward amount and add it using your system's function
                const rewardType = reward.split(" ")[0].toLowerCase();
                updateVariable("add", rewardType, rewardAmount); // Use your system's function to add the reward

                // Add the reward to the animations array
                const existingRewards = JSON.parse(localStorage.getItem("rewardAnimations")) || [];
                const newReward = { name: rewardType, quantity: rewardAmount };
                const updatedRewards = [...existingRewards, newReward];
                localStorage.setItem("rewardAnimations", JSON.stringify(updatedRewards));

                // Restore the original width and height for the rewardIcon (divided by 2)
                const expandTweenWidth = rewardIcon.behaviors.Tween.startTween("width", iconOriginalWidth, 0.3, "linear");
                const expandTweenHeight = rewardIcon.behaviors.Tween.startTween("height", iconOriginalHeight, 0.3, "linear");

                // Restore the original width for the starRewardIcon
                const expandTweenBox = starRewardIcon.behaviors.Tween.startTween("width", originalWidth, 0.3, "linear");

                Promise.all([expandTweenWidth.finished, expandTweenHeight.finished, expandTweenBox.finished]).then(() => {
                    // Handle after all animations complete
                });
            }

            // Reset "starRewards" after all allowed rewards are opened
            if (runtime.globalVars.openedstarreward >= 2) {
                // Reset the starRewards value
                updateVariable("set", "starRewards", 0);

                // Update localStorage to reflect the reset value
                localStorage.setItem("starRewards", "0");

                setTimeout(() => {
                    runtime.callFunction("closeSR");
                }, 1000); // Wait for 1 second before calling the function
            }
        });
    }
}
//STARREWARDS//


//PUZZLE//
function updatePuzzleState() {
    const puzzlesKey = "Puzzles";
    const totalPuzzles = 20;

    let puzzles = JSON.parse(localStorage.getItem(`${gamePrefix}${puzzlesKey}`));
    if (!puzzles) {
        puzzles = Array.from({ length: totalPuzzles }, (_, index) => ({ id: index, completed: false }));
        localStorage.setItem(`${gamePrefix}${puzzlesKey}`, JSON.stringify(puzzles));
    }

    let currentPuzzleIndex = puzzles.findIndex(puzzle => !puzzle.completed);
    if (currentPuzzleIndex === -1) {
        currentPuzzleIndex = totalPuzzles - 1;
    }

    const sourceImage = runtime.objects.SourceImage.getFirstInstance();
    if (sourceImage) {
        sourceImage.animationFrame = currentPuzzleIndex;
    }

    const puzzleTitle2 = runtime.objects.puzzletitle2.getFirstInstance();
    if (puzzleTitle2) {
        puzzleTitle2.text = `${currentPuzzleIndex + 1}/${totalPuzzles}`;
    }
}
function completeNextPuzzle() {
    const puzzlesKey = "Puzzles";
    const totalPuzzles = 20;

    let puzzles = JSON.parse(localStorage.getItem(`${gamePrefix}${puzzlesKey}`));
    if (!puzzles) {
        puzzles = Array.from({ length: totalPuzzles }, (_, index) => ({ id: index, completed: false }));
    }

    const nextIncompleteIndex = puzzles.findIndex(puzzle => !puzzle.completed);

    if (nextIncompleteIndex !== -1) {
        puzzles[nextIncompleteIndex].completed = true;
        localStorage.setItem(`${gamePrefix}${puzzlesKey}`, JSON.stringify(puzzles));
    }

    updateVariable("add", "gold", 500);

    resetPuzzleTimer(); 
}
function checkPuzzleTimer() {
    const timerKey = "PuzzleTimer";
    const threeHoursInMs = 3 * 60 * 60 * 1000;

    const savedTimer = localStorage.getItem(`${gamePrefix}${timerKey}`);
    const currentTime = Date.now();

    let remainingTime = threeHoursInMs;

    if (savedTimer) {
        const elapsedTime = currentTime - parseInt(savedTimer, 10);
        if (elapsedTime >= threeHoursInMs) {
            runtime.globalVars.puzzleactive = 1;
            remainingTime = 0;
        } else {
            runtime.globalVars.puzzleactive = 0;
            remainingTime = threeHoursInMs - elapsedTime;
        }
    } else {
        runtime.globalVars.puzzleactive = 1;
        remainingTime = 0;
    }

    const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
    const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    const remainingSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    const formattedTime = `${remainingHours.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

    const puzzleTimeObj = runtime.objects.puzzletime.getFirstInstance();
    if (puzzleTimeObj) {
        puzzleTimeObj.text = formattedTime;
    }
}
function resetPuzzleTimer() {
    const timerKey = "PuzzleTimer";
    localStorage.setItem(`${gamePrefix}${timerKey}`, Date.now().toString()); 
    runtime.globalVars.puzzleactive = 0;
}
function checkChestTimer() {
    const chestTimerKey = "ChestTimer";
    const oneHourInMs = 1 * 60 * 60 * 1000; // 1 saat milisaniye cinsinden

    const savedChestTimer = localStorage.getItem(`${gamePrefix}${chestTimerKey}`);
    const currentTime = Date.now();

    let remainingTime = oneHourInMs;

    if (savedChestTimer) {
        const elapsedTime = currentTime - parseInt(savedChestTimer, 10);
        if (elapsedTime >= oneHourInMs) {
            runtime.objects.chestRewardButton.getFirstInstance().isVisible = true;
            remainingTime = 0;
        } else {
            runtime.objects.chestRewardButton.getFirstInstance().isVisible = false;
            remainingTime = oneHourInMs - elapsedTime;
        }
    } else {
        runtime.objects.chestRewardButton.getFirstInstance().isVisible = true;
        remainingTime = 0;
    }

    const remainingMinutes = Math.floor(remainingTime / (60 * 1000));
    const remainingSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    const formattedTime = `${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

    // Find the spriteText instance with w = "chesttime"
    const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
    const chestTimeObj = allSpriteTexts.find(spriteText => spriteText.instVars.w === "chesttime");

    if (chestTimeObj) {
        chestTimeObj.text = formattedTime;
    } else {
        console.error("spriteText with w = 'chesttime' not found.");
    }
}
//PUZZLE//

//RANDOMQUEST//
let currentTask = null;
function startTask() {
    // Eğer görev yoksa veya mevcut görev tamamlandıysa yeni görev oluştur
    if (!currentTask || currentTask.found >= currentTask.required) {
        if (currentTask && currentTask.found >= currentTask.required) {
            completeTask();
        }

        const savedTask = localStorage.getItem(`${gamePrefix}currentTask`);
        if (savedTask) {
            currentTask = JSON.parse(savedTask);
        } else {
            currentTask = generateTask();
            currentTask.startTime = Date.now();
            localStorage.setItem(`${gamePrefix}currentTask`, JSON.stringify(currentTask));
        }
    }

    // Süre kontrolü yap
    const elapsedTime = (Date.now() - currentTask.startTime) / 1000;
    const remainingTime = Math.max(0, currentTask.duration - elapsedTime);

    // Eğer süre bittiyse görevi tamamla ve yenile
    if (remainingTime <= 0) {
        completeTask();
        resetTask();
        return;
    }

    updateUI(); // UI güncelle
}
function generateTask() {
    const tileTypes = ["tile1", "tile2", "tile3", "tile4"];
    const tileType = tileTypes[Math.floor(Math.random() * tileTypes.length)];
    
    const requiredOptions = [10, 30, 50, 100];
    const required = requiredOptions[Math.floor(Math.random() * requiredOptions.length)];
    
    const durationMap = {
        10: { gold: 100, duration: 30 * 60 },
        30: { gold: 300, duration: 60 * 60 },
        50: { gold: 500, duration: 2 * 60 * 60 },
        100: { gold: 2000, duration: 24 * 60 * 60 }
    };
    
    const reward = durationMap[required];
    return { tileType, required, found: 0, reward, duration: reward.duration };
}
function completeTask() {
    if (currentTask) {
        const { gold } = currentTask.reward;
        updateVariable("add", "gold", gold);
        localStorage.removeItem(`${gamePrefix}currentTask`);
        console.log("Görev tamamlandı, ödüller verildi.");
    }
}
function resetTask() {
    currentTask = null;
    localStorage.removeItem(`${gamePrefix}currentTask`);
    currentTask = generateTask();
    currentTask.startTime = Date.now();
    localStorage.setItem(`${gamePrefix}currentTask`, JSON.stringify(currentTask));
    updateUI();
}
function updateUI() {
    const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
    const allProgressBars = runtime.objects.collectiongrandprogress.getAllInstances();
    const randomTaskImg = runtime.objects.randomtaskimg.getFirstInstance();

    const progressText = allSpriteTexts.find(sprite => sprite.instVars.w === "progresstask");
    if (progressText) {
        progressText.text = `${currentTask.found}/${currentTask.required}`;
    }

    const taskPrice = allSpriteTexts.find(spriteText => spriteText.instVars.w === "taskprice");
    const taskPrice2 = allSpriteTexts.find(spriteText => spriteText.instVars.w === "taskprice2");

    if (taskPrice) {
        taskPrice.text = `$${currentTask.reward.gold}`;
    }

    const progressBar = allProgressBars.find(bar => bar.instVars.w === "task");
    if (progressBar) {
        const originalWidth = progressBar.instVars.originalWidth || progressBar.width;
        if (!progressBar.instVars.originalWidth) {
            progressBar.instVars.originalWidth = originalWidth;
        }
        const progressPercent = (currentTask.found / currentTask.required) * 100;
        progressBar.width = (originalWidth * progressPercent) / 100;
    }

    if (randomTaskImg && currentTask && currentTask.tileType) {
        console.log("Setting animation to:", currentTask.tileType);
        
        // Ensure we have a valid string
        const animationName = String(currentTask.tileType);
        try {
            randomTaskImg.setAnimation(animationName);
        } catch (error) {
            console.error("Failed to set animation:", error);
            console.log("Current task:", currentTask);
        }
    }

    const taskTimeText = allSpriteTexts.find(sprite => sprite.instVars.w === "tasktime");
    if (taskTimeText) {
        const elapsedTime = (Date.now() - currentTask.startTime) / 1000;
        const remainingTime = Math.max(0, currentTask.duration - elapsedTime);

        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = Math.floor(remainingTime % 60);

        if (hours > 0) {
            taskTimeText.text = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
        } else {
            taskTimeText.text = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
    }
}
function addTask() {
    if (currentTask && currentTask.found < currentTask.required) {
        currentTask.found++;

        if (currentTask.found >= currentTask.required) {
            completeTask();
            resetTask(); // Yeni göreve geç
        } else {
            localStorage.setItem(`${gamePrefix}currentTask`, JSON.stringify(currentTask));
        }
    }

    updateUI();
}
//RANDOMQUEST//













runOnStartup(async runtimeInstance => {
    runtime = runtimeInstance;
    await loadTranslations();
});
let chestTimerInterval = null;
runOnStartup(runtimeInstance => {
    runtime = runtimeInstance;

    runtime.addEventListener("tick", () => {
        if (runtime.layout) { // Eğer bir layout yüklüyse
            if (runtime.layout.name === "Lobby") {
                if (!chestTimerInterval) {
                    chestTimerInterval = setInterval(checkChestTimer, 1000);
                }
            } else {
                if (chestTimerInterval) {
                    clearInterval(chestTimerInterval);
                    chestTimerInterval = null;
                }
            }
        }
    });
});













const scriptsInEvents = {

	async Collection_Event5_Act1(runtime, localVars)
	{
let collectionsArray = [];
const collectionYSpacing = 350;
const collectionXSpacing = 320;
const collectionYOffset = 150;

const ninePatchChours = runtime.objects["9patchchours"].getFirstInstance();
if (ninePatchChours) {
    ninePatchChours.instVars.listTotHeight = 0;
}

const allCollectionImgs = runtime.objects.collectionimg.getAllInstances();
allCollectionImgs.forEach(instance => instance.destroy());

const savedCollections = localStorage.getItem(`${gamePrefix}collections`);

if (savedCollections) {
    collectionsArray = JSON.parse(savedCollections);
    renderCollections(collectionsArray);
    updateGrandProgressBar(collectionsArray);
} else {
    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            collectionsArray = data.collections;
            localStorage.setItem(`${gamePrefix}collections`, JSON.stringify(collectionsArray));
            renderCollections(collectionsArray);
            updateGrandProgressBar(collectionsArray);
        })
        .catch(error => {});
}

function renderCollections(collectionsArray) {
    const collectionBg = runtime.objects.collectionpagebg.getFirstInstance();
    if (!collectionBg) return;

    const startX = runtime.layout.width / 2;
    const startY = collectionBg.y + collectionYOffset;

    let row = 0;
    let col = 0;

    collectionsArray.forEach((collection, index) => {
        const collectionImg = runtime.objects.collectionimg.createInstance("list", 0, 0, 1);

        const x = startX + (col - 1) * collectionXSpacing;
        const y = startY + row * collectionYSpacing;

        collectionImg.x = x;
        collectionImg.y = y;
        collectionImg.setAnimation(collection.name);

        const allCollectionTexts = runtime.objects.collectiontext.getAllInstances();
        if (allCollectionTexts.length > 0) {
            const lastCreatedText = allCollectionTexts[allCollectionTexts.length - 1];
            lastCreatedText.text = collection.name;
        }

        const allCollectionCollectButtons = runtime.objects.collectioncollect.getAllInstances();
        if (allCollectionCollectButtons.length > 0) {
            const lastCreatedCollectButton = allCollectionCollectButtons[allCollectionCollectButtons.length - 1];
            lastCreatedCollectButton.instVars.name = collection.name;
        }

        const allProgressBgs = runtime.objects.collectionprogressbg.getAllInstances();

        if (collection.cards.filter(card => card.collected === 1).length === collection.cards.length) {
            if (collection.completed === 0) {
                if (allProgressBgs.length > 0) {
                    allProgressBgs[allProgressBgs.length - 1].destroy();
                }
                if (allCollectionCollectButtons.length > 0) {
                    const lastCreatedCollectButton = allCollectionCollectButtons[allCollectionCollectButtons.length - 1];
                    lastCreatedCollectButton.isVisible = true;
                    lastCreatedCollectButton.instVars.w = collection.name;
                }
            } else if (collection.completed === 1) {
                if (allProgressBgs.length > 0) {
                    allProgressBgs[allProgressBgs.length - 1].destroy();
                }
                if (allCollectionCollectButtons.length > 0) {
                    allCollectionCollectButtons[allCollectionCollectButtons.length - 1].destroy();
                }
            }
        }

        const allProgressTexts = runtime.objects.spriteText.getAllInstances();
        if (allProgressTexts.length > 0) {
            const filteredProgressTexts = allProgressTexts.filter(instance => instance.instVars.w === "collectioncount");
            if (filteredProgressTexts.length > 0) {
                const lastProgressText = filteredProgressTexts[filteredProgressTexts.length - 1];
                const collectedCards = collection.cards.filter(card => card.collected === 1).length;
                const totalCards = collection.cards.length;
                lastProgressText.text = `${collectedCards}/${totalCards}`;
            }
        }

        const allProgressBars = runtime.objects.collectionprogressbar.getAllInstances();
        if (allProgressBars.length > 0) {
            const collectedCards = collection.cards.filter(card => card.collected === 1).length;
            const totalCards = collection.cards.length;
            const progressPercentage = collectedCards / totalCards;
            const originalWidth = allProgressBars[allProgressBars.length - 1].width;
            allProgressBars[allProgressBars.length - 1].width = originalWidth * progressPercentage;
        }

        const allProgressText2s = runtime.objects.spriteText.getAllInstances().filter(instance => instance.instVars.w === "progresstxt2");
        if (allProgressText2s.length > 0) {
            const rewardValue = collection.reward.replace(/\D/g, "");
            allProgressText2s[allProgressText2s.length - 1].text = rewardValue;
        }

        const allCollectionRewImgs = runtime.objects.collectionrewimg.getAllInstances();
        if (allCollectionRewImgs.length > 0) {
            allCollectionRewImgs[allCollectionRewImgs.length - 1].setAnimation(collection.rewardAnimation);
        }

        if (ninePatchChours) {
            ninePatchChours.instVars.listTotHeight += collectionImg.height / 1.5;
        }

        col++;
        if (col >= 3) {
            col = 0;
            row++;
        }
    });
}

function updateGrandProgressBar(collectionsArray) {
    const grandProgressBar = runtime.objects.collectiongrandprogress.getFirstInstance();
    if (grandProgressBar) {
        const totalCollected = collectionsArray.reduce((acc, collection) => {
            return acc + collection.cards.filter(card => card.collected === 1).length;
        }, 0);

        const totalCards = collectionsArray.reduce((acc, collection) => {
            return acc + collection.cards.length;
        }, 0);

        const progressPercentage = totalCollected / totalCards;
        const originalWidth = grandProgressBar.width;
        grandProgressBar.width = originalWidth * progressPercentage;

        const progressText = runtime.objects.spriteText.getAllInstances().find(instance => instance.instVars.w === "progresscollection");
        if (progressText) {
            const rewardClaimed = localStorage.getItem(`${gamePrefix}allCollectionsRewardClaimed`);
            if (rewardClaimed === "true") {
                progressText.text = "Completed";
            } else {
                progressText.text = `${totalCollected}/${totalCards}`;
            }
        }
    }
}



	},

	async Collection_Event7_Act2(runtime, localVars)
	{
		claimReward(runtime.globalVars.ccname);
	},

	async Collection_Event8_Act2(runtime, localVars)
	{
const clickedCollectionImg = runtime.objects.collectionimg.getPickedInstances()[0];

if (clickedCollectionImg) {
    const animationName = clickedCollectionImg.animationName;

    if (!animationName) return;

    const savedCollections = localStorage.getItem(`${gamePrefix}collections`);
    if (savedCollections) {
        const collectionsArray = JSON.parse(savedCollections);
        const collection = collectionsArray.find(c => c.name === animationName);

        if (collection) {
            const rewardAmount = parseInt(collection.reward.replace(/[^\d]/g, ""), 10);
            const rewardType = collection.reward.replace(/[0-9]/g, "");

            const collectionBg = runtime.objects.collectionbg.createInstance("dark", runtime.layout.width / 2, runtime.layout.height / 2, 1);
            const originalWidth = collectionBg.width;
            const originalHeight = collectionBg.height;

            collectionBg.width = 0;
            collectionBg.height = 0;

            collectionBg.behaviors.Tween.startTween("width", originalWidth, 0.1, "linear");
            collectionBg.behaviors.Tween.startTween("height", originalHeight, 0.1, "linear");

            // Update "collectiontitle2" with w = "collectiontitle2"
            const collectionTitleText = runtime.objects.spriteText.getAllInstances().find(instance => instance.instVars.w === "collectiontitle2");
            if (collectionTitleText) {
                collectionTitleText.text = animationName;
            }

            // Update "progresstxt3" with w = "progresstxt3"
            const progressTxt = runtime.objects.spriteText.getAllInstances().find(instance => instance.instVars.w === "progresstxt3");
            if (progressTxt) {
                progressTxt.text = rewardAmount.toString();
            }

            // Update "collectiontext3" with w = "collectiontext3"
            const collectionText = runtime.objects.spriteText.getAllInstances().find(instance => instance.instVars.w === "collectiontext3");
            if (collectionText) {
                const collectedCards = collection.cards.filter(card => card.collected === 1).length;
                const totalCards = collection.cards.length;
                collectionText.text = `${collectedCards}/${totalCards}`;
            }

            setTimeout(() => {
                const collectionProgressBar2 = runtime.objects.collectionprogressbar2.getAllInstances().pop();
                if (collectionProgressBar2) {
                    const collectedCards = collection.cards.filter(card => card.collected === 1).length;
                    const totalCards = collection.cards.length;

                    if (totalCards > 0) {
                        const originalWidth = 300;
                        const progressPercentage = collectedCards / totalCards;
                        collectionProgressBar2.width = originalWidth * progressPercentage;
                    } else {
                        collectionProgressBar2.width = 0;
                    }
                }
            }, 100);

            const collectionRewImg2 = runtime.objects.collectionrewimg2.getFirstInstance();
            if (collectionRewImg2) {
                collectionRewImg2.setAnimation(rewardType);
            }

            const collectionProgressBg2 = runtime.objects.collectionprogressbg2.getFirstInstance();
            const startYBase = collectionProgressBg2 ? collectionProgressBg2.y + collectionProgressBg2.height : runtime.layout.height / 2;

            const cardSpacingX = 200;
            const cardSpacingY = 230;

            setTimeout(() => {
                const startX = runtime.layout.width / 2;
                const startY = startYBase - 70;
                let row = 0;
                let col = 0;

                collection.cards.forEach((card, index) => {
                    const x = startX + (col - 1) * cardSpacingX;
                    const y = startY + row * cardSpacingY;

                    const cardSprite = runtime.objects.collectioncards.createInstance("dark", x, y, 1);
                    if (cardSprite) {
                        cardSprite.setAnimation(animationName);
                        cardSprite.animationFrame = index;
                        cardSprite.instVars.collected = card.collected === 1 ? 1 : 0;
                    }

                    const allCollectionCardNames = runtime.objects.collectioncardname.getAllInstances();
                    if (allCollectionCardNames.length > 0) {
                        const lastCreatedCardName = allCollectionCardNames[allCollectionCardNames.length - 1];
                        lastCreatedCardName.text = card.name;
                    }

                    col++;
                    if (col >= 3) {
                        col = 0;
                        row++;
                    }
                });
            }, 100);
        }
    }
}

	},

	async Collection_Event16_Act2(runtime, localVars)
	{
const savedCollections = localStorage.getItem(`${gamePrefix}collections`);

if (!savedCollections) return;

const collectionsArray = JSON.parse(savedCollections);

const allComplete = collectionsArray.every(collection =>
    collection.cards.every(card => card.collected === 1)
);

const rewardClaimed = localStorage.getItem(`${gamePrefix}allCollectionsRewardClaimed`);

if (allComplete && !rewardClaimed) {
    updateVariable("add", "gold", 5000);
    runtime.callFunction("RewardScreen", "gold", "5000");
    localStorage.setItem(`${gamePrefix}allCollectionsRewardClaimed`, "true");
}

	},

	async Collection_Event18_Act1(runtime, localVars)
	{
const rewardClaimed = localStorage.getItem(`${gamePrefix}allCollectionsRewardClaimed`);

if (rewardClaimed === "true") {
    const randomQuestP5 = runtime.objects.randomquestp5.getFirstInstance();
    if (randomQuestP5) {
        randomQuestP5.destroy();
    }
}

	},

	async Luckyspin_Event3_Act1(runtime, localVars)
	{
// Get the WheelRotate instance
const wheelRotate = runtime.objects.WheelRotate.getFirstPickedInstance();
let rotateBehavior = wheelRotate.behaviors.Rotate; // Get the Rotate behavior

// Initial and minimum speeds
let initialSpeed = 4; // Initial speed
let minSpeed = 1; // Minimum speed
let deceleration = 0.005; // Deceleration rate
rotateBehavior.speed = initialSpeed; // Set the initial speed

let isSpinning = true; // Track if the wheel is spinning
let hasLogged = false; // Track when the minimum speed is reached
let hasStopped = false; // Track if the wheel has stopped

// Rewards and angles
const rewards = [
  { angle: 0, name: "gold250", title: "250 Gold", animation: "gold", chance: 18 },
  { angle: 45, name: "diamond3x", title: "Diamond x3", animation: "diamond", chance: 15 },
  { angle: 90, name: "gold50", title: "50 Gold", animation: "gold", chance: 25 },
  { angle: 135, name: "gold500", title: "Gold 500", animation: "gold", chance: 12 },
  { angle: 180, name: "gold750", title: "Gold 750", animation: "gold", chance: 6 },
  { angle: 225, name: "gold1000", title: "Gold 1000", animation: "heart", chance: 2 },
  { angle: 270, name: "gold1000", title: "Gold 1000", animation: "gold", chance: 1 },
  { angle: 315, name: "diamond1x", title: "Diamond x1", animation: "diamond", chance: 21 },
];

// Function to select a random reward based on chance
function selectRandomReward() {
    const randomValue = Math.random() * 100; // Select a random value between 0-100
    let cumulativeChance = 0;

    for (let reward of rewards) {
        cumulativeChance += reward.chance;
        if (randomValue <= cumulativeChance) {
            return reward;
        }
    }
    return rewards[0]; // Return the first reward as a default
}

// Select a random reward and determine the target angle
let selectedReward = selectRandomReward();
let targetAngle = selectedReward.angle;
console.log(`Selected reward: ${selectedReward.name}, Chance: ${selectedReward.chance}%`);




// Function to add rewards
async function addRewards() {
    if (selectedReward.name.includes("gold")) {
        const goldAmount = parseInt(selectedReward.name.replace("gold", ""), 10);
        await addGold(goldAmount);
    }else if (selectedReward.name.includes("diamond")) {
        const diamond = parseInt(selectedReward.name.replace("diamond", ""), 10);
        updateVariable("add", "diamond", diamond);
    }else if (selectedReward.name.includes("heart")) {
        const heart = parseInt(selectedReward.name.replace("heart", ""), 10);
        updateVariable("add", "heart", heart);
    }


}

// Helper function to add gold
async function addGold(amount) {
    updateVariable("add", "gold", amount);
}



// Function to display reward at the center of the wheel
function displayReward() {
    const rewardText = selectedReward.name;

    const wheelReward = runtime.objects.WheelReward.createInstance("Background", wheelRotate.x, wheelRotate.y, 1);
    wheelReward.width = wheelRotate.width + 15;
    wheelReward.height = wheelRotate.height + 15;

    wheelRotate.addChild(wheelReward);

    const rewardTextInstance = runtime.objects.rewardtext.getFirstInstance();
    rewardTextInstance.text = selectedReward.title;

    const rewardImageInstance = runtime.objects.RewardImages.getFirstInstance();
    rewardImageInstance.setAnimation(selectedReward.animation);

    runtime.callFunction("particleCeleb", 1);
    console.log(`Displayed reward: ${rewardText}`);
}

// Tick event to track the wheel and stop at the target angle
runtime.addEventListener("tick", async () => {
    if (isSpinning) {
        let currentAngle = runtime.globalVars.rotateWheelAngle;

        if (rotateBehavior.speed > minSpeed) {
            rotateBehavior.speed -= deceleration;
        } else if (!hasLogged) {
            rotateBehavior.speed = minSpeed;
            hasLogged = true;
            console.log("Minimum speed reached!");
        }

        let angleDifference = Math.abs((currentAngle - targetAngle + 360) % 360);
        if (angleDifference > 180) {
            angleDifference = 360 - angleDifference;
        }

        if (hasLogged && !hasStopped && angleDifference < 1) {
            rotateBehavior.speed = 0;
            isSpinning = false;
            hasStopped = true;
        
            console.log(`Wheel stopped at ${targetAngle} degrees. Reward won: ${selectedReward.name}`);
        
            await addRewards();
            await updateVariable("sub", "wheelticket", 1);
        
            setTimeout(async () => {
                displayReward();
              
            }, 700);
        }
        
    }
});

	},

	async Areas_Event1_Act2(runtime, localVars)
	{
		createAreaSprites();
	},

	async Puzzle_Event1_Act1(runtime, localVars)
	{
		setInterval(checkPuzzleTimer, 1000);
	},

	async Puzzle_Event1_Act2(runtime, localVars)
	{
		updatePuzzleState();
	},

	async Puzzle_Event19_Act2(runtime, localVars)
	{
		completeNextPuzzle();
	},

	async Setup_Event77_Act1(runtime, localVars)
	{
		const flagsLayer = "settings";
		const animationList = ["en", "fr", "it", "de", "es", "tr", "pt", "ru"];
		const spacing = -110;
		
		const translationButton = runtime.objects.translationbutton.getFirstInstance();
		if (translationButton) {
		    const startX = translationButton.x - 110;
		    const yPosition = translationButton.y;
		    const flagWidth = 90;
		    const flagHeight = 90;
		
		    animationList.forEach((animation, index) => {
		        const xPosition = startX + (index * spacing);
		        const flagInstance = runtime.objects.flags.createInstance(flagsLayer, xPosition, yPosition);
		        if (flagInstance) {
		            flagInstance.setAnimation(animation);
		            flagInstance.width = flagWidth;
		            flagInstance.height = flagHeight;
		        }
		    });
		}
		
	},

	async Setup_Event78_Act1(runtime, localVars)
	{
		const clickedFlag = runtime.objects.flags.getFirstPickedInstance();
		console.log("Clicked flag animation:", clickedFlag.animationName);
		selectedLang(clickedFlag.animationName);
	},

	async Setup_Event87_Act1(runtime, localVars)
	{
		resetChestTimer();
	},

	async Setup_Event94_Act12(runtime, localVars)
	{
		updateVariable("add", "gold", localVars.valuee);
		
		addToA("gold", 100);
	},

	async Setup_Event98_Act7(runtime, localVars)
	{
		playRewardAnimations();
	},

	async Setup_Event103_Act1(runtime, localVars)
	{
		updateStarRewards();
		checkAndSetNextArea();
	},

	async Setup_Event106_Act1(runtime, localVars)
	{
		handleStarRewards();
	},

	async Setup_Event108_Act13(runtime, localVars)
	{
		translation();
	},

	async Setup_Event111_Act1(runtime, localVars)
	{
		handleStarRewardClick();
	},

	async Setup_Event112_Act6(runtime, localVars)
	{
		updateStarRewards();
	},

	async Setup_Event112_Act8(runtime, localVars)
	{
		playRewardAnimations();
	},

	async Setup_Event115_Act1(runtime, localVars)
	{
		// Check if localStorage is empty
		if (localStorage.length === 0) {
		    console.log("LocalStorage is empty. Initializing default values...");
		
		    // Call updateVariable functions for initial setup
		    updateVariable("set", "gold", 100);
		    updateVariable("set", "wheelticket", 1);
			updateVariable("set", "diamond", 1);
		}
		
	},

	async Setup_Event115_Act3(runtime, localVars)
	{
		updateVariable("add", "gold", 0);
		updateVariable("add", "wheelticket", 0);
		updateVariable("add", "diamond", 0);
	},

	async Setup_Event117_Act1(runtime, localVars)
	{
		updateVariable(localVars.addorsub, localVars.v, localVars.value);
	},

	async Setup_Event118_Act1(runtime, localVars)
	{
		translation();
	},

	async Setup_Event145_Act3(runtime, localVars)
	{
		addToA("gold", 50)
	},

	async Setup_Event146_Act3(runtime, localVars)
	{
		addToA("gold", 50)
	},

	async Setup_Event149_Act8(runtime, localVars)
	{
		playRewardAnimations();
	},

	async Setup_Event149_Act9(runtime, localVars)
	{
const savedCollections = localStorage.getItem(`${gamePrefix}collections`);

if (savedCollections) {
    const collectionsArray = JSON.parse(savedCollections);

    const claimableCollections = collectionsArray.filter(collection => {
        const totalCards = collection.cards.length;
        const collectedCards = collection.cards.filter(card => card.collected === 1).length;
        return collectedCards === totalCards && collection.completed === 0;
    });

    const howCollectionText = runtime.objects.spriteText.getAllInstances().find(obj => obj.instVars.w === "howcollection");
    const redCircle = runtime.objects.redcircle.getAllInstances().find(obj => obj.instVars.w === "howcollection");

    if (claimableCollections.length > 0) {
        if (howCollectionText) {
            howCollectionText.text = claimableCollections.length.toString();
        }
        if (redCircle) {
            redCircle.isVisible = true;
        }
    } else {
        if (howCollectionText) {
            howCollectionText.text = "0";
        }
        if (redCircle) {
            redCircle.isVisible = false;
        }
    }
} else {
    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const collectionsArray = data.collections;

            const claimableCollections = collectionsArray.filter(collection => {
                const totalCards = collection.cards.length;
                const collectedCards = collection.cards.filter(card => card.collected === 1).length;
                return collectedCards === totalCards && collection.completed === 0;
            });

            const howCollectionText = runtime.objects.spriteText.getAllInstances().find(obj => obj.instVars.w === "howcollection");
            const redCircle = runtime.objects.redcircle.getAllInstances().find(obj => obj.instVars.w === "howcollection");

            if (claimableCollections.length > 0) {
                if (howCollectionText) {
                    howCollectionText.text = claimableCollections.length.toString();
                }
                if (redCircle) {
                    redCircle.isVisible = true;
                }
            } else {
                if (howCollectionText) {
                    howCollectionText.text = "0";
                }
                if (redCircle) {
                    redCircle.isVisible = false;
                }
            }
        })
        .catch(error => {});
}

	},

	async Setup_Event151_Act2(runtime, localVars)
	{
		translation();
	},

	async Setup_Event152_Act2(runtime, localVars)
	{
		translation();
	},

	async Setup_Event156_Act1(runtime, localVars)
	{
const savedCollections = localStorage.getItem(`${gamePrefix}collections`);

if (savedCollections) {
    const collectionsArray = JSON.parse(savedCollections);

    const claimableCollections = collectionsArray.filter(collection => {
        const totalCards = collection.cards.length;
        const collectedCards = collection.cards.filter(card => card.collected === 1).length;
        return collectedCards === totalCards && collection.completed === 0;
    });

    const howCollectionText = runtime.objects.spriteText.getAllInstances().find(obj => obj.instVars.w === "howcollection");
    const redCircle = runtime.objects.redcircle.getAllInstances().find(obj => obj.instVars.w === "howcollection");

    if (claimableCollections.length > 0) {
        if (howCollectionText) {
            howCollectionText.text = claimableCollections.length.toString();
        }
        if (redCircle) {
            redCircle.isVisible = true;
        }
    } else {
        if (howCollectionText) {
            howCollectionText.text = "0";
        }
        if (redCircle) {
            redCircle.isVisible = false;
        }
    }
} else {
    fetch("collection.json")
        .then(response => response.json())
        .then(data => {
            const collectionsArray = data.collections;

            const claimableCollections = collectionsArray.filter(collection => {
                const totalCards = collection.cards.length;
                const collectedCards = collection.cards.filter(card => card.collected === 1).length;
                return collectedCards === totalCards && collection.completed === 0;
            });

            const howCollectionText = runtime.objects.spriteText.getAllInstances().find(obj => obj.instVars.w === "howcollection");
            const redCircle = runtime.objects.redcircle.getAllInstances().find(obj => obj.instVars.w === "howcollection");

            if (claimableCollections.length > 0) {
                if (howCollectionText) {
                    howCollectionText.text = claimableCollections.length.toString();
                }
                if (redCircle) {
                    redCircle.isVisible = true;
                }
            } else {
                if (howCollectionText) {
                    howCollectionText.text = "0";
                }
                if (redCircle) {
                    redCircle.isVisible = false;
                }
            }
        })
        .catch(error => {});
}

	},

	async Setup_Event158_Act1(runtime, localVars)
	{
		checkPuzzleTimer();
		
		const redCircle = runtime.objects.redcircle.getAllInstances().find(obj => obj.instVars.w === "howpuzzle");
		const howPuzzleText = runtime.objects.spriteText.getAllInstances().find(obj => obj.instVars.w === "howpuzzle");
		
		if (runtime.globalVars.puzzleactive === 1) {
		    if (redCircle) {
		        redCircle.isVisible = true;
		    }
		    if (howPuzzleText) {
		        howPuzzleText.text = "1";
		    }
		} else {
		    if (redCircle) {
		        redCircle.isVisible = false;
		    }
		    if (howPuzzleText) {
		        howPuzzleText.text = "";
		    }
		}
		
	},

	async Start_Event4_Act1(runtime, localVars)
	{
		loadLevel();
	},

	async Start_Event4_Act16(runtime, localVars)
	{
		updateCurrentLevelText();
	},

	async Start_Event6_Act2(runtime, localVars)
	{
		startLevel();
	},

	async Start_Event17_Act2(runtime, localVars)
	{
const layerName = "areaopen";
const parentObjectName = "areaopen";
const childObjectName = "areaopen2";
const titleObjectName = "areatitle";
const areaNameObjectName = "areaopen3";

const layoutWidth = runtime.layout.width;
const layoutHeight = runtime.layout.height;

const parentObject = runtime.objects[parentObjectName]?.createInstance(
    layerName,
    layoutWidth / 2,
    layoutHeight / 2,
    1
);

if (!parentObject) return;

const parentInitialWidth = parentObject.width;
const parentInitialHeight = parentObject.height;

parentObject.width = 0;
parentObject.height = 0;

const areas = loadAreas();
const activeArea = getActiveArea();

if (!activeArea) return;

const activeParts = areas.find(area => area.name === activeArea)?.parts || {};
const diamondCount = datainfo("diamond");

let affordableParts = Object.entries(activeParts)
    .filter(([_, partData]) => partData.goldCost <= diamondCount && partData.status === 0)
    .slice(0, 3);

if (affordableParts.length === 0) {
    affordableParts = Object.entries(activeParts)
        .filter(([_, partData]) => partData.status === 0)
        .slice(0, 3);
}

if (affordableParts.length === 0) return;

const spacingMultiplier = 7;
const childHeight = runtime.objects[childObjectName]?.getFirstInstance()?.height || 50;
const startY = parentObject.y - (childHeight * 1.2 * spacingMultiplier);

affordableParts.forEach(([partName, partData], index) => {
    const price = partData.goldCost;

    const child = runtime.objects[childObjectName]?.createInstance(
        layerName,
        parentObject.x,
        startY + index * (childHeight * spacingMultiplier),
        1
    );

    if (!child) return;

    const childInitialWidth = child.width;
    const childInitialHeight = child.height;

    child.width = 0;
    child.height = 0;

    child.behaviors.Tween.startTween("width", childInitialWidth, 0.1, "linear");
    child.behaviors.Tween.startTween("height", childInitialHeight, 0.1, "linear");

    const allAreaopen5 = runtime.objects["areaopen5"].getAllInstances();
    const partNameTextObject = allAreaopen5[allAreaopen5.length - 1];
    if (partNameTextObject) {
        partNameTextObject.text = partData.text;
    }

    const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
    const priceTextObject = allSpriteTexts.find(spr => spr.instVars.w === "doit");
    if (priceTextObject) {
        priceTextObject.text = `Do It @${price}`;
		
    }

    const allAreaopen3 = runtime.objects[areaNameObjectName]?.getAllInstances();
    const areaNameObject = allAreaopen3[allAreaopen3.length - 1];
    if (areaNameObject) {
        areaNameObject.instVars.name = activeArea;
        areaNameObject.instVars.part = partName;
        areaNameObject.instVars.price = price;
    }
});

parentObject.behaviors.Tween.startTween("width", parentInitialWidth, 0.1, "linear");
parentObject.behaviors.Tween.startTween("height", parentInitialHeight, 0.1, "linear");

const spriteTexts = runtime.objects.spriteText.getAllInstances();
const titleTextObject = spriteTexts.find(obj => obj.instVars.w === "areatitle");

if (titleTextObject && activeArea) {
    titleTextObject.text = activeArea;
}

	},

	async Start_Event17_Act5(runtime, localVars)
	{
		translation();
	},

	async Start_Event19_Act2(runtime, localVars)
	{
const layerName = "areaopen";
const parentObjectName = "areaopen";
const childObjectName = "areaopen2";
const titleObjectName = "areatitle";
const areaNameObjectName = "areaopen3";

const layoutWidth = runtime.layout.width;
const layoutHeight = runtime.layout.height;

const parentObject = runtime.objects[parentObjectName]?.createInstance(
    layerName,
    layoutWidth / 2,
    layoutHeight / 2,
    1
);

if (!parentObject) return;

const parentInitialWidth = parentObject.width;
const parentInitialHeight = parentObject.height;

parentObject.width = 0;
parentObject.height = 0;

const areas = loadAreas();
const activeArea = getActiveArea();

if (!activeArea) return;

const activeParts = areas.find(area => area.name === activeArea)?.parts || {};
const diamondCount = datainfo("diamond");

let affordableParts = Object.entries(activeParts)
    .filter(([_, partData]) => partData.goldCost <= diamondCount && partData.status === 0)
    .slice(0, 3);

if (affordableParts.length === 0) {
    affordableParts = Object.entries(activeParts)
        .filter(([_, partData]) => partData.status === 0)
        .slice(0, 3);
}

if (affordableParts.length === 0) return;

const spacingMultiplier = 7;
const childHeight = runtime.objects[childObjectName]?.getFirstInstance()?.height || 50;
const startY = parentObject.y - (childHeight * 1.2 * spacingMultiplier);

affordableParts.forEach(([partName, partData], index) => {
    const price = partData.goldCost;

    const child = runtime.objects[childObjectName]?.createInstance(
        layerName,
        parentObject.x,
        startY + index * (childHeight * spacingMultiplier),
        1
    );

    if (!child) return;

    const childInitialWidth = child.width;
    const childInitialHeight = child.height;

    child.width = 0;
    child.height = 0;

    child.behaviors.Tween.startTween("width", childInitialWidth, 0.1, "linear");
    child.behaviors.Tween.startTween("height", childInitialHeight, 0.1, "linear");

    const allAreaopen5 = runtime.objects["areaopen5"].getAllInstances();
    const partNameTextObject = allAreaopen5[allAreaopen5.length - 1];
    if (partNameTextObject) {
        partNameTextObject.text = partData.text;
    }

    const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
    const priceTextObject = allSpriteTexts.find(spr => spr.instVars.w === "doit");
    if (priceTextObject) {
        priceTextObject.text = `Do It @${price}`;
		
    }

    const allAreaopen3 = runtime.objects[areaNameObjectName]?.getAllInstances();
    const areaNameObject = allAreaopen3[allAreaopen3.length - 1];
    if (areaNameObject) {
        areaNameObject.instVars.name = activeArea;
        areaNameObject.instVars.part = partName;
        areaNameObject.instVars.price = price;
    }
});

parentObject.behaviors.Tween.startTween("width", parentInitialWidth, 0.1, "linear");
parentObject.behaviors.Tween.startTween("height", parentInitialHeight, 0.1, "linear");

const spriteTexts = runtime.objects.spriteText.getAllInstances();
const titleTextObject = spriteTexts.find(obj => obj.instVars.w === "areatitle");

if (titleTextObject && activeArea) {
    titleTextObject.text = activeArea;
}

	},

	async Start_Event19_Act5(runtime, localVars)
	{
		translation();
	},

	async Start_Event24_Act1(runtime, localVars)
	{
		const clickedObject = runtime.objects.areaopen3.getFirstPickedInstance();
		
		if (clickedObject) {
		    const areaName = clickedObject.instVars.name;
		    const partName = clickedObject.instVars.part;
		    const price = clickedObject.instVars.price;
		
		    if (areaName && partName) {
		        const diamondCount = datainfo("diamond"); // Get current diamond count
		
		        if (diamondCount >= price) {
		            setPartActive(areaName, partName);
		            updateVariable("sub", "diamond", price); // Subtract price from diamond
		        } else {
		            runtime.callFunction("message","Not enough @!",0,0,0);
		        }
		    } else {
		        console.error("The clicked object is missing 'name' or 'part' instance variables.");
		    }
		} else {
		    console.error("No areaopen3 object is selected.");
		}
		
	},

	async Start_Event24_Act9(runtime, localVars)
	{
		checkActiveAreaCompletion();
	},

	async Start_Event29_Act2(runtime, localVars)
	{
		activateAllPartsSequentially();
	},

	async Start_Event31_Act1(runtime, localVars)
	{
		const picked = runtime.objects.Letters.getPickedInstances()[0];
		if (picked) {
		  guessLetter(picked.instVars.uuid);
		}
		
	},

	async Start_Event32_Act1(runtime, localVars)
	{
		end();
		
	},

	async Start_Event32_Act3(runtime, localVars)
	{
		checkPlayableWordsOrRearrange();
	},

	async Start_Event53_Act2(runtime, localVars)
	{
		shuffleBooster();
		
	},

	async Start_Event53_Act4(runtime, localVars)
	{
		updateVariable("add","gold",0)
		
	},

	async Start_Event54_Act2(runtime, localVars)
	{
		autoMatchBooster();
	},

	async Start_Event54_Act4(runtime, localVars)
	{
		updateVariable("add","gold",0)
		
	},

	async Start_Event55_Act2(runtime, localVars)
	{
		removeTilesBooster();
	},

	async Start_Event55_Act4(runtime, localVars)
	{
		updateVariable("add","gold",0)
		
	},

	async Start_Event57_Act1(runtime, localVars)
	{
		dropLoot();
	},

	async Start_Event57_Act10(runtime, localVars)
	{
const endLevelText = runtime.objects.spriteText.getAllInstances().find(spriteText => spriteText.instVars.w === "endlevel");
if (endLevelText) {
    const currentLevel = parseInt(localStorage.getItem(`${gamePrefix}currentLevel`), 10) || 1;
    endLevelText.text = `Level ${currentLevel}`;
}
updateVariable("add","currentLevel",1)
	},

	async Start_Event59_Act1(runtime, localVars)
	{
		updateVariable("set","currentLevel",2)
	},

	async Start_Event62_Act7(runtime, localVars)
	{
const endLevelText = runtime.objects.spriteText.getAllInstances().find(spriteText => spriteText.instVars.w === "endlevel");
if (endLevelText) {
    const currentLevel = parseInt(localStorage.getItem(`${gamePrefix}currentLevel`), 10) || 1;
    endLevelText.text = `Level ${currentLevel}`;
}

	},

	async Start_Event67_Act2(runtime, localVars)
	{
		playRewardAnimations();
	},

	async Start_Event68_Act1(runtime, localVars)
	{
if (runtime.layout.name === "Lobby") {
    const areas = loadAreas();
    const activeArea = getActiveArea();

    areas.forEach(area => {
        const layer = runtime.layout.getLayer(area.name);
        if (layer) {
            layer.isVisible = area.name === activeArea;
        }
    });

    runtime.objects.parts.instances().forEach(instance => {
        const partName = instance.instVars.n;
        const areaName = instance.instVars.w;

        if (!partName || !areaName) {
            instance.isVisible = false;
            return;
        }

        if (areaName === activeArea) {
            const area = areas.find(a => a.name === activeArea);
            if (area && area.parts.hasOwnProperty(partName)) {
                const partData = area.parts[partName];
                const partStatus = typeof partData === "object" && partData !== null ? partData.status || 0 : partData;
                instance.isVisible = partStatus === 1;
            } else {
                instance.isVisible = false;
            }
        } else {
            instance.isVisible = false;
        }
    });

    const area = areas.find(a => a.name === activeArea);
    if (area) {
        const totalParts = Object.keys(area.parts).length;
        const openParts = Object.values(area.parts).filter(value =>
            typeof value === "object" && value !== null ? value.status === 1 : value === 1
        ).length;

        const areatextInstance = runtime.objects.areatext.getFirstInstance();
        if (areatextInstance) {
            areatextInstance.text = `${openParts}/${totalParts}`;
        }

        const activeAreaIndex = areas.indexOf(area);
        if (activeAreaIndex !== -1) {
            const displayAreaIndex = activeAreaIndex + 1;

            const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
            const areaButtonText = allSpriteTexts.find(spr => spr.instVars.w === "startareabutton");

            if (areaButtonText) {
                areaButtonText.text = `Area  ${displayAreaIndex}`;
            }
        }

        // === Güncelleme: "howarea" ve "howpart" diamond kontrolüne göre ===
        const playerDiamonds = datainfo("diamond"); // Diamond değerini al
        let affordableParts = Object.values(area.parts)
            .filter(part =>
                typeof part === "object" && part !== null && part.status === 0 && playerDiamonds >= part.goldCost
            )
            .slice(0, 3); // En fazla 3 uygun parça al

        const howareaText = runtime.objects.spriteText.getAllInstances().find(spr => spr.instVars.w === "howarea");
        if (howareaText) {
            howareaText.text = `${affordableParts.length}`;
        }

       const howpartCircle = runtime.objects.redcircle.getAllInstances().find(obj => obj.instVars.w === "howpart");
const howPartText = runtime.objects.spriteText.getAllInstances().find(obj => obj.instVars.w === "howpart");

if (affordableParts.length > 0) {
    if (howpartCircle) {
        howpartCircle.isVisible = true;
    }
    if (howPartText) {
        howPartText.text = affordableParts.length.toString();
    }
} else {
    if (howpartCircle) {
        howpartCircle.isVisible = false;
    }
    if (howPartText) {
        howPartText.text = "";
    }
}
    }
}

	},

	async Start_Event68_Act3(runtime, localVars)
	{
		translation();
	},

	async Start_Event69_Act1(runtime, localVars)
	{
		failGame();
	},

	async Start_Event71_Act1(runtime, localVars)
	{
		startTask();
	},

	async Start_Event73_Act1(runtime, localVars)
	{
		startTask();
	},

	async Start_Event76_Act1(runtime, localVars)
	{

	},

	async Start_Event77_Act1(runtime, localVars)
	{

	},

	async Start_Event78_Act1(runtime, localVars)
	{
		updateVariable("set","diamond",1)
	},

	async Start_Event96_Act2(runtime, localVars)
	{
const layerName = "areaopen";
const parentObjectName = "areaopen";
const childObjectName = "areaopen2";
const titleObjectName = "areatitle";
const areaNameObjectName = "areaopen3";

const layoutWidth = runtime.layout.width;
const layoutHeight = runtime.layout.height;

const parentObject = runtime.objects[parentObjectName]?.createInstance(
    layerName,
    layoutWidth / 2,
    layoutHeight / 2,
    1
);

if (!parentObject) return;

const parentInitialWidth = parentObject.width;
const parentInitialHeight = parentObject.height;

parentObject.width = 0;
parentObject.height = 0;

const areas = loadAreas();
const activeArea = getActiveArea();

if (!activeArea) return;

const activeParts = areas.find(area => area.name === activeArea)?.parts || {};
const diamondCount = datainfo("diamond");

let affordableParts = Object.entries(activeParts)
    .filter(([_, partData]) => partData.goldCost <= diamondCount && partData.status === 0)
    .slice(0, 3);

if (affordableParts.length === 0) {
    affordableParts = Object.entries(activeParts)
        .filter(([_, partData]) => partData.status === 0)
        .slice(0, 3);
}

if (affordableParts.length === 0) return;

const spacingMultiplier = 7;
const childHeight = runtime.objects[childObjectName]?.getFirstInstance()?.height || 50;
const startY = parentObject.y - (childHeight * 1.2 * spacingMultiplier);

affordableParts.forEach(([partName, partData], index) => {
    const price = partData.goldCost;

    const child = runtime.objects[childObjectName]?.createInstance(
        layerName,
        parentObject.x,
        startY + index * (childHeight * spacingMultiplier),
        1
    );

    if (!child) return;

    const childInitialWidth = child.width;
    const childInitialHeight = child.height;

    child.width = 0;
    child.height = 0;

    child.behaviors.Tween.startTween("width", childInitialWidth, 0.1, "linear");
    child.behaviors.Tween.startTween("height", childInitialHeight, 0.1, "linear");

    const allAreaopen5 = runtime.objects["areaopen5"].getAllInstances();
    const partNameTextObject = allAreaopen5[allAreaopen5.length - 1];
    if (partNameTextObject) {
        partNameTextObject.text = partData.text;
    }

    const allSpriteTexts = runtime.objects.spriteText.getAllInstances();
    const priceTextObject = allSpriteTexts.find(spr => spr.instVars.w === "doit");
    if (priceTextObject) {
        priceTextObject.text = `Do It @${price}`;
		
    }

    const allAreaopen3 = runtime.objects[areaNameObjectName]?.getAllInstances();
    const areaNameObject = allAreaopen3[allAreaopen3.length - 1];
    if (areaNameObject) {
        areaNameObject.instVars.name = activeArea;
        areaNameObject.instVars.part = partName;
        areaNameObject.instVars.price = price;
    }
});

parentObject.behaviors.Tween.startTween("width", parentInitialWidth, 0.1, "linear");
parentObject.behaviors.Tween.startTween("height", parentInitialHeight, 0.1, "linear");

const spriteTexts = runtime.objects.spriteText.getAllInstances();
const titleTextObject = spriteTexts.find(obj => obj.instVars.w === "areatitle");

if (titleTextObject && activeArea) {
    titleTextObject.text = activeArea;
}

	},

	async Start_Event96_Act5(runtime, localVars)
	{
		translation();
	},

	async Start_Event97_Act3(runtime, localVars)
	{
		setTutorialStep(10);
	},

	async Start_Event99_Act1(runtime, localVars)
	{
		setTutorial(0);
	},

	async Start_Event103_Act3(runtime, localVars)
	{
		translation();
	},

	async Start_Event104_Act1(runtime, localVars)
	{

	},

	async Start_Event105_Act1(runtime, localVars)
	{

	},

	async Start_Event107_Act1(runtime, localVars)
	{
		onTileTouched();
		
	},

	async Start_Event110_Act4(runtime, localVars)
	{
		rescanTiles();
	},

	async Start_Event113_Act1(runtime, localVars)
	{

	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
