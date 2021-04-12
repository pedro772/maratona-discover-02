const Profile = require('../model/Profile');

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() });
    },

    async update(req, res) {
        // req.body to get data
        const data = req.body;
        // define how many weeks are in an year
        const weeksPerYear = 52;
        // remove yearly vacation weeks
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
        // define how many hours are worked per week
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
        // total hour workload in a month 
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;
        
        const hourValue = data["monthly-budget"] / monthlyTotalHours;

        const profile = await Profile.get();

        await Profile.update({
            ...profile,
            ...req.body,
            "hour-value": hourValue
        });

        return res.redirect('/profile');
    },
};