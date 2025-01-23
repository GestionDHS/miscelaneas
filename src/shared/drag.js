import { PGEvent } from "./pg-event";

/**
 * Class to handle drag-and-drop functionality for categorizing items.
 */
export class DragDivider {
    
    /**
     * @typedef {Object} ItemConfig
     * @property {HTMLElement} element - The HTML element of the item.
     * @property {string} expectedCategory - The expected category for this item.
     *
     * @typedef {Object} CategoryConfig
     * @property {string} name - The name of the category.
     * @property {HTMLElement} element - The HTML element of the category.
     *
     * @typedef {Object} DragDividerConfig
     * @property {Object} base - Configuration for the base container.
     * @property {HTMLElement} base.element - The HTML element of the base container.
     * @property {ItemConfig[]} base.items - The items within the base container.
     * @property {CategoryConfig[]} categories - The categories where items can be dropped.
     * @property {HTMLElement} verifyButton - Button element to trigger validation.
     * @property {function} [onChange] - Callback executed when the state changes.
     */

    /**
     * @param {DragDividerConfig} config - Initial configuration for the functionality.
     * @throws {Error} Throws an error if the configuration is invalid.
     */
   
    constructor(config) {
        
        if (!config.base || !config.base.element || !config.categories || !config.verifyButton) {
            throw new Error("Invalid configuration: base, categories, and verifyButton are required.");
        }

        this.base = config.base;
        this.categories = config.categories;
        this.onChange = config.onChange;
        this.messages = config.messages;

        this.pgEvent = new PGEvent();
        this.pgEvent.getValues();
        if (this.pgEvent.data.state) {
            this.loadState(JSON.parse(this.pgEvent.data.state));
        }

        config.verifyButton.addEventListener("click", () => this.validateItems());

        this.initDraggableItems();
        this.initCategories();
        this.initBase();
    }

    
    /**
     * Initializes the items in the base container to be draggable.
     */
    initDraggableItems() {
        this.base.items.forEach((item, index) => {
            if (!item.element) {
                console.error("Invalid item element", item);
                return;
            }

            item.element.setAttribute("draggable", true);
            item.element.classList.add("item"); // Agregar clase "item"
            item.element.dataset.itemId = `item-${index}`; // Asignar un ID único

            item.element.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text/plain", item.element.dataset.itemId);
            });
        });
    }

    /**
     * Configures the categories to allow items to be dropped into them.
     */
    initCategories() {
        this.categories.forEach(category => {
            if (!category.element) {
                console.error("Invalid category element", category);
                return;
            }

            category.element.addEventListener("dragover", (event) => {
                event.preventDefault(); // Allow the drop
            });

            category.element.addEventListener("drop", (event) => {
                event.preventDefault();
                const itemId = event.dataTransfer.getData("text/plain");

                if (!itemId) {
                    console.error("No data received on drop event");
                    return;
                }

                const draggedElement = document.querySelector(`[data-item-id="${itemId}"]`);

                if (draggedElement) {
                    category.element.appendChild(draggedElement);
                    this.updateState();
                } else {
                    console.warn("Dragged element not found.");
                }
            });
        });
    }

    /**
     * Configures the base container to allow items to be returned to it.
     */
    initBase() {
        this.base.element.addEventListener("dragover", (event) => {
            event.preventDefault(); // Allow the drop
        });

        this.base.element.addEventListener("drop", (event) => {
            event.preventDefault();
            const itemId = event.dataTransfer.getData("text/plain");

            if (!itemId) {
                console.error("No data received on drop event");
                return;
            }

            const draggedElement = document.querySelector(`[data-item-id="${itemId}"]`);

            if (draggedElement) {
                this.base.element.appendChild(draggedElement);
                this.updateState();
            } else {
                console.warn("Dragged element not found.");
            }
        });
    }

    /**
     * Validates the placement of items in categories.
     */
    validateItems() {
        const pgEvent = new PGEvent();
        pgEvent.postToPg({
            event: this.areItemsCorrect() ? "SUCCESS" : "FAILURE",
            message: this.areItemsCorrect() ? this.messages.onSuccess : this.messages.onFail,
            reasons: [],
            state: JSON.stringify(this.getState())
        });
    }

    /**
     * Returns a boolean indicating if the items are correctly placed in the categories.
     * @returns {boolean} - True if all items are correctly placed, false otherwise.
     */
    areItemsCorrect() {
        let allCorrect = true;

        // Check items in categories
        this.categories.forEach(category => {
            Array.from(category.element.querySelectorAll(".item")).forEach(child => {
                const itemConfig = this.base.items.find(item => item.element === child);

                if (!itemConfig || itemConfig.expectedCategory !== category.name) {
                    allCorrect = false;
                }
            });
        });

        // Check items in the base container
        Array.from(this.base.element.querySelectorAll(".item")).forEach(child => {
            const itemConfig = this.base.items.find(item => item.element === child);

            if (!itemConfig || itemConfig.expectedCategory !== "base") {
                allCorrect = false;
            }
        });

        return allCorrect;
    }

    /**
     * Updates the state and triggers the `onChange` callback if defined.
     */
    updateState() {
        // Get the current state
        const baseElements = Array.from(this.base.element.querySelectorAll(".item"));
        const categoriesState = this.categories.map(category => {
            return {
                name: category.name,
                items: Array.from(category.element.querySelectorAll(".item"))
            };
        });

        // Trigger the callback
        if (this.onChange) {
            this.onChange(baseElements, categoriesState);
        }

        // No guardar el estado aquí
    }

    getState() {
        const baseElements = Array.from(this.base.element.querySelectorAll(".item"));
        const categoriesState = this.categories.map(category => {
            return {
                name: category.name,
                items: Array.from(category.element.querySelectorAll(".item")).map(item => item.dataset.itemId)
            };
        });
        return { base: baseElements.map(item => item.dataset.itemId), categories: categoriesState };
    }

    loadState(state) {
        const baseItems = state.base.map(id => document.querySelector(`[data-item-id="${id}"]`));
        baseItems.forEach(item => this.base.element.appendChild(item));

        state.categories.forEach(categoryState => {
            const category = this.categories.find(cat => cat.name === categoryState.name);
            if (category) {
                const categoryItems = categoryState.items.map(id => document.querySelector(`[data-item-id="${id}"]`));
                categoryItems.forEach(item => category.element.appendChild(item));
            }
        });
    }
}

