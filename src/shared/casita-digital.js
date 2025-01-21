import { PGEvent } from "./pg-event";

/**
 * The HouseController object controls the behavior and functionality of a house.
 * @typedef {Object} HouseController
 * @property {HTMLElement} houseContainer - The container element where the house is displayed.
 * @property {HTMLElement} messageElement - The HTML element where the message is displayed.
 * @property {function} updateText - Updates the text of an HTML element with a message character based on the given message number.
 * @property {function} updateMessage - Updates the message based on the state of the lights.
 * @property {function} createLights - Creates select elements for lights and appends them to the corresponding elements on the page.
 * @property {function} createHouse - Creates a house based on the provided squares array.
 * @property {function} init - Initializes the HouseController object with the provided parameters.
 */
const HouseController = {
    /**
     * The container element where the house is displayed.
     * @type {HTMLElement}
     */
    houseContainer: null,

    /**
     * The HTML element where the message is displayed.
     * @type {HTMLElement}
     */
    messageElement: null,

    /**
     * The collection of lights.
     * @type {HTMLCollection}
     */
    lights: [],

    /**
     * On change event handler for the lights.
     * @param {HTMLCollection} lights - The collection of lights.
     */
    onLightsChange: (lights) => { },

    /**
     * The available characters for the message.
     * @type {Array<string>}
     */
    availableChars: [
        " ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
        "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        ".", ",", "!", "?",
    ],

    /**
     * Sets the value of the lights (selects), based on a 0-1 array.
     * @param {Array<number>} lightsValues - The array of values for the lights.
     */
    setLightsValues: (lightsValues) => {
        for (let i = 0; i < lightsValues.length; i++) {
            HouseController.lights[i].value = lightsValues[i];
        }

        HouseController.updateMessage();
    },


    /**
     * Translate the lights values to a message, based on the available characters.
     * @param {HTMLCollection} lights - The collection of lights.
     * @returns {string} The message based on the lights values.
     */
    translateLightsToMessage: (lights) => {
        let message = "";
        for (let light of lights) {
            message += light.value;
        }
        let messageNumber = parseInt(message, 2); // Binary to decimal
        return HouseController.availableChars[messageNumber];
    },

    /**
     * Translate the message to lights values, based on the available characters.
     * @param {string} message - The message to translate to lights values.
     * @returns {Array<number>} The lights values based on the message.
     */
    translateMessageToLights: (message) => {
        // Find the index of the message character in the availableChars array.
        let messageNumber = HouseController.availableChars.indexOf(message);

        // Convert the message number to binary.
        let binaryMessage = messageNumber.toString(2);

        // Fill the binary message with zeros to match the number of lights.
        let numLights = HouseController.lights.length;
        let missingZeros = numLights - binaryMessage.length;

        for (let i = 0; i < missingZeros; i++) {
            binaryMessage = "0" + binaryMessage;
        }

        // Convert the binary message to an array of numbers.
        return binaryMessage.split("").map((value) => parseInt(value));
    },

    /**
     * Updates the text of an HTML element with a message character based on the given message number.
     * @param {number} messageNumber - The index of the character in the availableChars array.
     */
    updateText: (messageNumber) => {
        const message = HouseController.availableChars[messageNumber];
        if (message === undefined) {
            HouseController.messageElement.textContent = "?";
            return;
        }
        HouseController.messageElement.textContent = message;
    },

    /**
     * Updates the message based on the state of the lights.
     */
    updateMessage: () => {
        window.scrollTo(0, 10000);
        let message = "";
        for (let light of HouseController.lights) {
            let value = light.value;
            message += value;

            // Change the class, based on the selection (binary-select__select--selected).
            if (value === "1") {
                light.classList.add("binary-select__select--selected");
            } else {
                light.classList.remove("binary-select__select--selected");
            }
        }
        let messageNumber = parseInt(message, 2); // Binary to decimal
        HouseController.updateText(messageNumber);
    },

    /**
     * Creates select elements for lights and appends them to the corresponding elements on the page.
     * @returns {void}
     */
    createLights: () => {
        // Calculate how many lights are needed based on the available characters.
        let numLights = Math.ceil(Math.log2(HouseController.availableChars.length));
        let lightsContainer = document.createElement("div");

        for (let i = 0; i < numLights; i++) {
            let selectElement = document.createElement("SELECT");
            selectElement.classList.add("binary-select__select");

            selectElement.addEventListener("change", () => {
                HouseController.onLightsChange(HouseController.lights);
                HouseController.updateMessage();
            });

            let elemOption0 = document.createElement("OPTION");
            elemOption0.innerHTML = "0";
            elemOption0.value = "0";
            selectElement.appendChild(elemOption0);

            let elemOption1 = document.createElement("OPTION");
            elemOption1.innerHTML = "1";
            elemOption1.value = "1";
            selectElement.appendChild(elemOption1);

            lightsContainer.appendChild(selectElement);
            HouseController.lights.push(selectElement);
        }

        HouseController.houseContainer.appendChild(lightsContainer);
    },

    /**
     * Initializes the HouseController object with the provided parameters.
     * @param {HTMLElement} houseContainer - The container element where the house will be created.
     * @param {HTMLElement} whereToWrite - The HTML element where the message will be displayed.
     * @param {function} onLightsChange - The event handler for the lights.
     */
    init: (houseContainer, whereToWrite, onLightsChange) => {
        HouseController.houseContainer = houseContainer;
        HouseController.messageElement = whereToWrite;
        HouseController.onLightsChange = onLightsChange;

        HouseController.createLights();
    },
};

