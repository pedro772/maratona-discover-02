module.exports = {
    remaingningDays(job) {
        const daysLeft = (job["total-hours"] / job["daily-hours"]).toFixed();
            
        const createdDate = new Date(job.createdAt);
        const dueDay = createdDate.getDate() + Number(daysLeft);
        const dueDateInMillisecs = createdDate.setDate(dueDay);
    
        const timeDiffInMillisecs = dueDateInMillisecs - Date.now();
        const dayInMillisecs = 1000 * 60 * 60 * 24;
        const hoursInMillisecs = dayInMillisecs / 24;
        const dayDiff = Math.floor(timeDiffInMillisecs / dayInMillisecs);
        const hourDiff = Math.ceil(((timeDiffInMillisecs - (dayDiff * dayInMillisecs)) / hoursInMillisecs));
        
        return {
            dayDiff: dayDiff,
            hourDiff: hourDiff,
        };    
    },

    calculateBudget(job, hourValue) {
        return hourValue * job['total-hours'];
    },
};