/**
 * Class to handle drag-and-drop functionality for joining items with connectors.
 */
export class DragJoiner {
    /**
     * @typedef {Object} ItemConfig
     * @property {HTMLElement} element - The HTML element of the item.
     * @property {string} name - The name of the item.
     *
     * @typedef {Object} CategoryConfig
     * @property {string} name - The name of the category.
     * @property {ItemConfig[]} items - The items within the category.
     *
     * @typedef {Object} ConnectorConfig
     * @property {HTMLElement} container - The container element for connectors.
     * @property {string} [color] - The color of the connectors.
     * @property {number} [width] - The width of the connectors.
     * @property {number} [radius] - The radius of the connectors.
     *
     * @typedef {Object} DragJoinerConfig
     * @property {CategoryConfig[]} categories - The categories containing items.
     * @property {Array.<Array.<string>>} expectations - The expected connections between items.
     * @property {ConnectorConfig} connector - Configuration for the connectors.
     * @property {HTMLElement} verifyButton - Button element to trigger validation.
     * @property {function} [onChange] - Callback executed when the state changes.
     */

    /**
     * @param {DragJoinerConfig} config - Initial configuration for the functionality.
     */
    constructor(config) {
        // Set up categories, expectations, and connector properties from config
        this.categories = config.categories;
        this.expectations = config.expectations;
        this.connectorColor = config.connector.color || "#000000";
        this.connectorWidth = config.connector.width || 2;
        this.connectorRadius = config.connector.radius || 5;
        this.onChange = config.onChange;
        this.connectorsContainer = config.connector.container;
        this.messages = config.messages

        // Clear the container for connectors
        this.connectorsContainer.innerHTML = '';

        // Initialize relations and connector ID counter
        this.relations = {};
        this.connectorIdCounter = 0;

        // Initialize draggable items and connectors
        this.initItems();
        this.setupDraggableItems();

        this.pgEvent = new PGEvent();
        this.pgEvent.getValues();
        if (this.pgEvent.data.state) {
            this.loadState(JSON.parse(this.pgEvent.data.state));
        }

        this.verifyButton = config.verifyButton;
        this.verifyButton.addEventListener("click", () => this.validateConnections());
    }

    /**
     * Initialize the items by adding event listeners for dragging.
     */
    initItems() {
        this.categories.forEach(category => {
            category.items.forEach(item => {
                if (item.element) {
                    item.element.addEventListener("mousedown", (e) => this.onItemDragStart(e, item));
                }
            });
        });
    }

