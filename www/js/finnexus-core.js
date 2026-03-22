/**
 * FinNexus Core Logic Engine
 * Handles: Defender (Scams), Controller (Budgets), and Saver (Logs)
 */
const FinNexus = {
    // 1. DATASETS
    blacklist: [], // Will be loaded from blacklist.json
    
    // 2. INITIALIZE
    init: async function() {
        try {
            const resp = await fetch('/assets/data/blacklist.json');
            this.blacklist = await resp.json();
            console.log("🛡️ Firewall Engine: Active");
        } catch (e) {
            console.warn("Could not load blacklist. Using local failsafe.");
            this.blacklist = [{id: 'scam@upi', name: 'Scammer'}];
        }
    },

    // 3. THE DEFENDER
    checkDefender: function(upiId) {
        return this.blacklist.find(item => item.id.toLowerCase() === upiId.toLowerCase());
    },

    // 4. THE SAVER / CONTROLLER
    getProfile: function() {
        return JSON.parse(localStorage.getItem('finnexus_active_profile')) || null;
    }
};

// Start the engine
FinNexus.init();