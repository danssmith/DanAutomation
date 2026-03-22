module.exports = {
    default: {
        require: ["steps/**/*.ts", "utils/**/*.ts"],
        requireModule: ["ts-node/register"],
        format: ["progress", "html:reports/cucumber-report.html"],
        paths: ["features/**/*.feature"],
        publishQuiet: true,
    },
};