    /**
     * Set up mouse move and mouse up events for dragging connectors.
     */
    setupDraggableItems() {
        this.connector = null;
        this.startItem = null;

        // Mousemove event for updating connector position while dragging
        document.addEventListener("mousemove", (e) => {
            if (this.connector) {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                this.updateConnectorPosition(mouseX, mouseY);
            }
        });

        // Mouseup event to finalize the connection of the dragged item
        document.addEventListener("mouseup", () => {
            if (this.connector) {
                this.finalizeConnector();
            }
        });
    }

    /**
     * Handles when an item starts being dragged.
     * @param {MouseEvent} e - The mouse event.
     * @param {ItemConfig} item - The item being dragged.
     */
    onItemDragStart(e, item) {
        e.preventDefault(); // Prevent default behavior
        this.startItem = item; // Store the starting item

        // Store mouse coordinates as the starting point for the connector
        const startX = e.clientX;
        const startY = e.clientY;

        // Create a new connector element
        this.connector = document.createElement("div");
        const connectorId = `connector-${this.connectorIdCounter++}`; // Unique ID for each connector
        this.connector.id = connectorId;

        // Set styles for the connector
        this.connector.style.position = "absolute";
        this.connector.style.left = `${startX}px`;
        this.connector.style.top = `${startY}px`;
        this.connector.style.width = `${this.connectorWidth}px`;
        this.connector.style.height = `${this.connectorWidth}px`;
        this.connector.style.backgroundColor = this.connectorColor;
        this.connector.style.borderRadius = `${this.connectorRadius}px`;
        this.connector.style.cursor = "pointer";
        this.connector.style.pointerEvents = "auto";

        // Store relation key for the connector
        this.connector.dataset.relationKey = `${this.startItem.name}-${connectorId}`;

        // Store initial click position for the connector
        this.connector.startX = startX;
        this.connector.startY = startY;

        // Add click event to remove the connector and its relation
        this.connector.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the click event from propagating
            this.removeConnectorAndRelation(connectorId);
        });

        // Append the connector to the container
        this.connectorsContainer.appendChild(this.connector);
    }

    /**
     * Update the position of the connector based on mouse movement.
     * @param {number} x - The x-coordinate of the mouse.
     * @param {number} y - The y-coordinate of the mouse.
     */
    updateConnectorPosition(x, y) {
        if (!this.connector) return;

        const startX = this.connector.startX;
        const startY = this.connector.startY;

        const width = x - startX;
        const height = y - startY;

        // Calculate the angle for rotating the connector
        const angle = Math.atan2(height, width) * 180 / Math.PI;

        // Update connector's width and rotation angle
        this.connector.style.width = `${Math.abs(width)}px`;
        this.connector.style.height = "4px"; // Keep height constant

        // Apply rotation and transformation origin
        this.connector.style.transform = `rotate(${angle}deg)`;
        this.connector.style.transformOrigin = `0% 50%`;

        // Adjust the connector's position to stay anchored at the start point
        this.connector.style.left = `${startX}px`;
        this.connector.style.top = `${startY}px`;
    }

    /**
     * Finalize the connection when the mouse is released.
     */
    finalizeConnector() {
        const dropTarget = document.elementFromPoint(event.clientX, event.clientY);

        // Exit early if the drop target is not a category item or if it's the same as the start item
        if (!dropTarget || !this.isItemInCategories(dropTarget) || dropTarget === this.startItem.element) {
            this.connectorsContainer.removeChild(this.connector);
            this.connector = null;
            this.startItem = null;
            return;
        }

        const startItemName = this.startItem.name;
        const dropTargetName = dropTarget.dataset.name;

        // Remove any existing relations involving the start or drop target items
        Object.keys(this.relations).forEach(key => {
            const relation = this.relations[key];
            if (relation.start.name === startItemName || relation.target.name === startItemName ||
                relation.start.name === dropTargetName || relation.target.name === dropTargetName) {
                this.removeConnectorAndRelation(relation.connector.id);
            }
        });

        // Store the new relation
        this.relations[this.connectorIdCounter] = {
            connector: this.connector,
            start: this.startItem,
            target: this.categories.flatMap(category => category.items).find(item => item.element === dropTarget),
        };
        // console.log(this.relations[this.connectorIdCounter]);

        // Ensure the target has a unique value or overwrite
        Object.keys(this.relations).forEach(key => {
            const relation = this.relations[key];
            if (relation.target.name === dropTargetName && key !== this.connectorIdCounter.toString()) {
                this.removeConnectorAndRelation(relation.connector.id);
            }
        });

        // Trigger onChange callback if defined
        if (this.onChange) {
            this.onChange(this.relations);
        }

        this.connector = null;
        this.startItem = null;
    }

    /**
     * Remove a connector and its associated relation.
     * @param {string} connectorId - The ID of the connector to remove.
     */
    removeConnectorAndRelation(connectorId) {
        const connector = document.getElementById(connectorId);

        // If the connector doesn't exist, exit early
        if (!connector) return;

        connector.parentElement.removeChild(connector);

        // Search and remove the relation associated with the connector
        for (const key in this.relations) {
            const relation = this.relations[key];
            if (relation.connector && relation.connector.id === connectorId) {
                delete this.relations[key];
                break;
            }
        }

        // Trigger onChange callback if defined
        if (this.onChange) {
            this.onChange(this.relations);
        }
    }

    /**
     * Checks if the given element is part of the categories.
     * @param {HTMLElement} element - The element to check.
     * @returns {boolean} - True if the element is part of the categories, false otherwise.
     */
    isItemInCategories(element) {
        return this.categories.some(category => 
            category.items.some(item => item.element === element)
        );
    }

    /**
     * Validates the connections between items.
     */
    validateConnections() {
        // Check if all expected connections are present
        if (Object.keys(this.relations).length === 0) {
            console.log("Some connections are incorrect.");
            return;
        }

        // Check if all connections are correct
        let allCorrect = true;
        const matchedExpectations = new Set();

        for (const key in this.relations) {
            const relation = this.relations[key];
            
            // Check if the relation is in the expected connections
            const expectedMatch = this.expectations.find(
                pair => {
                    const isMatch = (pair[0] === relation.start.name && pair[1] === relation.target.name) ||
                        (pair[0] === relation.target.name && pair[1] === relation.start.name);
                    if (isMatch) {
                        matchedExpectations.add(pair);
                    }
                    return isMatch;
                }
            );
            if (!expectedMatch) {
                allCorrect = false;
                break;
            }
        }

        // Check if all expectations are met
        if (matchedExpectations.size !== this.expectations.length) {
            allCorrect = false;
        }

        const pgEvent = new PGEvent();
        console.log(allCorrect ? this.messages.onSuccess : this.messages.onFail);
        pgEvent.postToPg({
            event: allCorrect ? "SUCCESS" : "FAILURE",
            message: allCorrect ? this.messages.onSuccess : this.messages.onFail,
            reasons: [],
            state: JSON.stringify(this.getState())
        });
    }

    getState() {
        return Object.keys(this.relations).map(key => {
            const relation = this.relations[key];
            return {
                start: relation.start.name,
                target: relation.target.name,
                connectorId: relation.connector.id
            };
        });
    }

    loadState(state) {
        state.forEach(relation => {
            const startItem = this.categories.flatMap(category => category.items).find(item => item.name === relation.start);
            const targetItem = this.categories.flatMap(category => category.items).find(item => item.name === relation.target);

            if (startItem && targetItem) {
                const connector = document.createElement("div");
                connector.id = relation.connectorId;
                connector.style.position = "absolute";
                connector.style.backgroundColor = this.connectorColor;
                connector.style.width = `${this.connectorWidth}px`;
                connector.style.height = `${this.connectorWidth}px`;
                connector.style.borderRadius = `${this.connectorRadius}px`;
                connector.style.cursor = "pointer";
                connector.style.pointerEvents = "auto";

                this.connectorsContainer.appendChild(connector);

                this.relations[relation.connectorId] = {
                    connector: connector,
                    start: startItem,
                    target: targetItem
                };

                this.updateConnectorPositionForLoadedState(connector, startItem.element, targetItem.element);
            }
        });
    }

    updateConnectorPositionForLoadedState(connector, startElement, targetElement) {
        const startRect = startElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;

        const width = endX - startX;
        const height = endY - startY;

        const angle = Math.atan2(height, width) * 180 / Math.PI;

        connector.style.width = `${Math.abs(width)}px`;
        connector.style.height = "4px";
        connector.style.transform = `rotate(${angle}deg)`;
        connector.style.transformOrigin = `0% 50%`;
        connector.style.left = `${startX}px`;
        connector.style.top = `${startY}px`;
    }
}