/**
 * Class that represents a timer that can be used to measure time intervals,
 * in order to execute certain actions when a certain amount of time has passed.
 * 
 * For example, a timer can be used to automatically save the state of an application
 * after 60 seconds of inactivity. When the timer arrives to zero, the application
 * will save the state and timer will start again.
 */
export class Timer {
    /**
     * Creates a new timer.
     * 
     * @param {number} duration - The duration of the timer in milliseconds.
     * @param {function} callback - The callback function to execute when the timer reaches zero.
     */
    constructor(duration, callback) {
        this.duration = duration;
        this.callback = callback;
        this.timer = null;
    }

    /**
     * Starts the timer.
     */
    start() {
        this.stop();
        this.timer = setTimeout(() => {
            this.callback();
            this.start();
        }, this.duration);
    }

    /**
     * Stops the timer.
     */
    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /**
     * Resets the timer.
     */
    reset() {
        this.stop();
        this.start();
    }
}

/**
 * The main function that initializes the house controller and handles the event when the user changes the value of a light.
 * @param {Object} params - The parameters for initializing the house controller.
 * @param {string} params.initialLetter - The initial letter is the first letter that the user will see in the message by default.
 * @param {string} params.expectedLetter - The expected letter that the user needs to find. If free mode is enabled, this parameter is not used.
 * @param {boolean} params.isFreeMode - Indicates if the user is in free mode, that means, the user can change the lights without restrictions or expectations.
 * @param {HTMLElement} params.house - The container element where the house will be created.
 * @param {HTMLElement} params.letter - The HTML element where the message will be displayed.
 * @param {String} params.successMessage - The success message to display when the user finds the expected letter.
 * @param {String} params.failureMessage - The failure message to display when the user doesn't find the expected letter.
 */
const CasitaDigital = (params) => {
    const defaultSuccessMessage = "¡Felicidades! Has encontrado la letra correcta.";
    const defaultFailureMessage = "¡Oh no! Esa no es la letra correcta. Inténtalo de nuevo.";

    const { expectedLetter, house, letter: messageElement } = params;

    /**
     * Indicates whether there are pending changes.
     * @type {boolean}
     */
    let areTherePendingChanges = false;

    /**
     * Indicates if the user, in the previous state, has met the challenge requirements.
     * @type {boolean}
     */
    let hasUserMetTheChallengeBefore = false;

    /**
     * Checks if the obtained message matches the expected letter and posts the result to the pgEvent.
     * @param {Object} houseController - The house controller object.
     * @param {NodeList} lights - The lights NodeList.
     * @returns {boolean} - Returns true if the obtained message matches the expected letter, otherwise false.
     */
    const hasApproved = (houseController, lights) => houseController.translateLightsToMessage(lights) === expectedLetter;

    /**
     * Saves the state of the lights and posts an event to the server.
     * @param {NodeList} lights - The list of lights.
     * @returns {void}
     */
    const saveState = (houseController, lights) => {
        if (!areTherePendingChanges) {
            console.log("No hay cambios pendientes.");
            return;
        }

        const messageMatches = hasApproved(houseController, lights);
        const message = messageMatches 
            ? params.successMessage || defaultSuccessMessage
            : params.failureMessage || defaultFailureMessage;

        pgEvent.postToPg({
            event: messageMatches ? "SUCCESS" : "FAILURE",
            message: message,
            reasons: [],
            state: JSON.stringify({
                lights: Array.from(lights).map((light) => parseInt(light.value)),
            })
        });

        areTherePendingChanges = false;
        hasUserMetTheChallengeBefore = messageMatches;
    }

    const pgEvent = new PGEvent();

    // Create the house table and set up the "onLightsChange" event handler,
    // which will be called when the user changes the value of a light to check if
    // the user has met the challenge requirements.
    const houseController = Object.create(HouseController);

    // Create a timer that will save the state of the lights after 15 seconds of inactivity.
    const timer = new Timer(8_000, () => saveState(houseController, houseController.lights));
    timer.start();

    houseController.init(house, messageElement, (lights) => {
        // Check if the exercise is in free mode.
        // If the exercise is in free mode, we don't want to save the state.
        if (params.isFreeMode) {
            return;
        }

        // Restart the timer when the user changes the value of a light.
        areTherePendingChanges = true;
        timer.reset();

        // Check if the user has met the challenge requirements.
        // If the exercise state doesn't really changes, that is, the user
        // continue with a bad answer, we don't want to save the state.
        const userHasMetTheChallenge = hasApproved(houseController, lights);
        if (userHasMetTheChallenge === hasUserMetTheChallengeBefore) {
            return;
        }

        saveState(houseController, lights);
    });

    // If there is a previous state, set the lights values.
    pgEvent.getValues();
    if (pgEvent.data.lights) {
        houseController.setLightsValues(pgEvent.data.lights);
    } else {
        const initialLetter = params.initialLetter || " ";
        houseController.setLightsValues(
            houseController.translateMessageToLights(initialLetter),
        );
    }
}

export default CasitaDigital;