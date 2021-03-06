const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length,
        };

        let jobTotalHours = 0;
    
        const updatedJobs = jobs.map((job) => {
            // job adjustments
            const remainingDays = (JobUtils.remaingningDays(job)).dayDiff;
            const remainingHours = (JobUtils.remaingningDays(job)).hourDiff;
            const status = remainingDays > 0 ? 'progress' : ((remainingDays < 0 || remainingHours <= 0) ? 'done' : 'progress');

            statusCount[status] += 1;
            jobTotalHours = status === 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;
        
            return {
                ...job,
                remainingDays,
                remainingHours,
                status,
                budget: JobUtils.calculateBudget(job, profile["hour-value"]),
            };
        });

        const freeHours = Number(profile["hours-per-day"]) - jobTotalHours;
        
        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours });
    },
};