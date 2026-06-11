/**
 * FinNexus Core Logic Engine
 * Shared local-first helpers for profile isolation and Defender data.
 */
const FinNexus = {
    blacklist: [],

    init: async function() {
        try {
            const resp = await fetch('/assets/data/blacklist.json');
            this.blacklist = await resp.json();
            console.log("FinNexus Firewall Engine: Active");
        } catch (e) {
            console.warn("Could not load blacklist. Using local failsafe.");
            this.blacklist = [{ id: 'scam@upi', name: 'Scammer' }];
        }
    },

    checkDefender: function(upiId) {
        if (!upiId) return null;
        return this.blacklist.find(item => item.id.toLowerCase() === upiId.toLowerCase()) || null;
    },

    getActiveUser: function() {
        return localStorage.getItem('fn_user');
    },

    getProfile: function() {
        const activeUser = this.getActiveUser();
        return activeUser ? JSON.parse(localStorage.getItem(`profile_${activeUser}`)) : null;
    },

    saveProfile: function(profile) {
        const activeUser = this.getActiveUser();
        if (!activeUser) return false;
        localStorage.setItem(`profile_${activeUser}`, JSON.stringify(profile));
        return true;
    },

    getHistoryKey: function() {
        const activeUser = this.getActiveUser();
        return activeUser ? `${activeUser}_history` : null;
    }
};

FinNexus.init();
